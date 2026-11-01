Concurrency bugs only feel real once you've watched one happen. Today you'll lose updates in a race, coordinate two threads by hand, and break and then fix a deadlock.

<!-- exercise: d8_e1 | Easy | Thread states and a race condition you can see -->
**Concepts:** `Thread` vs `Runnable` · `start()` vs `run()` · thread states (NEW, BLOCKED, TERMINATED) · `join()` · race condition on `count++` · `synchronized` block

**Task.**

1. Print a thread's state before `start()`, while it's stuck waiting for a lock that `main` holds, and after `join()`.
2. Two threads each increment a shared `int` 100,000 times. Do it once **without** synchronization and once with a `synchronized` block, and compare the totals.

**Starter code** · `RaceCondition.java`

```java
public class RaceCondition {
    static final Object LOCK = new Object();
    static int unsafeCount = 0;
    static int safeCount = 0;

    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> {
            synchronized (LOCK) { /* just needs the lock once */ }
        });
        // TODO: print the state before start
        synchronized (LOCK) {
            // TODO: start t, spin until t.getState() == Thread.State.BLOCKED, print the state
        }
        // TODO: join t, print the state

        Runnable unsafe = () -> { /* TODO: 100_000 x unsafeCount++ */ };
        Runnable safe = () -> { /* TODO: 100_000 x safeCount++ inside synchronized (LOCK) */ };
        runTwice(unsafe);
        runTwice(safe);
        System.out.println("unsafe total: " + unsafeCount + (unsafeCount < 200_000 ? " (updates were lost)" : " (lucky run, try again)"));
        System.out.println("synchronized total: " + safeCount);
    }

    static void runTwice(Runnable task) throws InterruptedException {
        // TODO: start two threads running the same task, then join both
    }
}
```

**Sample output** (your unsafe number will differ on every run)

```text
state before start: NEW
state while waiting for the lock: BLOCKED
state after join: TERMINATED
unsafe total: 117342 (updates were lost)
synchronized total: 200000
```

<!-- hints -->
- `count++` is really three steps: read, add 1, write. Two threads can read the same value, and then one increment is lost.
- Calling `t.run()` just runs the code on the **current** thread. Only `t.start()` creates a new thread.
- While `main` holds `LOCK`, `t` can't enter its `synchronized` block, so its state becomes `BLOCKED`. Loop with `Thread.onSpinWait()` until you see it.
- Without `join()`, `main` might print before the workers finish. `join()` also guarantees you **see** their writes (happens-before).

<!-- solution -->
```java
public class RaceCondition {
    static final Object LOCK = new Object();
    static int unsafeCount = 0;
    static int safeCount = 0;

    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> {
            synchronized (LOCK) { /* just needs the lock once */ }
        });
        System.out.println("state before start: " + t.getState());          // NEW
        synchronized (LOCK) {
            t.start();
            while (t.getState() != Thread.State.BLOCKED) Thread.onSpinWait();
            System.out.println("state while waiting for the lock: " + t.getState());
        }                                                                     // lock released here
        t.join();
        System.out.println("state after join: " + t.getState());            // TERMINATED

        Runnable unsafe = () -> {
            for (int i = 0; i < 100_000; i++) unsafeCount++;                  // read-modify-write: not atomic
        };
        Runnable safe = () -> {
            for (int i = 0; i < 100_000; i++) {
                synchronized (LOCK) { safeCount++; }                          // one thread at a time
            }
        };
        runTwice(unsafe);
        runTwice(safe);
        System.out.println("unsafe total: " + unsafeCount + (unsafeCount < 200_000 ? " (updates were lost)" : " (lucky run, try again)"));
        System.out.println("synchronized total: " + safeCount);
    }

    static void runTwice(Runnable task) throws InterruptedException {
        Thread a = new Thread(task, "worker-a");
        Thread b = new Thread(task, "worker-b");
        a.start();
        b.start();
        a.join();
        b.join();
    }
}
```

**Takeaway.** `synchronized` provides both **mutual exclusion** (one thread at a time) and **visibility** (changes are flushed when the lock is released). On Day 9, `AtomicInteger.incrementAndGet()` solves this same counter without a lock, using CAS.

<!-- exercise: d8_e2 | Medium | Producer–consumer with `wait()` / `notifyAll()` -->
**Concepts:** intrinsic lock (monitor) · `wait()` releases the lock · `notifyAll()` · guarding with `while`, not `if` (spurious wakeups) · bounded buffer · poison pill to stop

**Task.** Build a `BoundedBuffer` with a capacity of 2:

