Today you'll see exactly which line runs when something fails, and write generic code that works for many types without casts.

<!-- exercise: d4_e1 | Easy | Wallet with checked and unchecked exceptions -->
**Concepts:** custom checked vs unchecked exceptions · `throws` · multiple `catch` blocks · `finally` · exception chaining (cause)

**Task.** Build a `Wallet`:

- `withdraw(amount)` throws `IllegalArgumentException` (unchecked) for amounts ≤ 0, and a custom **checked** `InsufficientFundsException` that carries the `shortfall` when the balance is too low.
- `loadFromCard(String amountText)` parses the text. On `NumberFormatException`, wrap it in a custom **unchecked** `PaymentException` that keeps the original as its **cause**.
- `attempt(...)` in `main` catches each type separately and has a `finally`.
- Bonus puzzle: `tricky()` has a `return` inside `try` and a `println` in `finally`. Which prints first?

**Starter code** · `WalletDemo.java`

```java
public class WalletDemo {
    public static void main(String[] args) {
        Wallet w = new Wallet(100);
        attempt(w, 30);
        attempt(w, 500);
        attempt(w, -5);
        try {
            w.loadFromCard("12x4");
        } catch (PaymentException e) {
            System.out.println("Caught: " + e.getMessage() + " | cause: " + e.getCause().getClass().getSimpleName());
        }
        System.out.println("Final balance: " + w.getBalance());
        System.out.println("tricky() = " + tricky());
    }

    static void attempt(Wallet w, int amount) {
        // TODO: call withdraw, print "Withdrew <amount>"
        // catch InsufficientFundsException -> "Checked: <message> (short by <shortfall>)"
        // catch IllegalArgumentException   -> "Unchecked: <message>"
        // finally                          -> "  finally runs for <amount>"
    }

    static int tricky() {
        // TODO: return 1 from try; print "finally before return" in finally
        return 0;
    }
}

class InsufficientFundsException extends Exception {
    InsufficientFundsException(int balance, int amount) { /* TODO: message "balance 70 < 500" */ }
    int getShortfall() { return 0; }                            // TODO
}

class PaymentException extends RuntimeException {
    PaymentException(String message, Throwable cause) { /* TODO */ }
}

class Wallet {
    private int balance;

    Wallet(int balance) { this.balance = balance; }
    int getBalance() { return balance; }

    void withdraw(int amount) throws InsufficientFundsException {
        // TODO
    }

    void loadFromCard(String amountText) {
        // TODO: parse, wrap NumberFormatException as PaymentException("could not load '<text>'", cause)
    }
}
```

**Expected output**

```text
Withdrew 30
  finally runs for 30
Checked: balance 70 < 500 (short by 430)
  finally runs for 500
Unchecked: amount must be positive: -5
  finally runs for -5
Caught: could not load '12x4' | cause: NumberFormatException
Final balance: 70
finally before return
tricky() = 1
```

<!-- hints -->
- A custom exception passes its message up with `super(message)`, or `super(message, cause)` to chain a cause.
- Checked exceptions (`extends Exception`) must be declared with `throws` or caught. The compiler forces callers to deal with them. Unchecked ones (`extends RuntimeException`) don't.
- Order of `catch` blocks matters: a more general type above a more specific one won't compile.
- `finally` runs even when `try` returns. The return value is computed first, then `finally` runs, then the method actually returns.