- `put(v)` blocks while the buffer is full. `take()` blocks while it's empty.
- Both are `synchronized` and use `wait()` / `notifyAll()`.
- A producer puts 1..6 and then `-1` (a "poison pill"). The consumer prints each value until it sees `-1`.
- Track the largest size the queue ever reached, and prove it never went past the capacity.

**Starter code** · `ProducerConsumer.java`

```java
import java.util.ArrayDeque;
import java.util.Queue;

public class ProducerConsumer {
    public static void main(String[] args) throws InterruptedException {
        BoundedBuffer buffer = new BoundedBuffer(2);
        int[] sum = {0};

        Thread producer = new Thread(() -> {
            try {
                for (int i = 1; i <= 6; i++) buffer.put(i);
                buffer.put(-1);                                  // poison pill: "no more items"
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }, "producer");

        Thread consumer = new Thread(() -> {
            // TODO: take until -1, print "consumed <v>", add to sum[0]
        }, "consumer");

        producer.start();
        consumer.start();
        producer.join();
        consumer.join();
        System.out.println("sum = " + sum[0] + ", never above capacity: " + (buffer.maxSizeSeen() <= 2));
    }
}

class BoundedBuffer {
    private final Queue<Integer> queue = new ArrayDeque<>();
    private final int capacity;
    private int maxSeen;

    BoundedBuffer(int capacity) { this.capacity = capacity; }

    void put(int value) throws InterruptedException {
        // TODO
    }

    int take() throws InterruptedException {
        return -1; // TODO
    }

    synchronized int maxSizeSeen() { return maxSeen; }
}
```

**Expected output**

```text
consumed 1
consumed 2
consumed 3
consumed 4
consumed 5
consumed 6
sum = 21, never above capacity: true
```

<!-- hints -->
- `wait()` and `notifyAll()` must be called while holding the same object's lock, inside a `synchronized` method or block. Otherwise you get `IllegalMonitorStateException`.
- `wait()` **releases** the lock while waiting and takes it back before returning. `Thread.sleep()` keeps holding every lock.
- Always `while (queue.size() == capacity) wait();`. A thread can wake up without the condition being true (a spurious wakeup, or another consumer got there first).
- `notifyAll()` is safer than `notify()` when producers and consumers wait on the same monitor.

<!-- solution -->
```java
import java.util.ArrayDeque;
import java.util.Queue;

public class ProducerConsumer {
    public static void main(String[] args) throws InterruptedException {
        BoundedBuffer buffer = new BoundedBuffer(2);
        int[] sum = {0};

        Thread producer = new Thread(() -> {
            try {
                for (int i = 1; i <= 6; i++) buffer.put(i);
                buffer.put(-1);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }, "producer");

        Thread consumer = new Thread(() -> {
            try {
                while (true) {
                    int v = buffer.take();
                    if (v == -1) break;                          // poison pill
                    System.out.println("consumed " + v);
                    sum[0] += v;
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }, "consumer");

        producer.start();
        consumer.start();
        producer.join();
        consumer.join();                                         // join = we safely see sum[0]
        System.out.println("sum = " + sum[0] + ", never above capacity: " + (buffer.maxSizeSeen() <= 2));
    }
}

class BoundedBuffer {
    private final Queue<Integer> queue = new ArrayDeque<>();
    private final int capacity;
    private int maxSeen;

    BoundedBuffer(int capacity) { this.capacity = capacity; }

    synchronized void put(int value) throws InterruptedException {
        while (queue.size() == capacity) wait();                // releases the lock while waiting
        queue.add(value);
        maxSeen = Math.max(maxSeen, queue.size());
        notifyAll();                                            // wake consumers
    }

    synchronized int take() throws InterruptedException {
        while (queue.isEmpty()) wait();
        int value = queue.remove();
        notifyAll();                                            // wake producers
        return value;
    }

    synchronized int maxSizeSeen() { return maxSeen; }
}
```

**In real code** you'd use `ArrayBlockingQueue` (Day 15), which does exactly this with a `ReentrantLock` and two `Condition`s, `notFull` and `notEmpty`. Writing it once by hand is what makes `BlockingQueue` make sense, and it's a popular machine-coding question.

<!-- exercise: d8_e3 | Hard | Fix a deadlock and a stuck `volatile` flag -->
**Concepts:** deadlock (circular wait) · lock ordering · `jstack` thread dumps · `volatile` visibility · `join(timeout)`

**Task.** The starter has two bugs. **Run it first.** It will probably hang or print the bug messages.

1. **Deadlock.** Thread 1 moves money A→B while thread 2 moves B→A. Each locks `from` and then `to`, so they can end up holding one lock each and waiting forever for the other. Fix it by **always locking the account with the smaller id first**.
2. **Visibility.** `Worker` loops `while (running)`, but `running` isn't `volatile`, so the JIT may never re-read it, and `shutdown()` never stops the loop. Fix it.