<!-- solution -->
```java
public class WalletDemo {
    public static void main(String[] args) {
        Wallet w = new Wallet(100);
        attempt(w, 30);
        attempt(w, 500);
        attempt(w, -5);
        try {
            w.loadFromCard("12x4");
        } catch (PaymentException e) {
            System.out.println("Caught: " + e.getMessage() + " | cause: " + e.getCause().getClass().getSimpleName());
        }
        System.out.println("Final balance: " + w.getBalance());
        System.out.println("tricky() = " + tricky());   // tricky() runs (and its finally prints) before this println
    }

    static void attempt(Wallet w, int amount) {
        try {
            w.withdraw(amount);
            System.out.println("Withdrew " + amount);
        } catch (InsufficientFundsException e) {          // checked: the compiler made us handle it
            System.out.println("Checked: " + e.getMessage() + " (short by " + e.getShortfall() + ")");
        } catch (IllegalArgumentException e) {             // unchecked: optional to catch
            System.out.println("Unchecked: " + e.getMessage());
        } finally {
            System.out.println("  finally runs for " + amount);
        }
    }

    static int tricky() {
        try {
            return 1;                                      // value 1 is saved
        } finally {
            System.out.println("finally before return");  // then finally runs
        }
    }
}

class InsufficientFundsException extends Exception {     // checked
    private final int shortfall;

    InsufficientFundsException(int balance, int amount) {
        super("balance " + balance + " < " + amount);
        this.shortfall = amount - balance;
    }

    int getShortfall() { return shortfall; }
}

class PaymentException extends RuntimeException {         // unchecked
    PaymentException(String message, Throwable cause) {
        super(message, cause);                             // keep the root cause for the stack trace
    }
}

class Wallet {
    private int balance;

    Wallet(int balance) { this.balance = balance; }
    int getBalance() { return balance; }

    void withdraw(int amount) throws InsufficientFundsException {
        if (amount <= 0) throw new IllegalArgumentException("amount must be positive: " + amount);
        if (amount > balance) throw new InsufficientFundsException(balance, amount);
        balance -= amount;
    }

    void loadFromCard(String amountText) {
        try {
            balance += Integer.parseInt(amountText);
        } catch (NumberFormatException e) {
            throw new PaymentException("could not load '" + amountText + "'", e);
        }
    }
}
```

**Checked or unchecked?** Use checked when the caller can reasonably recover, like insufficient funds or a missing file. Use unchecked for programming errors, like a bad argument or null. Spring and most modern code lean towards unchecked plus a global handler. And never swallow the cause: `throw new X(msg)` without `e` loses the real stack trace.

<!-- exercise: d4_e2 | Medium | try-with-resources: close order and suppressed exceptions -->
**Concepts:** `AutoCloseable` · try-with-resources · reverse close order · `getSuppressed()` · why the old `finally { close(); }` loses errors

**Task.** Write a `Res` class implementing `AutoCloseable` that prints `open <name>` in its constructor and `close <name>` in `close()`. If created with `failOnClose = true`, `close()` also throws `IllegalStateException("close of <name> failed")`. `main` is given. Implement `Res` and `oldStyle()`, then study the output:

1. Two resources: in which order are they closed?
2. Body throws **and** close throws: which exception do you catch, and where did the other one go?
3. The pre-Java-7 `try/finally` version: which exception survives?

**Starter code** · `ResourceOrder.java`

```java
public class ResourceOrder {
    public static void main(String[] args) {
        System.out.println("-- normal run --");
        try (Res db = new Res("db", false); Res file = new Res("file", false)) {
            System.out.println("using " + db.name + " and " + file.name);
        }

        System.out.println("-- body throws, close throws too --");
        try (Res net = new Res("net", true)) {
            throw new IllegalStateException("body failed");
        } catch (IllegalStateException e) {
            System.out.println("caught: " + e.getMessage());
            for (Throwable s : e.getSuppressed()) System.out.println("suppressed: " + s.getMessage());
        } finally {
            System.out.println("finally");
        }

        System.out.println("-- old style try/finally --");
        try {
            oldStyle();
        } catch (IllegalStateException e) {
            System.out.println("caught: " + e.getMessage() + ", suppressed: " + e.getSuppressed().length);
        }
    }

    static void oldStyle() {
        // TODO: create Res("legacy", true); in try throw IllegalStateException("body failed"); close it in finally
    }
}

class Res implements AutoCloseable {
    final String name;

    Res(String name, boolean failOnClose) {
        this.name = name;
        // TODO
    }

    @Override
    public void close() {
        // TODO
    }
}
```

**Expected output**

```text
-- normal run --
open db
open file
using db and file
close file
close db
-- body throws, close throws too --
open net
close net
caught: body failed
suppressed: close of net failed
finally
-- old style try/finally --
open legacy
close legacy
caught: close of legacy failed, suppressed: 0
```

<!-- hints -->
- Resources close in **reverse** order of opening, like a stack, because later resources often depend on earlier ones.
- Resources are closed **before** `catch` and `finally` run.
- `close()` in the interface is declared `throws Exception`. Your override can drop that clause, so callers don't need to catch anything.
- In `oldStyle`, an exception thrown from `finally` *replaces* the one from `try`. The real error, "body failed", is lost.

<!-- solution -->
```java
public class ResourceOrder {
    public static void main(String[] args) {
        System.out.println("-- normal run --");
        try (Res db = new Res("db", false); Res file = new Res("file", false)) {
            System.out.println("using " + db.name + " and " + file.name);
        }                                                     // closes file, then db

        System.out.println("-- body throws, close throws too --");
        try (Res net = new Res("net", true)) {
            throw new IllegalStateException("body failed");
        } catch (IllegalStateException e) {                   // primary exception is kept
            System.out.println("caught: " + e.getMessage());
            for (Throwable s : e.getSuppressed()) System.out.println("suppressed: " + s.getMessage());
        } finally {
            System.out.println("finally");
        }

        System.out.println("-- old style try/finally --");
        try {
            oldStyle();
        } catch (IllegalStateException e) {
            System.out.println("caught: " + e.getMessage() + ", suppressed: " + e.getSuppressed().length);
        }
    }

    static void oldStyle() {
        Res r = new Res("legacy", true);
        try {
            throw new IllegalStateException("body failed");
        } finally {
            r.close();                                        // its exception REPLACES "body failed"
        }
    }
}

class Res implements AutoCloseable {
    final String name;
    private final boolean failOnClose;

    Res(String name, boolean failOnClose) {
        this.name = name;
        this.failOnClose = failOnClose;
        System.out.println("open " + name);
    }

    @Override
    public void close() {                                     // narrower than 'throws Exception'
        System.out.println("close " + name);
        if (failOnClose) throw new IllegalStateException("close of " + name + " failed");
    }
}
```

**Takeaway.** try-with-resources always closes, closes in reverse order, and keeps the *original* exception while attaching close failures as suppressed. Use it for every `Connection`, `InputStream`, `Lock` wrapper or `ExecutorService` (which is `AutoCloseable` since Java 19).

<!-- exercise: d4_e3 | Medium | Generics lab: `Pair`, bounded types and PECS -->
**Concepts:** generic classes and methods · bounded type `<T extends Comparable<? super T>>` · `? extends` (producer) · `? super` (consumer) · type erasure

**Task.** Implement:

1. `Pair<K, V>` (immutable) with a static factory `Pair.of(k, v)`, `swap()` returning `Pair<V, K>`, and `toString()` → `(age, 30)`.
2. `max(list)` that works for any `Comparable` type without casting.
3. `sum(List<? extends Number>)`, which accepts `List<Integer>` **and** `List<Double>`.
4. `copy(src, dst)` that copies a `List<Integer>` into a `List<Number>`. `addDefaults(List<? super Integer>)` adds `0` and `-1`.
5. `Box<T>` that, because of type erasure, needs a `Class<T>` to report its type name and create a new `T`.

**Starter code** · `GenericsLab.java`

```java
import java.util.ArrayList;
import java.util.List;

public class GenericsLab {
    public static void main(String[] args) {
        Pair<String, Integer> p = Pair.of("age", 30);
        System.out.println(p + " swapped " + p.swap());

        System.out.println("max int: " + max(List.of(3, 9, 4)));
        System.out.println("max word: " + max(List.of("pear", "apple", "zebra")));

        List<Integer> ints = List.of(1, 2, 3);
        List<Double> doubles = List.of(1.5, 2.5);
        System.out.println("sum ints: " + sum(ints) + ", sum doubles: " + sum(doubles));

        List<Number> sink = new ArrayList<>();
        copy(ints, sink);
        copy(doubles, sink);
        System.out.println("copied into List<Number>: " + sink);

        List<Object> objects = new ArrayList<>();
        addDefaults(objects);
        System.out.println("defaults into List<Object>: " + objects);

        Box<String> box = new Box<>(String.class);
        System.out.println("box holds " + box.typeName() + ", empty=" + box.isEmpty());
        System.out.println("new instance via Class: '" + box.create() + "'");
    }

    static <T extends Comparable<? super T>> T max(List<? extends T> list) { return null; }   // TODO
    static double sum(List<? extends Number> nums) { return 0; }                               // TODO
    static <T> void copy(List<? extends T> src, List<? super T> dst) { }                      // TODO
    static void addDefaults(List<? super Integer> dst) { }                                    // TODO
}

final class Pair<K, V> {
    // TODO: fields, private constructor
    static <K, V> Pair<K, V> of(K key, V value) { return null; }  // TODO
    Pair<V, K> swap() { return null; }                             // TODO
}

class Box<T> {
    Box(Class<T> type) { }                                         // TODO
    String typeName() { return ""; }                               // TODO
    boolean isEmpty() { return true; }                             // TODO
    T create() { return null; }                                    // TODO: new T() is impossible, so use the Class
}
```