While the starter is hung, run `jps` and then `jstack <pid>` in a terminal. The dump ends with `Found one Java-level deadlock`.

**Starter code** · `SafeTransfers.java`

```java
public class SafeTransfers {
    public static void main(String[] args) throws InterruptedException {
        Account a = new Account(1, 1000), b = new Account(2, 1000);
        Thread t1 = new Thread(() -> { for (int i = 0; i < 10_000; i++) Bank.transfer(a, b, 1); });
        Thread t2 = new Thread(() -> { for (int i = 0; i < 10_000; i++) Bank.transfer(b, a, 1); });
        t1.start();
        t2.start();
        t1.join(5000);
        t2.join(5000);
        if (t1.isAlive() || t2.isAlive()) {
            System.out.println("DEADLOCK: threads are stuck (take a jstack now!)");
            System.exit(1);
        }
        System.out.println("a = " + a.balance() + ", b = " + b.balance() + ", total = " + (a.balance() + b.balance()));

        Worker w = new Worker();
        w.start();
        Thread.sleep(100);
        w.shutdown();
        w.join(2000);
        System.out.println("worker stopped: " + !w.isAlive());
        System.exit(0);
    }
}

class Account {
    final int id;
    private int balance;

    Account(int id, int balance) { this.id = id; this.balance = balance; }
    int balance() { return balance; }
    void add(int amount) { balance += amount; }
}

class Bank {
    static void transfer(Account from, Account to, int amount) {
        synchronized (from) {                 // BUG: lock order depends on the arguments
            synchronized (to) {
                from.add(-amount);
                to.add(amount);
            }
        }
    }
}

class Worker extends Thread {
    private boolean running = true;           // BUG: other threads may never see the change

    @Override
    public void run() {
        long spins = 0;
        while (running) spins++;
    }

    void shutdown() { running = false; }
}
```

**Expected output**

```text
a = 1000, b = 1000, total = 2000
worker stopped: true
```

<!-- hints -->
- Deadlock needs four things: mutual exclusion, hold-and-wait, no preemption, and a **circular wait**. Lock ordering removes the circular wait.
- Choose `first = from.id < to.id ? from : to` and `second` as the other one, then `synchronized (first) { synchronized (second) { ... } }`.
- `volatile` guarantees every read sees the latest write. It doesn't make `count++` atomic, but it's perfect for a simple stop flag.
- Another fix is `ReentrantLock.tryLock(timeout)` (Day 9). Back off and retry instead of waiting forever.

<!-- solution -->
```java
public class SafeTransfers {
    public static void main(String[] args) throws InterruptedException {
        Account a = new Account(1, 1000), b = new Account(2, 1000);
        Thread t1 = new Thread(() -> { for (int i = 0; i < 10_000; i++) Bank.transfer(a, b, 1); });
        Thread t2 = new Thread(() -> { for (int i = 0; i < 10_000; i++) Bank.transfer(b, a, 1); });
        t1.start();
        t2.start();
        t1.join(5000);
        t2.join(5000);
        if (t1.isAlive() || t2.isAlive()) {
            System.out.println("DEADLOCK: threads are stuck (take a jstack now!)");
            System.exit(1);
        }
        System.out.println("a = " + a.balance() + ", b = " + b.balance() + ", total = " + (a.balance() + b.balance()));

        Worker w = new Worker();
        w.start();
        Thread.sleep(100);
        w.shutdown();
        w.join(2000);
        System.out.println("worker stopped: " + !w.isAlive());
        System.exit(0);
    }
}

class Account {
    final int id;
    private int balance;

    Account(int id, int balance) { this.id = id; this.balance = balance; }
    int balance() { return balance; }
    void add(int amount) { balance += amount; }   // always called while holding this account's lock
}

class Bank {
    static void transfer(Account from, Account to, int amount) {
        Account first = from.id < to.id ? from : to;    // global order: smaller id first
        Account second = first == from ? to : from;
        synchronized (first) {
            synchronized (second) {
                from.add(-amount);
                to.add(amount);
            }
        }
    }
}

class Worker extends Thread {
    private volatile boolean running = true;           // every read goes to main memory

    @Override
    public void run() {
        long spins = 0;
        while (running) spins++;
    }

    void shutdown() { running = false; }
}
```

**Interview answer template.** "Two threads took the same two locks in opposite order. I'd confirm it with a thread dump (`jstack` shows 'Found one Java-level deadlock'), then fix it by imposing a global lock order, or by using `tryLock` with a timeout." Also mention that reading `balance()` from `main` is safe only because of `join()`, which creates a happens-before edge.