**Expected output**

```text
(age, 30) swapped (30, age)
max int: 9
max word: zebra
sum ints: 6.0, sum doubles: 4.0
copied into List<Number>: [1, 2, 3, 1.5, 2.5]
defaults into List<Object>: [0, -1]
box holds String, empty=true
new instance via Class: ''
```

<!-- hints -->
- **PECS:** *Producer Extends, Consumer Super*. You only **read** from `src`, so it's `? extends T`. You only **write** into `dst`, so it's `? super T`.
- From a `List<? extends Number>` you can read `Number` (call `doubleValue()`), but you can't add anything except `null`.
- `List<Integer>` is **not** a `List<Number>` (generics are invariant). That's exactly why wildcards exist.
- At runtime `Box<String>` is just `Box`, because erasure removes `T`. `type.getDeclaredConstructor().newInstance()` creates an instance through the `Class` object.

<!-- solution -->
```java
import java.util.ArrayList;
import java.util.List;

public class GenericsLab {
    public static void main(String[] args) {
        Pair<String, Integer> p = Pair.of("age", 30);
        System.out.println(p + " swapped " + p.swap());

        System.out.println("max int: " + max(List.of(3, 9, 4)));
        System.out.println("max word: " + max(List.of("pear", "apple", "zebra")));

        List<Integer> ints = List.of(1, 2, 3);
        List<Double> doubles = List.of(1.5, 2.5);
        System.out.println("sum ints: " + sum(ints) + ", sum doubles: " + sum(doubles));
        // sum(List.of("a"));            // won't compile: String is not a Number
        // List<Number> nums = ints;     // won't compile: generics are invariant

        List<Number> sink = new ArrayList<>();
        copy(ints, sink);
        copy(doubles, sink);
        System.out.println("copied into List<Number>: " + sink);

        List<Object> objects = new ArrayList<>();
        addDefaults(objects);
        System.out.println("defaults into List<Object>: " + objects);

        Box<String> box = new Box<>(String.class);
        System.out.println("box holds " + box.typeName() + ", empty=" + box.isEmpty());
        System.out.println("new instance via Class: '" + box.create() + "'");
    }

    // T must be comparable to itself (or to a supertype, e.g. java.sql.Date via java.util.Date)
    static <T extends Comparable<? super T>> T max(List<? extends T> list) {
        if (list.isEmpty()) throw new IllegalArgumentException("empty list");
        T best = list.get(0);
        for (T item : list) {
            if (item.compareTo(best) > 0) best = item;
        }
        return best;
    }

    static double sum(List<? extends Number> nums) {          // producer: we only read
        double total = 0;
        for (Number n : nums) total += n.doubleValue();
        return total;
    }

    static <T> void copy(List<? extends T> src, List<? super T> dst) {
        for (T item : src) dst.add(item);                     // read as T, write as T
    }

    static void addDefaults(List<? super Integer> dst) {      // consumer: we only write
        dst.add(0);
        dst.add(-1);
    }
}

final class Pair<K, V> {
    private final K key;
    private final V value;

    private Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    static <K, V> Pair<K, V> of(K key, V value) { return new Pair<>(key, value); }

    K key() { return key; }
    V value() { return value; }

    Pair<V, K> swap() { return new Pair<>(value, key); }

    @Override
    public String toString() { return "(" + key + ", " + value + ")"; }
}

class Box<T> {
    private final Class<T> type;        // erasure removes T at runtime, so we keep the Class ourselves
    private T value;

    Box(Class<T> type) { this.type = type; }

    String typeName() { return type.getSimpleName(); }
    boolean isEmpty() { return value == null; }
    void set(T value) { this.value = value; }

    T create() {
        try {
            return type.getDeclaredConstructor().newInstance();
        } catch (ReflectiveOperationException e) {
            throw new IllegalStateException("cannot create " + type.getName(), e);
        }
    }
}
```

**Where you see this in real code.** `Collections.copy(List<? super T> dest, List<? extends T> src)`, `Collections.max`, `Comparator<? super T>` in `List.sort`, and Spring's `RestTemplate.getForObject(url, User.class)` all rely on these same ideas. Passing `User.class` works around erasure in the same way `Box` does.
