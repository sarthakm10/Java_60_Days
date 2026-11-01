// ============================================================
// 60-Day SDE Interview Prep – Complete Curriculum Data
// Inspired by 60dayplan PDF + comprehensive DSA Practice
// Target: Backend/Full-Stack Java Developer with 2–3 YOE
//
// Subtopic ids are permanent progress keys (saved checkmarks point at them).
// When a topic moves to another day it keeps its ids, so an id's "dN" prefix
// is where it was first added, not necessarily the day it is on now.
// ============================================================

const CURRICULUM_DATA = [
  // ===================== PHASE 1: CORE JAVA DEEP DIVE (Days 1–10) =====================
  {
    day: 1,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "OOP Foundations — Classes, Objects & Access Modifiers",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Java — OOP Foundations",
        category: "Java",
        subtopics: [
          { id: "d1_t1_s1", label: "Classes & Objects — fields, methods, constructors, default constructor, this keyword" },
          { id: "d1_t1_s2", label: "Access modifiers — private, default (package-private), protected, public; visibility rules across packages" },
          { id: "d1_t1_s3", label: "Constructor chaining — this() and super() calls, order of execution in inheritance" },
          { id: "d1_t1_s4", label: "static keyword — static variables (class-level), static methods, static blocks, static imports" },
          { id: "d1_t1_s5", label: "final keyword — final variables (constants), final methods (no override), final classes (no extend)" },
          { id: "d1_t1_s6", label: "Wrapper classes — Integer, Double, etc.; auto-boxing & unboxing; Integer cache -128 to 127 trap" },
          { id: "d1_t1_s7", label: "String basics — String pool, immutability of String, why new String('abc') creates 2 objects" },
          { id: "d1_t1_s8", label: "== vs .equals() — reference vs content comparison; StringBuilder vs StringBuffer (thread-safety)" }
        ]
      },
      {
        name: "DSA — Complexity Analysis & Setup",
        category: "DSA",
        subtopics: [
          { id: "d1_t2_s1", label: "Big-O notation — what it means, how to calculate for simple loops" },
          { id: "d1_t2_s2", label: "Common complexities: O(1), O(log n), O(n), O(n log n), O(n²) — with examples" },
          { id: "d1_t2_s3", label: "Space complexity — auxiliary space vs total space; stack space in recursion" },
          { id: "d1_t2_s4", label: "Set up LeetCode/HackerRank account, solve: Print Hello World, Swap Two Numbers" }
        ]
      }
    ]
  },
  {
    day: 2,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "OOP Deep Dive — Inheritance, Polymorphism, Abstraction & the Object Class",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Java — Inheritance, Polymorphism & Object Class",
        category: "Java",
        subtopics: [
          { id: "d2_t1_s1", label: "Inheritance — extends keyword, IS-A relationship, single inheritance in Java, Object class" },
          { id: "d2_t1_s2", label: "Method overloading — same name, different params; compile-time polymorphism; return type alone is not enough" },
          { id: "d2_t1_s3", label: "Method overriding — @Override, runtime polymorphism; rules: same signature, covariant return types" },
          { id: "d2_t1_s4", label: "Cannot override: static methods (hiding), final methods, private methods — know the rules" },
          { id: "d2_t1_s5", label: "Abstract classes — abstract methods, concrete methods, constructors; when to use abstract class vs interface" },
          { id: "d2_t1_s6", label: "Interfaces — default methods (Java 8), static methods, multiple interface implementation" },
          { id: "d2_t1_s7", label: "Diamond problem — how Java resolves it with interfaces; explicit super call with InterfaceName.super.method()" },
          { id: "d2_t1_s8", label: "Composition vs Inheritance — 'has-a' vs 'is-a'; why prefer composition (GoF principle)" },
          { id: "d2_t4_s1", label: "Object class methods — toString(), equals()/hashCode(), getClass(), clone(), wait()/notify(): what every class inherits" },
          { id: "d2_t4_s2", label: "clone() — shallow vs deep copy, the Cloneable marker, why clone() is considered broken; prefer copy constructors / static factories" }
        ]
      },
      {
        name: "DSA — Arrays: Basics & Easy Problems",
        category: "DSA",
        subtopics: [
          { id: "d2_t2_s1", label: "Array basics — declaration, initialization, memory layout (contiguous), 0-indexed" },
          { id: "d2_t2_s2", label: "Solve: Find Largest Element in Array" },
          { id: "d2_t2_s3", label: "Solve: Reverse an Array (in-place swap)" },
          { id: "d2_t2_s4", label: "Solve: Check if Array is Sorted" },
          { id: "d2_t2_s5", label: "Solve: Remove Duplicates from Sorted Array" }
        ]
      }
    ]
  },
  {
    day: 3,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "OOP Advanced — Encapsulation, Immutability, Enums & Comparators",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Java — Encapsulation & Advanced OOP",
        category: "Java",
        subtopics: [
          { id: "d3_t1_s1", label: "Encapsulation — private fields + public getters/setters; JavaBean conventions" },
          { id: "d3_t1_s2", label: "Immutable classes — final class, final fields, no setters, defensive copies for mutable fields" },
          { id: "d3_t1_s6", label: "Inner classes — static nested, non-static inner, local, anonymous; when to use each" },
          { id: "d3_t1_s8", label: "Enum — constants, constructor, methods, EnumSet, EnumMap; using enum instead of int constants" },
          { id: "d14_t1_s8", label: "Comparable vs Comparator — natural ordering vs external; Comparator.comparing().thenComparing() chains" },
          { id: "d3_t1_s7", label: "Marker interfaces — Serializable, Cloneable, RandomAccess; what they signal" },
          { id: "d3_t1_s4", label: "transient keyword — excluded from serialization; gets default value on deserialization" },
          { id: "d3_t1_s5", label: "Serialization — Serializable vs Externalizable, serialVersionUID, custom readObject/writeObject" }
        ]
      },
      {
        name: "DSA — Arrays: Two Sum & Easy Patterns",
        category: "DSA",
        subtopics: [
          { id: "d3_t2_s1", label: "Solve: Two Sum — brute-force O(n²) first, then HashMap O(n) approach" },
          { id: "d3_t2_s2", label: "Solve: Contains Duplicate" },
          { id: "d3_t2_s3", label: "Solve: Best Time to Buy and Sell Stock (single transaction)" },
          { id: "d3_t2_s4", label: "Solve: Move Zeroes to end" },
          { id: "d3_t2_s5", label: "Solve: Plus One (array representing a number)" }
        ]
      }
    ]
  },
  {
    day: 4,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "Exception Handling & Generics",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Java — Exceptions & Generics",
        category: "Java",
        subtopics: [
          { id: "d7_t1_s1", label: "Exception hierarchy — Throwable → Error / Exception; checked vs unchecked (RuntimeException)" },
          { id: "d7_t1_s2", label: "try-catch-finally — execution flow; try-with-resources & AutoCloseable (Java 7+)" },
          { id: "d7_t1_s3", label: "Multi-catch: catch (IOException | SQLException e); exception chaining with cause" },
          { id: "d7_t1_s4", label: "Custom exceptions — extending Exception vs RuntimeException; best practices" },
          { id: "d7_t1_s5", label: "Generics — type parameters <T>, <K,V>; bounded types: <T extends Comparable<T>>" },
          { id: "d7_t1_s6", label: "Wildcards — unbounded (?), upper-bounded (? extends), lower-bounded (? super); PECS principle" },
          { id: "d7_t1_s7", label: "Type erasure — generics only at compile-time; limitations at runtime (cannot do new T())" },
          { id: "d7_t1_s9", label: "final, finally, finalize — differences; why finalize is deprecated in Java 9+" }
        ]
      },
      {
        name: "DSA — Strings: Easy Problems",
        category: "DSA",
        subtopics: [
          { id: "d4_t2_s1", label: "Solve: Valid Palindrome (two pointers, ignore non-alphanumeric)" },
          { id: "d4_t2_s2", label: "Solve: Valid Anagram (frequency counting with HashMap or int[26])" },
          { id: "d4_t2_s3", label: "Solve: Reverse String (in-place)" },
          { id: "d4_t2_s4", label: "Solve: Longest Common Prefix" },
          { id: "d4_t2_s5", label: "Solve: First Unique Character in a String" }
        ]
      }
    ]
  },
  {
    day: 5,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "Java 8 — Lambdas, Functional Interfaces & Method References",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Java 8 — Lambdas & Functional Interfaces",
        category: "Java",
        subtopics: [
          { id: "d4_t1_s1", label: "Lambda syntax — (params) -> expression; effectively-final variables in closures" },
          { id: "d4_t1_s2", label: "@FunctionalInterface annotation — exactly one abstract method; SAM (Single Abstract Method)" },
          { id: "d4_t1_s3", label: "Built-in: Predicate<T> — test(T), and(), or(), negate(); use in filter()" },
          { id: "d4_t1_s4", label: "Built-in: Function<T,R> — apply(T), andThen(), compose(); use in map()" },
          { id: "d4_t1_s5", label: "Built-in: Consumer<T> — accept(T); Supplier<T> — get(); when to use each" },
          { id: "d4_t1_s6", label: "BiFunction<T,U,R>, BiConsumer<T,U>, UnaryOperator<T>, BinaryOperator<T> — two-arg variants" },
          { id: "d4_t1_s7", label: "Method references — ClassName::staticMethod, obj::instanceMethod, ClassName::new (constructor ref)" },
          { id: "d4_t1_s8", label: "Practice: write 5 lambdas — sorting, filtering, transforming lists using functional interfaces" }
        ]
      },
      {
        name: "DSA — Strings & HashMap Patterns",
        category: "DSA",
        subtopics: [
          { id: "d5_t2_s1", label: "HashMap fundamentals — put, get, containsKey, getOrDefault in Java" },
          { id: "d5_t2_s2", label: "Solve: Group Anagrams (HashMap with sorted key pattern)" },
          { id: "d5_t2_s3", label: "Solve: Ransom Note (frequency map)" },
          { id: "d5_t2_s4", label: "Solve: Isomorphic Strings" },
          { id: "d5_t2_s5", label: "Solve: Word Pattern" }
        ]
      }
    ]
  },
  {
    day: 6,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "Java 8 — Stream API Deep Dive & Collectors",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Java 8 — Streams & Collectors (Critical for Interviews)",
        category: "Java",
        subtopics: [
          { id: "d5_t1_s1", label: "Stream pipeline basics — source → intermediate ops → terminal op; lazy evaluation" },
          { id: "d5_t1_s2", label: "Intermediate ops: filter(), map(), flatMap(), distinct(), sorted(), peek(), limit(), skip()" },
          { id: "d5_t1_s3", label: "Terminal ops: collect(), forEach(), count(), reduce(), toArray(), min(), max()" },
          { id: "d5_t1_s4", label: "Collectors: toList(), toSet(), toMap(), joining(), counting()" },
          { id: "d5_t1_s5", label: "Collectors.groupingBy() — group employees by department (very common interview Q)" },
          { id: "d5_t1_s6", label: "Collectors.partitioningBy() — split into two groups by predicate" },
          { id: "d5_t1_s7", label: "flatMap — flattening nested collections: List<List<T>> → Stream<T>; with practical example" },
          { id: "d5_t1_s8", label: "reduce() — accumulator + identity value; sum, product, string concatenation patterns" },
          { id: "d5_t1_s9", label: "Short-circuit ops: findFirst(), anyMatch(), allMatch(), noneMatch() — efficiency on large streams" }
        ]
      },
      {
        name: "DSA — Two Pointers: Easy",
        category: "DSA",
        subtopics: [
          { id: "d6_t2_s1", label: "Two-pointer pattern — converging pointers on sorted data explained" },
          { id: "d6_t2_s2", label: "Solve: Two Sum II (sorted array — two pointers)" },
          { id: "d6_t2_s3", label: "Solve: Valid Palindrome II (allow deleting at most one char)" },
          { id: "d6_t2_s4", label: "Solve: Merge Sorted Array (in-place, back-to-front)" },
          { id: "d6_t2_s5", label: "Solve: Squares of a Sorted Array" }
        ]
      }
    ]
  },
  {
    day: 7,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "Optional, Date/Time API & Modern Java (10 → 21)",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Java 8+ — Optional, Date/Time & Modern Java (10 → 21)",
        category: "Java",
        subtopics: [
          { id: "d6_t1_s1", label: "Optional<T> — of(), ofNullable(), empty(); orElse(), orElseGet(), orElseThrow()" },
          { id: "d6_t1_s2", label: "Optional chaining — map(), flatMap(), filter(), ifPresent(); avoid get() without isPresent()" },
          { id: "d6_t1_s3", label: "Code pattern: Optional.ofNullable(user).map(User::getEmail).orElse('N/A')" },
          { id: "d6_t1_s5", label: "Date/Time API: LocalDate, LocalTime, LocalDateTime, ZonedDateTime — immutable, thread-safe" },
          { id: "d6_t1_s6", label: "Duration (time-based) vs Period (date-based); DateTimeFormatter for formatting/parsing" },
          { id: "d6_t1_s7", label: "Java 10–11: var (Java 10), String methods isBlank/strip/lines/repeat and Files.readString/writeString (Java 11)" },
          { id: "d6_t1_s8", label: "Java 14–17: Records (data carriers), Sealed classes, Text blocks (\"\"\"), Pattern matching instanceof" },
          { id: "d6_t1_s9", label: "Switch expressions (Java 14+) — arrow syntax, yield keyword, return values from switch" },
          { id: "d7_t4_s1", label: "Java 21 (LTS): pattern matching for switch, record patterns, sequenced collections (getFirst/getLast/reversed)" },
          { id: "d7_t4_s2", label: "LTS releases (8, 11, 17, 21, 25) — what changed between them and how to talk about upgrading in interviews" }
        ]
      },
      {
        name: "DSA — Recursion Fundamentals",
        category: "DSA",
        subtopics: [
          { id: "d7_t3_s1", label: "Recursion basics — base case + recursive case, each call gets its own stack frame, StackOverflowError" },
          { id: "d7_t3_s2", label: "Recursion tree & complexity — time ≈ calls × work per call, space = max depth; head vs tail recursion (no TCO in Java)" },
          { id: "d7_t3_s3", label: "Solve: Print 1→N and N→1, Factorial, Sum of Digits (recursive warm-ups)" },
          { id: "d7_t3_s4", label: "Solve: Reverse String & Valid Palindrome recursively (two indices, no substring copies)" },
          { id: "d7_t3_s5", label: "Solve: Power of Two & Fibonacci Number (plain recursion — notice the repeated work DP removes later)" }
        ]
      }
    ]
  },
  {
    day: 8,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "Multithreading — Thread Basics & Synchronization",
    estimatedTime: "4–5 hrs",
    topics: [
      {
        name: "Java — Multithreading Basics",
        category: "Java",
        subtopics: [
          { id: "d8_t1_s1", label: "Thread lifecycle: NEW → RUNNABLE → BLOCKED → WAITING → TIMED_WAITING → TERMINATED" },
          { id: "d8_t1_s2", label: "Creating threads — extending Thread vs implementing Runnable vs Callable<T> (returns value)" },
          { id: "d8_t1_s3", label: "synchronized keyword — method-level vs block-level; intrinsic lock (monitor) concept" },
          { id: "d8_t1_s4", label: "volatile keyword — visibility guarantee across threads; happens-before relationship" },
          { id: "d8_t1_s5", label: "wait(), notify(), notifyAll() — inter-thread communication on Object monitor; spurious wakeups" },
          { id: "d8_t1_s6", label: "Deadlock — causes (circular wait), detection (jstack), prevention (lock ordering, tryLock timeout)" },
          { id: "d8_t1_s7", label: "ThreadLocal<T> — per-thread storage without synchronization; use for request context, DB connections" },
          { id: "d8_t1_s8", label: "Thread.sleep() vs Object.wait() — differences; Thread.yield() and thread priority" },
          { id: "d8_t4_s1", label: "Java Memory Model — happens-before rules, instruction reordering, safe publication; double-checked locking singleton and why it needs volatile" }
        ]
      },
      {
        name: "DSA — Sorting Algorithms",
        category: "DSA",
        subtopics: [
          { id: "d8_t3_s1", label: "Elementary sorts — Bubble, Selection, Insertion: how each works, O(n²), stability, why insertion sort is fast on nearly-sorted data" },
          { id: "d50_t2_s1", label: "Merge Sort — implementation, O(n log n), stable, O(n) space; when to use" },
          { id: "d50_t2_s2", label: "Quick Sort — partition, average O(n log n), worst O(n²); pivot strategies" },
          { id: "d8_t3_s2", label: "Java sorting — Arrays.sort (dual-pivot quicksort for primitives, TimSort for objects), Comparable vs Comparator, sorting with lambdas" },
          { id: "d50_t2_s4", label: "Solve: Largest Number (custom comparator sort)" },
          { id: "d8_t3_s3", label: "Solve: Sort an Array (implement merge sort yourself)" }
        ]
      }
    ]
  },
  {
    day: 9,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "Concurrency — Executors, Thread Pools, Locks, CompletableFuture & Virtual Threads",
    estimatedTime: "4–5 hrs",
    topics: [
      {
        name: "Java — Advanced Concurrency",
        category: "Java",
        subtopics: [
          { id: "d9_t1_s1", label: "ExecutorService — FixedThreadPool, CachedThreadPool, ScheduledExecutor, SingleThread; shutdown() vs shutdownNow()" },
          { id: "d9_t4_s1", label: "ThreadPoolExecutor internals — corePoolSize, maxPoolSize, work queue, keepAlive, rejection policies; sizing CPU-bound vs I/O-bound pools" },
          { id: "d9_t1_s2", label: "Future<T> — submit(), get() blocks the calling thread; isDone(), cancel(), limitations" },
          { id: "d9_t1_s3", label: "CompletableFuture — thenApply, thenAccept, thenCombine, exceptionally, allOf/anyOf (non-blocking)" },
          { id: "d9_t1_s4", label: "ReentrantLock vs synchronized — tryLock(timeout), lockInterruptibly(), fairness, Condition objects" },
          { id: "d9_t1_s5", label: "ReadWriteLock, StampedLock — optimistic reads for read-heavy workloads" },
          { id: "d9_t1_s6", label: "Atomic classes: AtomicInteger, AtomicReference, CAS operations; LongAdder for high contention" },
          { id: "d9_t1_s7", label: "CountDownLatch (one-time barrier), CyclicBarrier (reusable), Semaphore (permits) — differences" },
          { id: "d9_t1_s8", label: "Parallel streams — ForkJoinPool, when to use; shared mutable state pitfalls" },
          { id: "d9_t4_s2", label: "Virtual threads (Java 21) — cheap threads for blocking I/O, Executors.newVirtualThreadPerTaskExecutor(), pinning pitfalls; vs platform threads" }
        ]
      },
      {
        name: "DSA — Two Pointers: Medium",
        category: "DSA",
        subtopics: [
          { id: "d15_t2_s1", label: "Solve: 3Sum (sort + two pointers, skip duplicates)" },
          { id: "d15_t2_s2", label: "Solve: Container With Most Water" },
          { id: "d15_t2_s3", label: "Solve: Sort Colors (Dutch National Flag — 3-way partition)" },
          { id: "d15_t2_s4", label: "Solve: Trapping Rain Water (two-pointer approach)" },
          { id: "d15_t2_s5", label: "Solve: Longest Substring Without Repeating Characters (sliding window intro)" }
        ]
      }
    ]
  },
  {
    day: 10,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "SOLID Principles, Reflection & Annotations + Phase 1 Review",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Java — SOLID, Reflection & Annotations",
        category: "Java",
        subtopics: [
          { id: "d10_t1_s1", label: "S — Single Responsibility: one reason to change per class; refactoring God classes" },
          { id: "d10_t1_s2", label: "O — Open/Closed: open for extension, closed for modification — Strategy pattern example" },
          { id: "d10_t1_s3", label: "L — Liskov Substitution: subtypes must be substitutable; Rectangle-Square problem" },
          { id: "d10_t1_s4", label: "I — Interface Segregation: small, focused interfaces; don't force clients to depend on unused methods" },
          { id: "d10_t1_s5", label: "D — Dependency Inversion: depend on abstractions (List<T>) not concretions (ArrayList<T>)" },
          { id: "d10_t4_s1", label: "Reflection — Class objects, getDeclaredFields/Methods, setAccessible; performance cost and risks; how frameworks use it" },
          { id: "d10_t4_s2", label: "Annotations — built-in (@Override, @FunctionalInterface, @Deprecated), custom annotations, @Retention & @Target, reading them at runtime" },
          { id: "d10_t4_s3", label: "Dynamic proxies — java.lang.reflect.Proxy vs CGLIB subclassing; the basis of Spring AOP and @Transactional" },
          { id: "d10_t1_s8", label: "Phase 1 rapid-fire review: explain all OOP, Java 8, threading concepts from memory" }
        ]
      },
      {
        name: "DSA — Sliding Window",
        category: "DSA",
        subtopics: [
          { id: "d16_t2_s1", label: "Sliding window template — fixed-size vs variable-size; expand/shrink pattern" },
          { id: "d16_t2_s2", label: "Solve: Maximum Sum Subarray of Size K (fixed window)" },
          { id: "d16_t2_s3", label: "Solve: Minimum Size Subarray Sum (variable window)" },
          { id: "d16_t2_s4", label: "Solve: Permutation in String (frequency map + window)" },
          { id: "d16_t2_s5", label: "Solve: Maximum Subarray (Kadane's Algorithm — DP/greedy)" }
        ]
      }
    ]
  },

  // ===================== PHASE 2: COLLECTIONS FRAMEWORK (Days 11–18) =====================
  {
    day: 11,
    phase: "Phase 2: Collections",
    phaseRange: "Days 11–18",
    categories: ["Java", "DSA"],
    title: "ArrayList & LinkedList — Internals, Performance & Thread-Safety",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Collections — List Implementations",
        category: "Java",
        subtopics: [
          { id: "d11_t1_s1", label: "Collection hierarchy — Iterable → Collection → List, Set, Queue; Map is separate" },
          { id: "d17_t1_s4", label: "Iterable vs Iterator — for-each requires Iterable; ListIterator for bidirectional traversal" },
          { id: "d11_t1_s2", label: "ArrayList internals — dynamic Object[] array, default capacity 10, grows by 1.5x; ensureCapacity()" },
          { id: "d11_t1_s3", label: "ArrayList time complexity — get O(1), add at end O(1) amortized, add in middle O(n), remove O(n)" },
          { id: "d11_t1_s4", label: "LinkedList — doubly-linked; addFirst/addLast O(1), get(index) O(n); implements both List and Deque" },
          { id: "d11_t1_s5", label: "ArrayList vs LinkedList — cache locality, memory overhead (node pointers), when to choose each" },
          { id: "d11_t1_s6", label: "Thread-safety: Collections.synchronizedList() vs CopyOnWriteArrayList vs Vector (legacy, avoid)" },
          { id: "d11_t1_s7", label: "ConcurrentModificationException — fail-fast iterators (modCount) vs fail-safe/snapshot iterators (CopyOnWriteArrayList, concurrent collections); fix with Iterator.remove() or removeIf()" },
          { id: "d11_t1_s8", label: "Arrays.asList() (fixed-size, set OK, add/remove not) vs List.of() (Java 9, fully immutable, no nulls)" },
          { id: "d11_t1_s9", label: "subList() returns a view — structural modification on original causes exception; copy with new ArrayList<>()" }
        ]
      },
      {
        name: "DSA — Prefix Sum & Hashing Patterns",
        category: "DSA",
        subtopics: [
          { id: "d11_t3_s1", label: "Prefix sum pattern — prefix[i] = sum of the first i elements; any range sum in O(1); prefix sums + HashMap of earlier sums" },
          { id: "d11_t3_s2", label: "Solve: Running Sum of 1d Array & Find Pivot Index" },
          { id: "d11_t3_s3", label: "Solve: Range Sum Query - Immutable" },
          { id: "d29_t2_s1", label: "Solve: Product of Array Except Self (prefix × suffix products)" },
          { id: "d29_t2_s3", label: "Solve: Subarray Sum Equals K (prefix sum + HashMap)" },
          { id: "d29_t2_s2", label: "Solve: Longest Consecutive Sequence (HashSet)" }
        ]
      }
    ]
  },
  {
    day: 12,
    phase: "Phase 2: Collections",
    phaseRange: "Days 11–18",
    categories: ["Java", "DSA"],
    title: "HashMap Internals — The Most Asked Collection Topic",
    estimatedTime: "4–5 hrs",
    topics: [
      {
        name: "Collections — HashMap Deep Dive",
        category: "Java",
        subtopics: [
          { id: "d12_t1_s1", label: "HashMap internals — array of Node<K,V> buckets, index = hash(key) & (capacity-1), default capacity 16" },
          { id: "d12_t1_s2", label: "Hash collision — chaining with linked list; Java 8+ treeification: linked list → Red-Black Tree when bucket > 8 and table ≥ 64" },
          { id: "d12_t1_s3", label: "hashCode() + equals() contract — MUST override both; equal objects MUST have same hashCode" },
          { id: "d12_t1_s4", label: "Load factor (0.75 default) — when size > capacity × loadFactor, capacity doubles, all entries rehash" },
          { id: "d12_t1_s5", label: "Worst-case: O(n) in Java 7, O(log n) in Java 8+ with treeified buckets" },
          { id: "d12_t1_s6", label: "null handling — HashMap allows one null key (bucket 0) and null values; ConcurrentHashMap allows neither; TreeMap allows null values but not a null key under natural ordering" },
          { id: "d12_t1_s7", label: "Mutable keys danger — if hashCode() changes after put(), entry becomes unretrievable forever" },
          { id: "d12_t1_s8", label: "HashMap vs LinkedHashMap (insertion/access order) vs TreeMap (sorted by key, O(log n))" },
          { id: "d12_t1_s9", label: "Map.Entry iteration: entrySet() (most efficient) vs keySet() + get() (two lookups); forEach with lambda" }
        ]
      },
      {
        name: "DSA — Linked List: Easy",
        category: "DSA",
        subtopics: [
          { id: "d7_t2_s1", label: "Singly linked list — node structure, traversal, insertion at head/tail" },
          { id: "d7_t2_s2", label: "Solve: Reverse Linked List (iterative — prev/curr/next pointers)" },
          { id: "d7_t2_s3", label: "Solve: Middle of Linked List (slow & fast pointers)" },
          { id: "d7_t2_s4", label: "Solve: Merge Two Sorted Lists" },
          { id: "d7_t2_s5", label: "Solve: Remove Duplicates from Sorted List" }
        ]
      }
    ]
  },
  {
    day: 13,
    phase: "Phase 2: Collections",
    phaseRange: "Days 11–18",
    categories: ["Java", "DSA"],
    title: "ConcurrentHashMap, LRU Cache & Advanced Map Operations",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Collections — Concurrent Maps & Advanced Ops",
        category: "Java",
        subtopics: [
          { id: "d13_t1_s1", label: "ConcurrentHashMap — bucket-level CAS + synchronized (Java 8+); no null keys/values allowed" },
          { id: "d13_t1_s2", label: "HashMap vs Hashtable vs ConcurrentHashMap — always prefer CHM; Hashtable is legacy, never use" },
          { id: "d13_t1_s3", label: "getOrDefault(), putIfAbsent() — safe defaults; computeIfAbsent() — lazy initialization pattern" },
          { id: "d13_t1_s4", label: "compute() — atomic read-modify-write; merge(key, val, fn) — one-liner word frequency counting" },
          { id: "d13_t1_s5", label: "LRU Cache with LinkedHashMap — accessOrder=true + removeEldestEntry() override" },
          { id: "d13_t1_s6", label: "WeakHashMap — keys are WeakReferences, GC collects when no strong refs; use for caches, metadata" },
          { id: "d13_t1_s7", label: "EnumMap — array-backed by ordinal, O(1) no hashing needed; always use for enum keys" },
          { id: "d13_t1_s8", label: "TreeMap — Red-Black Tree, O(log n), keys must be Comparable; floorKey, ceilingKey, headMap, tailMap" }
        ]
      },
      {
        name: "DSA — Linked List: Medium & Stacks Intro",
        category: "DSA",
        subtopics: [
          { id: "d8_t2_s1", label: "Solve: Linked List Cycle Detection (Floyd's Tortoise & Hare)" },
          { id: "d8_t2_s2", label: "Solve: Remove Nth Node From End of List" },
          { id: "d8_t2_s3", label: "Solve: Palindrome Linked List" },
          { id: "d8_t2_s4", label: "Stack basics — LIFO, push, pop, peek; Java Stack class vs ArrayDeque" },
          { id: "d8_t2_s5", label: "Solve: Valid Parentheses (stack)" }
        ]
      }
    ]
  },
  {
    day: 14,
    phase: "Phase 2: Collections",
    phaseRange: "Days 11–18",
    categories: ["Java", "DSA"],
    title: "HashSet, TreeSet & Set Operations",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Collections — Sets",
        category: "Java",
        subtopics: [
          { id: "d14_t1_s1", label: "HashSet internals — backed by HashMap; add(e) calls map.put(e, PRESENT); contains() is O(1)" },
          { id: "d14_t1_s2", label: "HashSet vs LinkedHashSet (insertion order) vs TreeSet (sorted, Red-Black Tree, O(log n))" },
          { id: "d14_t1_s3", label: "Remove duplicates preserving order — new LinkedHashSet<>(list) or stream().distinct()" },
          { id: "d14_t1_s4", label: "Set operations: union (addAll), intersection (retainAll), difference (removeAll) — mutate copies only" },
          { id: "d14_t1_s5", label: "TreeSet comparator caveat — compareTo returns 0 means 'equal' (deduplication trap!)" },
          { id: "d14_t1_s6", label: "NavigableSet — floor, ceiling, lower, higher, pollFirst, pollLast, descendingSet" },
          { id: "d14_t1_s7", label: "CopyOnWriteArraySet — thread-safe, copy on every write; good for read-heavy small sets" }
        ]
      },
      {
        name: "DSA — Stacks & Queues",
        category: "DSA",
        subtopics: [
          { id: "d9_t2_s1", label: "Solve: Min Stack — O(1) getMin() using auxiliary stack" },
          { id: "d9_t2_s2", label: "Solve: Implement Queue using Stacks" },
          { id: "d9_t2_s3", label: "Solve: Evaluate Reverse Polish Notation" },
          { id: "d9_t2_s4", label: "Solve: Daily Temperatures (monotonic stack intro)" },
          { id: "d9_t2_s5", label: "Solve: Next Greater Element I" }
        ]
      }
    ]
  },
  {
    day: 15,
    phase: "Phase 2: Collections",
    phaseRange: "Days 11–18",
    categories: ["Java", "DSA"],
    title: "Queue, Deque, PriorityQueue & BlockingQueue",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Collections — Queue & Deque",
        category: "Java",
        subtopics: [
          { id: "d15_t1_s1", label: "Queue interface — add/offer, remove/poll, element/peek; exception-throwing vs null-returning pairs" },
          { id: "d15_t1_s2", label: "ArrayDeque — implements Deque; use as both stack (push/pop) and queue (offer/poll); faster than Stack class" },
          { id: "d15_t1_s3", label: "PriorityQueue — min-heap by default, O(log n) offer/poll, O(1) peek; Collections.reverseOrder() for max-heap" },
          { id: "d15_t1_s4", label: "PriorityQueue with custom Comparator: new PriorityQueue<>(Comparator.comparing(Task::getPriority))" },
          { id: "d15_t1_s5", label: "BlockingQueue — ArrayBlockingQueue (bounded), LinkedBlockingQueue; put() blocks if full, take() blocks if empty" },
          { id: "d15_t1_s6", label: "Producer-Consumer with BlockingQueue — no manual synchronization needed; standard thread pool pattern" },
          { id: "d15_t1_s7", label: "ConcurrentLinkedQueue — non-blocking CAS-based queue; ConcurrentSkipListMap (concurrent sorted map)" }
        ]
      },
      {
        name: "DSA — Binary Search: Easy",
        category: "DSA",
        subtopics: [
          { id: "d10_t2_s1", label: "Binary search template — iterative: left/right pointers, while(left <= right)" },
          { id: "d10_t2_s2", label: "Solve: Binary Search (basic — find target in sorted array)" },
          { id: "d10_t2_s3", label: "Solve: Search Insert Position" },
          { id: "d10_t2_s4", label: "Solve: First Bad Version" },
          { id: "d10_t2_s5", label: "Solve: Sqrt(x) using binary search" }
        ]
      }
    ]
  },
  {
    day: 16,
    phase: "Phase 2: Collections",
    phaseRange: "Days 11–18",
    categories: ["Java", "DSA"],
    title: "Collections Utilities, Immutability & Advanced Collections",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Collections — Utilities & Advanced",
        category: "Java",
        subtopics: [
          { id: "d16_t1_s1", label: "Collections.sort() uses TimSort — O(n log n), stable; list.sort(null) uses Comparable" },
          { id: "d16_t1_s2", label: "Collections.binarySearch() — list MUST be sorted; returns -(insertionPoint)-1 if not found" },
          { id: "d16_t1_s3", label: "Immutable collections: List.of(), Set.of(), Map.of() (Java 9+) — no nulls, throw on mutation" },
          { id: "d16_t1_s4", label: "Collections.unmodifiableList() vs List.copyOf() — view vs true immutable copy" },
          { id: "d16_t1_s6", label: "Finding duplicates: Set.add() returns false for existing elements — O(n) time pattern" },
          { id: "d16_t1_s7", label: "Sort Map by value: stream → sorted(Map.Entry.comparingByValue()) → collect to LinkedHashMap" },
          { id: "d16_t1_s8", label: "Efficient intersection: convert one list to HashSet → filter with contains() — O(n+m) vs O(n×m)" },
          { id: "d17_t1_s1", label: "BitSet — memory-efficient boolean set; and(), or(), xor(), cardinality(); use for Sieve, bloom filters" },
          { id: "d17_t1_s2", label: "IdentityHashMap — uses == (reference equality) instead of equals(); for object graph traversal" },
          { id: "d17_t1_s5", label: "PriorityBlockingQueue — thread-safe, unbounded, blocking take(); DelayQueue for scheduled tasks" },
          { id: "d17_t1_s6", label: "Collections interview patterns — HashMap for LRU, TreeMap for sorted ranges, PriorityQueue for Top-K" }
        ]
      },
      {
        name: "DSA — Binary Search: Medium",
        category: "DSA",
        subtopics: [
          { id: "d11_t2_s1", label: "Solve: Find First and Last Position of Element in Sorted Array" },
          { id: "d11_t2_s2", label: "Solve: Search in Rotated Sorted Array" },
          { id: "d11_t2_s3", label: "Solve: Find Minimum in Rotated Sorted Array" },
          { id: "d11_t2_s4", label: "Solve: Koko Eating Bananas (binary search on answer)" },
          { id: "d11_t2_s5", label: "Solve: Find Peak Element" }
        ]
      }
    ]
  },
  {
    day: 17,
    phase: "Phase 2: Collections",
    phaseRange: "Days 11–18",
    categories: ["Java", "DSA"],
    title: "JVM Internals — Class Loading, Memory, GC & Profiling",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Java — JVM Internals, GC & Performance",
        category: "Java",
        subtopics: [
          { id: "d7_t1_s8", label: "JVM Architecture — Stack (per thread) vs Heap (shared), Method Area, GC Roots, String Pool location" },
          { id: "d17_t4_s1", label: "Class loading — Bootstrap, Platform & Application class loaders; parent-delegation model; loading → linking → initialization" },
          { id: "d17_t4_s2", label: "Execution engine — bytecode, interpreter vs JIT (C1/C2, tiered compilation); why Java code gets faster after warm-up" },
          { id: "d17_t4_s3", label: "Heap generations — Eden, Survivor, Old; minor vs major/full GC; promotion, GC roots and reachability" },
          { id: "d10_t1_s6", label: "GC algorithms: G1 (default Java 9+), ZGC (low-latency); tuning: -Xms, -Xmx, -XX:+UseG1GC" },
          { id: "d10_t1_s7", label: "Memory leaks — static collections, unclosed resources, inner classes holding outer reference" },
          { id: "d17_t4_s4", label: "OutOfMemoryError types — Java heap space, Metaspace, GC overhead limit exceeded, unable to create native thread; StackOverflowError" },
          { id: "d17_t4_s5", label: "Diagnosing production issues — jstack thread dumps, jmap/jcmd heap dumps, JFR + Mission Control, VisualVM" }
        ]
      },
      {
        name: "DSA — Bit Manipulation & Math",
        category: "DSA",
        subtopics: [
          { id: "d28_t2_s1", label: "Bitwise ops: AND, OR, XOR, NOT, left/right shifts — XOR tricks for problems" },
          { id: "d28_t2_s2", label: "Solve: Single Number (XOR all elements)" },
          { id: "d28_t2_s3", label: "Solve: Number of 1 Bits / Counting Bits" },
          { id: "d28_t2_s4", label: "Solve: Missing Number (XOR or sum approach)" },
          { id: "d28_t2_s5", label: "Solve: Pow(x, n) — fast exponentiation O(log n)" }
        ]
      }
    ]
  },
  {
    day: 18,
    phase: "Phase 2: Collections",
    phaseRange: "Days 11–18",
    categories: ["Java", "DSA"],
    title: "Phase 2 Review — Collections & JVM Rapid-Fire + Trees Intro",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Collections & JVM — Final Review",
        category: "Java",
        subtopics: [
          { id: "d18_t1_s1", label: "Whiteboard: HashMap put/get flow including hash, index, collision, treeification" },
          { id: "d18_t1_s2", label: "Whiteboard: ConcurrentHashMap bucket-level locking vs Collections.synchronizedMap()" },
          { id: "d18_t1_s3", label: "Whiteboard: LinkedHashMap as LRU Cache with removeEldestEntry()" },
          { id: "d18_t1_s4", label: "Explain: ArrayList vs LinkedList vs CopyOnWriteArrayList — when to use each" },
          { id: "d18_t1_s5", label: "Explain: PriorityQueue for Top-K, BlockingQueue for producer-consumer" },
          { id: "d18_t4_s1", label: "Explain: JVM memory areas, class loading and how GC decides what to collect" },
          { id: "d18_t1_s6", label: "Rapid-fire: answer 15 random Q&A from all collection topics without notes" }
        ]
      },
      {
        name: "DSA — Trees: Easy (Introduction)",
        category: "DSA",
        subtopics: [
          { id: "d12_t2_s1", label: "Binary tree fundamentals — nodes, root, leaf, height, depth; how tree differs from linked list" },
          { id: "d12_t2_s2", label: "Tree traversals — Inorder, Preorder, Postorder (recursive first, then iterative)" },
          { id: "d12_t2_s3", label: "Solve: Maximum Depth of Binary Tree" },
          { id: "d12_t2_s4", label: "Solve: Invert Binary Tree" },
          { id: "d12_t2_s5", label: "Solve: Same Tree / Symmetric Tree" }
        ]
      }
    ]
  },

  // ===================== PHASE 3: SPRING BOOT ADVANCED (Days 19–26) =====================
  {
    day: 19,
    phase: "Phase 3: Spring Boot",
    phaseRange: "Days 19–26",
    categories: ["Spring Boot", "DSA"],
    title: "Spring Core — IoC, DI & Bean Lifecycle",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Spring — IoC & Dependency Injection",
        category: "Spring Boot",
        subtopics: [
          { id: "d19_t1_s1", label: "IoC Container — Inversion of Control; BeanFactory (lazy) vs ApplicationContext (eager, events, i18n)" },
          { id: "d19_t1_s2", label: "@Component, @Service, @Repository, @Controller — stereotypes; @Repository translates SQL exceptions" },
          { id: "d19_t1_s3", label: "@Autowired: constructor injection (preferred for immutability & testability) vs field vs setter injection" },
          { id: "d19_t1_s4", label: "@Primary and @Qualifier — resolving ambiguous beans; named injection; @Resource" },
          { id: "d19_t1_s5", label: "Bean scopes: singleton (default, one per container), prototype, request, session, application" },
          { id: "d19_t1_s6", label: "Bean lifecycle: @PostConstruct → use → @PreDestroy; InitializingBean & DisposableBean interfaces" },
          { id: "d19_t1_s7", label: "@Conditional, @Profile — conditional bean creation; application-{profile}.yml for environments" },
          { id: "d19_t1_s8", label: "Spring AOP — @Aspect, @Before, @After, @Around; proxy mechanism (JDK dynamic proxy vs CGLIB)" }
        ]
      },
      {
        name: "DSA — Trees: Level Order & BST",
        category: "DSA",
        subtopics: [
          { id: "d13_t2_s1", label: "Solve: Level Order Traversal (BFS with Queue)" },
          { id: "d13_t2_s2", label: "Solve: Validate Binary Search Tree" },
          { id: "d13_t2_s3", label: "Solve: Lowest Common Ancestor of a BST" },
          { id: "d13_t2_s4", label: "Solve: Kth Smallest Element in a BST" },
          { id: "d13_t2_s5", label: "Solve: Binary Tree Right Side View" }
        ]
      }
    ]
  },
  {
    day: 20,
    phase: "Phase 3: Spring Boot",
    phaseRange: "Days 19–26",
    categories: ["Spring Boot", "DSA"],
    title: "Spring Boot Auto-Configuration & REST API Design",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Spring Boot — Auto-Config & REST",
        category: "Spring Boot",
        subtopics: [
          { id: "d20_t1_s1", label: "@SpringBootApplication = @Configuration + @EnableAutoConfiguration + @ComponentScan — what each does" },
          { id: "d20_t1_s2", label: "Auto-configuration: spring.factories (Boot 2) / AutoConfiguration.imports (Boot 3) with @ConditionalOn*" },
          { id: "d20_t1_s3", label: "@RestController = @Controller + @ResponseBody; HTTP: @GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @PatchMapping" },
          { id: "d20_t1_s4", label: "@PathVariable, @RequestParam, @RequestBody, @RequestHeader — request data binding" },
          { id: "d20_t1_s5", label: "ResponseEntity<T> — control HTTP status codes, headers, body; return ResponseEntity.ok() / .created() / .notFound()" },
          { id: "d20_t1_s6", label: "@Valid + Bean Validation: @NotNull, @NotBlank, @Size, @Email, @Pattern, @Min, @Max — request validation" },
          { id: "d20_t1_s7", label: "@ControllerAdvice + @ExceptionHandler — global exception handling with custom error response DTOs" },
          { id: "d20_t1_s8", label: "API versioning (URI path vs header vs content-type); HATEOAS basics; Richardson Maturity Model" }
        ]
      },
      {
        name: "DSA — Trees: Medium Problems",
        category: "DSA",
        subtopics: [
          { id: "d14_t2_s1", label: "Solve: Lowest Common Ancestor of Binary Tree (not BST)" },
          { id: "d14_t2_s2", label: "Solve: Diameter of Binary Tree" },
          { id: "d14_t2_s3", label: "Solve: Path Sum II (root-to-leaf paths summing to target)" },
          { id: "d14_t2_s4", label: "Solve: Convert Sorted Array to Balanced BST" },
          { id: "d14_t2_s5", label: "Solve: Construct Binary Tree from Preorder and Inorder" }
        ]
      }
    ]
  },
  {
    day: 21,
    phase: "Phase 3: Spring Boot",
    phaseRange: "Days 19–26",
    categories: ["Spring Boot", "DSA"],
    title: "Spring Data JPA — Entities, Relationships & N+1 Problem",
    estimatedTime: "4–5 hrs",
    topics: [
      {
        name: "Spring Data JPA — Entities & Queries",
        category: "Spring Boot",
        subtopics: [
          { id: "d21_t1_s1", label: "@Entity, @Table, @Id, @GeneratedValue — entity mapping; ID strategies: IDENTITY, SEQUENCE, AUTO" },
          { id: "d21_t1_s2", label: "Relationships: @OneToOne, @OneToMany, @ManyToOne, @ManyToMany — owning side vs mappedBy" },
          { id: "d21_t1_s3", label: "FetchType.LAZY vs EAGER — N+1 problem: what it is, how to detect via SQL logging (show-sql=true)" },
          { id: "d21_t1_s4", label: "N+1 solutions: JOIN FETCH in @Query, @EntityGraph, @BatchSize, @Fetch(FetchMode.SUBSELECT)" },
          { id: "d21_t1_s5", label: "JPQL vs native SQL — @Query with named params (:param); nativeQuery=true for raw SQL" },
          { id: "d21_t1_s6", label: "Pagination: Pageable, Page<T>, Slice<T>, @PageableDefault — cursor vs offset pagination" },
          { id: "d21_t1_s7", label: "Repository hierarchy: CrudRepository → PagingAndSortingRepository → JpaRepository (flush, batch)" },
          { id: "d21_t1_s8", label: "Spring Data projections — interface-based (getters) and class-based (DTOs) for partial data retrieval" }
        ]
      },
      {
        name: "DSA — Heaps / Priority Queues",
        category: "DSA",
        subtopics: [
          { id: "d17_t2_s1", label: "Heap fundamentals — min-heap property, max-heap, complete binary tree stored in array" },
          { id: "d17_t2_s2", label: "Solve: Kth Largest Element in an Array (min-heap of size K)" },
          { id: "d17_t2_s3", label: "Solve: Top K Frequent Elements" },
          { id: "d17_t2_s4", label: "Solve: Merge K Sorted Lists (min-heap approach)" },
          { id: "d17_t2_s5", label: "Solve: Last Stone Weight" }
        ]
      }
    ]
  },
  {
    day: 22,
    phase: "Phase 3: Spring Boot",
    phaseRange: "Days 19–26",
    categories: ["Spring Boot", "DSA"],
    title: "Transactions, Hibernate Caching & Database Migrations",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Spring — Transactions & Hibernate",
        category: "Spring Boot",
        subtopics: [
          { id: "d22_t1_s1", label: "@Transactional — declarative management; self-invocation proxy pitfall (calling own @Transactional method)" },
          { id: "d22_t1_s2", label: "Propagation: REQUIRED (default), REQUIRES_NEW, NESTED, MANDATORY, NEVER — when to use each" },
          { id: "d22_t1_s3", label: "Isolation levels: READ_COMMITTED (default), REPEATABLE_READ, SERIALIZABLE — dirty/phantom/non-repeatable reads" },
          { id: "d22_t1_s4", label: "Optimistic locking: @Version field for concurrent updates; Pessimistic: LockModeType.PESSIMISTIC_WRITE" },
          { id: "d22_t1_s5", label: "Entity lifecycle: Transient → Persistent (managed) → Detached → Removed; flush vs commit" },
          { id: "d22_t1_s6", label: "First-level cache (session, always on) vs Second-level cache (EhCache/Hazelcast, @Cacheable)" },
          { id: "d22_t1_s7", label: "Database migrations: Flyway (SQL files, V1__name.sql) vs Liquibase (XML/YAML changesets)" }
        ]
      },
      {
        name: "DSA — Graphs Introduction",
        category: "DSA",
        subtopics: [
          { id: "d18_t2_s1", label: "Graph fundamentals — vertices, edges, directed/undirected, weighted/unweighted" },
          { id: "d18_t2_s2", label: "Graph representations — adjacency list vs adjacency matrix; when to use each" },
          { id: "d18_t2_s3", label: "BFS — queue-based level-by-level traversal; shortest path in unweighted graph" },
          { id: "d18_t2_s4", label: "DFS — stack/recursion-based deep traversal; cycle detection" },
          { id: "d18_t2_s5", label: "Solve: Number of Islands (BFS/DFS on grid)" }
        ]
      }
    ]
  },
  {
    day: 23,
    phase: "Phase 3: Spring Boot",
    phaseRange: "Days 19–26",
    categories: ["Spring Boot", "DSA"],
    title: "Spring Security — JWT Authentication & OAuth2",
    estimatedTime: "4–5 hrs",
    topics: [
      {
        name: "Spring Security — Auth & JWT",
        category: "Spring Boot",
        subtopics: [
          { id: "d23_t1_s1", label: "Security filter chain — SecurityFilterChain bean (Boot 3); replaces WebSecurityConfigurerAdapter (Boot 2)" },
          { id: "d23_t1_s2", label: "JWT structure: Header.Payload.Signature (Base64 encoded); token generation, validation, expiration" },
          { id: "d23_t1_s3", label: "JwtAuthenticationFilter (OncePerRequestFilter) — extract token, validate, set SecurityContextHolder" },
          { id: "d23_t1_s4", label: "Refresh token strategy — short-lived access token (15 min) + long-lived refresh token (7 days)" },
          { id: "d23_t1_s5", label: "OAuth2/OpenID Connect — resource server, authorization server, PKCE flow for SPAs" },
          { id: "d23_t1_s6", label: "@PreAuthorize, @PostAuthorize, @Secured — method-level security with SpEL expressions" },
          { id: "d23_t1_s7", label: "CORS configuration — @CrossOrigin on controller, global CorsConfigurationSource bean" },
          { id: "d23_t1_s8", label: "PasswordEncoder: BCryptPasswordEncoder (default), argon2; never store plain text passwords" }
        ]
      },
      {
        name: "DSA — Graphs: Medium",
        category: "DSA",
        subtopics: [
          { id: "d19_t2_s1", label: "Solve: Clone Graph (DFS + HashMap for visited)" },
          { id: "d19_t2_s2", label: "Solve: Rotten Oranges (multi-source BFS)" },
          { id: "d19_t2_s3", label: "Solve: Course Schedule (Topological Sort — Kahn's BFS)" },
          { id: "d19_t2_s4", label: "Solve: Course Schedule II (return ordering)" },
          { id: "d19_t2_s5", label: "Solve: Pacific Atlantic Water Flow" }
        ]
      }
    ]
  },
  {
    day: 24,
    phase: "Phase 3: Spring Boot",
    phaseRange: "Days 19–26",
    categories: ["Spring Boot", "DSA"],
    title: "Testing — JUnit 5, Mockito & Integration Tests",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Testing — JUnit 5 & Mockito",
        category: "Spring Boot",
        subtopics: [
          { id: "d24_t1_s1", label: "Test pyramid — unit tests (fast, many) > integration tests > E2E tests (slow, few)" },
          { id: "d24_t1_s2", label: "@SpringBootTest vs @WebMvcTest vs @DataJpaTest — full context vs slice tests (trade-offs)" },
          { id: "d24_t1_s3", label: "MockMvc — testing REST controllers without starting server; .perform(), .andExpect(), .andReturn()" },
          { id: "d24_t1_s4", label: "@MockBean — replace real beans with mocks in Spring context for isolated testing" },
          { id: "d24_t1_s5", label: "JUnit 5: @Test, @BeforeEach, @AfterEach, @ParameterizedTest with @ValueSource, @CsvSource" },
          { id: "d24_t1_s6", label: "Mockito: when/thenReturn, verify(), ArgumentCaptor, @Spy for partial mocking, doThrow()" },
          { id: "d24_t1_s7", label: "TestContainers — spin up real Postgres/MySQL/Redis in Docker for integration tests" },
          { id: "d24_t1_s8", label: "AAA pattern (Arrange-Act-Assert); given-when-then naming convention for test methods" }
        ]
      },
      {
        name: "DSA — Backtracking: Easy→Medium",
        category: "DSA",
        subtopics: [
          { id: "d20_t2_s1", label: "Backtracking framework — choose → explore → unchoose; decision tree visualization" },
          { id: "d20_t2_s2", label: "Solve: Subsets (power set generation)" },
          { id: "d20_t2_s3", label: "Solve: Permutations" },
          { id: "d20_t2_s4", label: "Solve: Combination Sum" },
          { id: "d20_t2_s5", label: "Solve: Letter Combinations of a Phone Number" }
        ]
      }
    ]
  },
  {
    day: 25,
    phase: "Phase 3: Spring Boot",
    phaseRange: "Days 19–26",
    categories: ["Spring Boot", "DSA"],
    title: "Spring Boot — Actuator, Profiles, Configuration & Logging",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Spring Boot — Production Features",
        category: "Spring Boot",
        subtopics: [
          { id: "d25_t1_s1", label: "Actuator endpoints: /health, /metrics, /info, /beans, /env — monitoring production apps" },
          { id: "d25_t1_s2", label: "Custom HealthIndicator — check downstream deps (DB, Redis, external APIs)" },
          { id: "d25_t1_s3", label: "Micrometer metrics: Counter, Gauge, Timer — Prometheus scraping + Grafana dashboards" },
          { id: "d25_t1_s4", label: "Profile configs: application-{profile}.yml; spring.profiles.active; profile-specific beans" },
          { id: "d25_t1_s5", label: "@ConfigurationProperties — type-safe config binding with @Validated; nested properties" },
          { id: "d25_t1_s6", label: "Config hierarchy — CLI args > env vars > application-{profile}.yml > application.yml > defaults" },
          { id: "d25_t1_s7", label: "Logging — SLF4J + Logback (default); log levels, structured JSON logging, MDC for correlation IDs" },
          { id: "d25_t1_s8", label: "Spring Boot 3 — Jakarta namespace, native compilation (GraalVM), Micrometer Tracing" }
        ]
      },
      {
        name: "DSA — Dynamic Programming: Easy",
        category: "DSA",
        subtopics: [
          { id: "d21_t2_s1", label: "DP fundamentals — overlapping subproblems, optimal substructure; memoization (top-down) vs tabulation (bottom-up)" },
          { id: "d21_t2_s2", label: "Solve: Climbing Stairs (Fibonacci pattern)" },
          { id: "d21_t2_s3", label: "Solve: House Robber" },
          { id: "d21_t2_s4", label: "Solve: Min Cost Climbing Stairs" },
          { id: "d21_t2_s5", label: "Solve: Fibonacci Number (recursive → memo → tabulation → space-optimized)" }
        ]
      }
    ]
  },
  {
    day: 26,
    phase: "Phase 3: Spring Boot",
    phaseRange: "Days 19–26",
    categories: ["Spring Boot", "DSA"],
    title: "Phase 3 Review — Spring Boot Rapid-Fire",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Spring — Comprehensive Review",
        category: "Spring Boot",
        subtopics: [
          { id: "d26_t1_s1", label: "Explain: IoC, DI, Bean lifecycle, @Transactional pitfalls (self-invocation, checked exceptions)" },
          { id: "d26_t1_s2", label: "Explain: N+1 problem and 3 solutions (JOIN FETCH, @EntityGraph, @BatchSize)" },
          { id: "d26_t1_s3", label: "Explain: JWT auth flow end-to-end — login → token → filter → SecurityContext → @PreAuthorize" },
          { id: "d26_t1_s4", label: "Explain: @WebMvcTest vs @SpringBootTest — when to use which; MockMvc vs full server test" },
          { id: "d26_t1_s5", label: "Explain: auto-configuration with @ConditionalOnClass, @ConditionalOnMissingBean" },
          { id: "d26_t1_s6", label: "Draw: Spring request lifecycle — DispatcherServlet → HandlerMapping → Controller → ViewResolver" }
        ]
      },
      {
        name: "DSA — Dynamic Programming: Medium (1D)",
        category: "DSA",
        subtopics: [
          { id: "d22_t2_s1", label: "Solve: Coin Change (minimum coins — unbounded knapsack variant)" },
          { id: "d22_t2_s2", label: "Solve: Longest Increasing Subsequence" },
          { id: "d22_t2_s3", label: "Solve: Word Break" },
          { id: "d22_t2_s4", label: "Solve: Decode Ways" },
          { id: "d22_t2_s5", label: "Solve: Maximum Product Subarray" }
        ]
      }
    ]
  },

  // ===================== PHASE 4: MICROSERVICES (Days 27–34) =====================
  {
    day: 27,
    phase: "Phase 4: Microservices",
    phaseRange: "Days 27–34",
    categories: ["System Design", "DSA"],
    title: "Microservices Patterns — API Gateway & Service Discovery",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Microservices — Core Patterns",
        category: "System Design",
        subtopics: [
          { id: "d27_t1_s1", label: "Monolith vs Microservices — trade-offs: complexity, deployment independence, data ownership, team autonomy" },
          { id: "d27_t1_s2", label: "API Gateway — single entry point, routing, auth, rate limiting, SSL termination (Spring Cloud Gateway / AWS API GW)" },
          { id: "d27_t1_s3", label: "Service Discovery — Eureka (client-side), Consul; services register themselves, callers look up by name" },
          { id: "d27_t1_s4", label: "Circuit Breaker — Resilience4j: CLOSED → OPEN → HALF_OPEN states; prevents cascade failures" },
          { id: "d27_t1_s5", label: "Bulkhead — isolate failures with separate thread pools per downstream service" },
          { id: "d27_t1_s6", label: "Saga Pattern — choreography (events) vs orchestration; compensating transactions on failure" },
          { id: "d27_t1_s7", label: "Outbox Pattern — write to DB outbox table in same transaction, publish to Kafka via CDC; avoids dual-write" }
        ]
      },
      {
        name: "DSA — Dynamic Programming: Medium (2D)",
        category: "DSA",
        subtopics: [
          { id: "d23_t2_s1", label: "Solve: Longest Common Subsequence (2D table)" },
          { id: "d23_t2_s2", label: "Solve: Edit Distance (Levenshtein)" },
          { id: "d23_t2_s3", label: "Solve: Unique Paths (grid DP)" },
          { id: "d23_t2_s4", label: "Solve: 0/1 Knapsack & Partition Equal Subset Sum" },
          { id: "d23_t2_s5", label: "Solve: Target Sum" }
        ]
      }
    ]
  },
  {
    day: 28,
    phase: "Phase 4: Microservices",
    phaseRange: "Days 27–34",
    categories: ["System Design", "DSA"],
    title: "Microservices — CQRS, Event Sourcing & Communication",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Microservices — Advanced Patterns",
        category: "System Design",
        subtopics: [
          { id: "d28_t1_s1", label: "CQRS — separate read/write models; denormalized read side optimized for queries" },
          { id: "d28_t1_s2", label: "Event Sourcing — store state as sequence of events, replay to rebuild; pairs well with CQRS" },
          { id: "d28_t1_s3", label: "Strangler Fig — gradually migrate monolith by intercepting calls and routing to new services" },
          { id: "d28_t1_s4", label: "Sidecar pattern — helper process alongside main container (Envoy proxy for service mesh)" },
          { id: "d28_t1_s5", label: "Sync: REST (WebClient) vs Async: Kafka, RabbitMQ, SQS — when to use each" },
          { id: "d28_t1_s6", label: "gRPC — binary Protocol Buffers, faster than REST for internal service-to-service calls" },
          { id: "d28_t1_s7", label: "Distributed transactions — avoid 2PC; use Saga + idempotency keys + eventual consistency" }
        ]
      },
      {
        name: "DSA — Greedy Algorithms",
        category: "DSA",
        subtopics: [
          { id: "d24_t2_s1", label: "Greedy choice property — locally optimal → globally optimal; when greedy works vs DP needed" },
          { id: "d24_t2_s2", label: "Solve: Jump Game" },
          { id: "d24_t2_s3", label: "Solve: Gas Station" },
          { id: "d24_t2_s4", label: "Solve: Merge Intervals" },
          { id: "d24_t2_s5", label: "Solve: Non-overlapping Intervals" }
        ]
      }
    ]
  },
  {
    day: 29,
    phase: "Phase 4: Microservices",
    phaseRange: "Days 27–34",
    categories: ["System Design", "DSA"],
    title: "Resilience & Observability — Resilience4j, Tracing, Logging",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Microservices — Resilience & Observability",
        category: "System Design",
        subtopics: [
          { id: "d29_t1_s1", label: "Resilience4j: @CircuitBreaker, @Retry, @RateLimiter, @TimeLimiter, @Bulkhead — configure each" },
          { id: "d29_t1_s2", label: "Retry pattern — max attempts, exponential backoff with jitter to avoid thundering herd" },
          { id: "d29_t1_s3", label: "Fallback strategies — default values, cached responses, degraded service mode" },
          { id: "d29_t1_s4", label: "Correlation IDs — propagate across services via MDC for debugging distributed requests" },
          { id: "d29_t1_s5", label: "Distributed tracing: Micrometer Tracing (Boot 3), trace/span IDs, Zipkin/Jaeger visualization" },
          { id: "d29_t1_s6", label: "Centralized logging: ELK Stack (Elasticsearch, Logstash, Kibana) or CloudWatch Logs; structured JSON" },
          { id: "d29_t1_s7", label: "Rate limiting — token bucket, leaky bucket, Redis-based distributed rate limiting" }
        ]
      },
      {
        name: "DSA — Intervals & Matrix",
        category: "DSA",
        subtopics: [
          { id: "d25_t2_s1", label: "Solve: Insert Interval" },
          { id: "d25_t2_s2", label: "Solve: Meeting Rooms II (min heaps for overlapping)" },
          { id: "d25_t2_s3", label: "Solve: Spiral Matrix" },
          { id: "d25_t2_s4", label: "Solve: Rotate Image (90° rotation in-place)" },
          { id: "d25_t2_s5", label: "Solve: Set Matrix Zeroes" }
        ]
      }
    ]
  },
  {
    day: 30,
    phase: "Phase 4: Microservices",
    phaseRange: "Days 27–34",
    categories: ["DB/DevOps", "DSA"],
    title: "Docker — Containers, Images & Dockerizing Spring Boot",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "DevOps — Docker",
        category: "DB/DevOps",
        subtopics: [
          { id: "d30_t1_s1", label: "Dockerfile: FROM, COPY, RUN, CMD vs ENTRYPOINT, EXPOSE, WORKDIR, ARG vs ENV — know each" },
          { id: "d30_t1_s2", label: "Multi-stage builds — separate build and runtime stages; reduce image from 800MB to 80MB" },
          { id: "d30_t1_s3", label: "docker-compose — multi-container local dev (app + Postgres + Redis + Kafka); volumes, networks" },
          { id: "d30_t1_s4", label: ".dockerignore, non-root user, minimal base images (alpine/distroless) — security best practices" },
          { id: "d30_t1_s5", label: "Dockerizing Spring Boot — jar packaging, JVM options (-Xms, -Xmx), health check in Dockerfile" },
          { id: "d30_t1_s6", label: "Docker networking: bridge, host, overlay — container-to-container communication" }
        ]
      },
      {
        name: "DSA — Trie & Advanced Trees",
        category: "DSA",
        subtopics: [
          { id: "d26_t2_s1", label: "Trie data structure — insert, search, startsWith; TrieNode with children HashMap" },
          { id: "d26_t2_s2", label: "Solve: Implement Trie (Prefix Tree)" },
          { id: "d26_t2_s3", label: "Solve: Design Add and Search Words (Trie + DFS for wildcard '.')" },
          { id: "d26_t2_s4", label: "Solve: Find Median from Data Stream (two heaps)" },
          { id: "d26_t2_s5", label: "Solve: Serialize and Deserialize Binary Tree" }
        ]
      }
    ]
  },
  {
    day: 31,
    phase: "Phase 4: Microservices",
    phaseRange: "Days 27–34",
    categories: ["DB/DevOps", "DSA"],
    title: "Kubernetes Basics & CI/CD Pipelines",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "DevOps — K8s & CI/CD",
        category: "DB/DevOps",
        subtopics: [
          { id: "d31_t1_s1", label: "K8s core objects: Pod, Deployment, Service, ConfigMap, Secret, Ingress — what each does" },
          { id: "d31_t1_s2", label: "K8s patterns: sidecar, init containers; liveness/readiness probes; resource requests/limits" },
          { id: "d31_t1_s3", label: "Helm charts — templating K8s manifests, chart structure, values.yaml overrides" },
          { id: "d31_t1_s4", label: "CI/CD: Jenkins pipelines, GitHub Actions — build → test → scan → deploy stages" },
          { id: "d31_t1_s5", label: "Deployment strategies: Blue-Green vs Canary vs Rolling update — trade-offs" },
          { id: "d31_t1_s6", label: "Container security: non-root, read-only filesystem, image scanning (Trivy), minimal base images" }
        ]
      },
      {
        name: "DSA — Graphs: Advanced",
        category: "DSA",
        subtopics: [
          { id: "d27_t2_s1", label: "Union-Find (Disjoint Set) — path compression, union by rank; template implementation" },
          { id: "d27_t2_s2", label: "Solve: Redundant Connection (Union-Find)" },
          { id: "d27_t2_s3", label: "Solve: Graph Valid Tree (Union-Find)" },
          { id: "d27_t2_s4", label: "Solve: Word Ladder (BFS shortest transformation)" },
          { id: "d27_t2_s5", label: "Solve: Network Delay Time (Dijkstra's)" }
        ]
      }
    ]
  },
  {
    day: 32,
    phase: "Phase 4: Microservices",
    phaseRange: "Days 27–34",
    categories: ["System Design", "DSA"],
    title: "LLD — Creational Design Patterns",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "LLD — Creational Patterns",
        category: "System Design",
        subtopics: [
          { id: "d32_t1_s1", label: "Singleton — thread-safe: enum (best), double-checked locking with volatile, Bill Pugh holder" },
          { id: "d32_t1_s2", label: "Factory Method — subclasses decide which class to instantiate; Spring bean creation uses this" },
          { id: "d32_t1_s3", label: "Abstract Factory — families of related objects (DB drivers, UI toolkit)" },
          { id: "d32_t1_s4", label: "Builder — step-by-step complex construction; Lombok @Builder; avoid telescoping constructors" },
          { id: "d32_t1_s5", label: "Prototype — clone objects; prefer copy constructor over Cloneable; Spring prototype scope" },
          { id: "d32_t1_s6", label: "When to use each creational pattern — interview decision matrix" }
        ]
      },
      {
        name: "DSA — Design-based Problems",
        category: "DSA",
        subtopics: [
          { id: "d30_t2_s1", label: "Solve: LRU Cache (HashMap + Doubly Linked List)" },
          { id: "d30_t2_s2", label: "Solve: Design HashMap from scratch (array of linked lists)" },
          { id: "d30_t2_s3", label: "Solve: Insert Delete GetRandom O(1)" },
          { id: "d30_t2_s4", label: "Solve: Time Based Key-Value Store" }
        ]
      }
    ]
  },
  {
    day: 33,
    phase: "Phase 4: Microservices",
    phaseRange: "Days 27–34",
    categories: ["System Design", "DSA"],
    title: "LLD — Structural & Behavioral Patterns",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "LLD — Structural & Behavioral Patterns",
        category: "System Design",
        subtopics: [
          { id: "d33_t1_s1", label: "Adapter — convert incompatible interfaces; wrapping legacy code for new systems" },
          { id: "d33_t1_s2", label: "Decorator — add behavior dynamically; Java I/O streams (BufferedReader wrapping FileReader)" },
          { id: "d33_t1_s3", label: "Proxy — control access; Spring AOP uses JDK/CGLIB proxies for @Transactional, @Cacheable" },
          { id: "d33_t1_s4", label: "Observer — event-driven; Spring ApplicationEventPublisher, Kafka event notification" },
          { id: "d33_t1_s5", label: "Strategy — interchangeable algorithms; sort Comparators, payment processing, auth strategies" },
          { id: "d33_t1_s6", label: "Template Method — algorithm skeleton with customizable steps; JdbcTemplate, RestTemplate" },
          { id: "d33_t1_s7", label: "Command — encapsulate request as object; undo/redo, job queues, @Scheduled tasks" }
        ]
      },
      {
        name: "DSA — Hard Problem Intro",
        category: "DSA",
        subtopics: [
          { id: "d31_t2_s1", label: "Solve: Largest Rectangle in Histogram (monotonic stack)" },
          { id: "d31_t2_s2", label: "Solve: Trapping Rain Water (revision — stack approach)" },
          { id: "d31_t2_s3", label: "Solve: Sliding Window Maximum (monotonic deque)" },
          { id: "d31_t2_s4", label: "Solve: Longest Palindromic Substring (expand from center)" }
        ]
      }
    ]
  },
  {
    day: 34,
    phase: "Phase 4: Microservices",
    phaseRange: "Days 27–34",
    categories: ["System Design", "DSA"],
    title: "Phase 4 Review — Machine Coding Practice",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "LLD — Machine Coding",
        category: "System Design",
        subtopics: [
          { id: "d34_t1_s1", label: "Machine coding approach — requirement gathering, class identification, SOLID principles, interfaces" },
          { id: "d34_t1_s2", label: "Design a Parking Lot — vehicle types, floors, spots, allocation strategy, payment" },
          { id: "d34_t1_s3", label: "Design Tic-Tac-Toe — board, players, extensible winning condition checker, OOP" },
          { id: "d34_t1_s4", label: "Design an Elevator System — multiple elevators, scheduling algorithm, direction optimization" },
          { id: "d34_t1_s5", label: "Code review your designs — validate SOLID, check for God classes, identify patterns used" },
          { id: "d34_t1_s6", label: "Review: all microservices patterns — draw architecture with API Gateway, Service Discovery, Circuit Breaker" }
        ]
      },
      {
        name: "DSA — N-Queens & Hard Backtracking",
        category: "DSA",
        subtopics: [
          { id: "d33_t2_s1", label: "Solve: N-Queens (constraint-based backtracking)" },
          { id: "d33_t2_s2", label: "Solve: Word Search in Grid" },
          { id: "d33_t2_s3", label: "Solve: Generate Parentheses" },
          { id: "d33_t2_s4", label: "Solve: Palindrome Partitioning" }
        ]
      }
    ]
  },

  // ===================== PHASE 5: KAFKA DEEP DIVE (Days 35–42) =====================
  {
    day: 35,
    phase: "Phase 5: Apache Kafka",
    phaseRange: "Days 35–42",
    categories: ["System Design", "Spring Boot"],
    title: "Kafka Core — Topics, Partitions, Producers & Consumers",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Kafka — Fundamentals",
        category: "System Design",
        subtopics: [
          { id: "d35_t1_s1", label: "Topics, Partitions, Offsets — the fundamental unit of storage; append-only log" },
          { id: "d35_t1_s2", label: "Producer — key-based partitioning, round-robin, sticky partition strategy; acks=0/1/all" },
          { id: "d35_t1_s3", label: "Consumer Groups — each partition consumed by exactly one consumer per group; max consumers = partitions" },
          { id: "d35_t1_s4", label: "Broker, Leader/Follower replicas, ISR (In-Sync Replicas); min.insync.replicas" },
          { id: "d35_t1_s5", label: "ZooKeeper (legacy) vs KRaft (Kafka 3.x) — no ZooKeeper dependency in modern Kafka" },
          { id: "d35_t1_s6", label: "Log compaction — retain only latest value per key; tombstone (null value) for deletion" },
          { id: "d35_t1_s7", label: "Kafka Connect — source/sink connectors for CDC, database integration without code" }
        ]
      },
      {
        name: "Kafka — Spring Boot Integration",
        category: "Spring Boot",
        subtopics: [
          { id: "d35_t2_s1", label: "@KafkaListener — topics, groupId, containerFactory, concurrency, batch mode" },
          { id: "d35_t2_s2", label: "KafkaTemplate.send() — synchronous (get()) and asynchronous (CompletableFuture)" },
          { id: "d35_t2_s3", label: "@KafkaHandler for polymorphic message handling in a single listener" }
        ]
      }
    ]
  },
  {
    day: 36,
    phase: "Phase 5: Apache Kafka",
    phaseRange: "Days 35–42",
    categories: ["System Design", "Spring Boot"],
    title: "Kafka — Error Handling, DLT & Exactly-Once Semantics",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Kafka — Delivery Guarantees & Error Handling",
        category: "System Design",
        subtopics: [
          { id: "d36_t1_s1", label: "Delivery guarantees: at-most-once, at-least-once (acks=all + manual commit), exactly-once (EOS)" },
          { id: "d36_t1_s2", label: "Exactly-once — idempotent producer (enable.idempotence=true) + transactional API + read_committed" },
          { id: "d36_t1_s3", label: "Error handling: SeekToCurrentErrorHandler, DeadLetterPublishingRecoverer, @RetryableTopic" },
          { id: "d36_t1_s4", label: "Dead Letter Topic (DLT) — failed messages routed to <topic>.DLT after retry exhaustion" },
          { id: "d36_t1_s5", label: "Offset management — auto-commit (easy, risk of data loss) vs manual commit (safe, more code)" },
          { id: "d36_t1_s6", label: "Schema Registry — Apache Avro + Confluent Schema Registry for schema evolution" },
          { id: "d36_t1_s7", label: "Embedded Kafka for testing — @EmbeddedKafka annotation in Spring Boot tests" }
        ]
      },
      {
        name: "Kafka — Interview Q&A",
        category: "Spring Boot",
        subtopics: [
          { id: "d36_t2_s1", label: "Q: Explain at-most-once vs at-least-once vs exactly-once with real trade-offs and when to use each" },
          { id: "d36_t2_s2", label: "Q: What is consumer lag? Monitor with kafka-consumer-groups.sh, Burrow, Prometheus JMX exporter" },
          { id: "d36_t2_s3", label: "Q: How to ensure message ordering? Partition key + max.in.flight=1 or idempotent producer" }
        ]
      }
    ]
  },
  {
    day: 37,
    phase: "Phase 5: Apache Kafka",
    phaseRange: "Days 35–42",
    categories: ["System Design", "DSA"],
    title: "Kafka Advanced — Streams, Transactions & Rebalancing",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Kafka — Advanced Topics",
        category: "System Design",
        subtopics: [
          { id: "d37_t1_s1", label: "Partition rebalancing — triggered on consumer join/leave; static membership reduces rebalancing in K8s" },
          { id: "d37_t1_s2", label: "Message ordering — guaranteed within a partition, NOT across; use same key for ordered messages" },
          { id: "d37_t1_s3", label: "Kafka Transactions — atomic produce to multiple topics; transactional.id, begin/commit/abort" },
          { id: "d37_t1_s4", label: "Kafka Streams — stateless (map, filter) & stateful (aggregate, join, windowing)" },
          { id: "d37_t1_s5", label: "Windowing: tumbling (fixed, non-overlapping), hopping (fixed, overlapping), session (gap-based)" },
          { id: "d37_t1_s6", label: "State stores backed by RocksDB + changelog topic for fault tolerance and recovery" },
          { id: "d37_t1_s7", label: "MSK (AWS Managed Kafka) — auto-scaling storage, MSK Connect, MSK Serverless" }
        ]
      },
      {
        name: "DSA — Hard DP Practice",
        category: "DSA",
        subtopics: [
          { id: "d34_t2_s1", label: "Solve: Regular Expression Matching (DP)" },
          { id: "d34_t2_s2", label: "Solve: Longest Valid Parentheses" },
          { id: "d34_t2_s3", label: "Solve: Burst Balloons (interval DP)" },
          { id: "d34_t2_s4", label: "Timed: 1 hard problem in 40 minutes" }
        ]
      }
    ]
  },
  {
    day: 38,
    phase: "Phase 5: Apache Kafka",
    phaseRange: "Days 35–42",
    categories: ["System Design", "DSA"],
    title: "Kafka Interview Prep & Consumer Deep Dive",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Kafka — Interview Q&A",
        category: "System Design",
        subtopics: [
          { id: "d38_t1_s1", label: "Q: What happens when a consumer crashes? Heartbeat timeout → rebalance → partitions redistributed" },
          { id: "d38_t1_s2", label: "Q: How to handle poison pill messages? DLT + manual review + @RetryableTopic with max retries" },
          { id: "d38_t1_s3", label: "Q: How to scale consumers? Add to group (max = partition count); increase partitions for more parallelism" },
          { id: "d38_t1_s4", label: "Q: Kafka vs RabbitMQ vs SQS — throughput, ordering, replay, use cases for each" },
          { id: "d38_t1_s5", label: "Q: How to implement idempotent consumers? Deduplication key in DB; check before processing" },
          { id: "d38_t1_s6", label: "Q: Explain Outbox Pattern — write event to outbox table in same TX, CDC/polling to publish" },
          { id: "d38_t1_s7", label: "Practice: draw Kafka architecture — producers, brokers, partitions, consumer groups, DLT" }
        ]
      },
      {
        name: "DSA — Mixed Practice",
        category: "DSA",
        subtopics: [
          { id: "d37_t2_s1", label: "Solve: Alien Dictionary (topological sort)" },
          { id: "d37_t2_s2", label: "Solve: Accounts Merge (Union-Find)" },
          { id: "d37_t2_s3", label: "Solve: Surrounded Regions (BFS/DFS from border)" },
          { id: "d37_t2_s4", label: "Timed: solve 2 medium in 30 min" }
        ]
      }
    ]
  },
  {
    day: 39,
    phase: "Phase 5: Apache Kafka",
    phaseRange: "Days 35–42",
    categories: ["System Design"],
    title: "Machine Coding Practice & Schema Design",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "LLD — Machine Coding & Schema",
        category: "System Design",
        subtopics: [
          { id: "d39_t1_s1", label: "Design BookMyShow — movie, theatre, screen, seat selection, concurrent booking with locking" },
          { id: "d39_t1_s2", label: "Design Snake and Ladder — board, dice, players, game loop with proper OOP" },
          { id: "d39_t1_s3", label: "Design a Key-Value Store with TTL — put, get, delete with expiration" },
          { id: "d39_t1_s4", label: "DRY, KISS, YAGNI principles — identify and apply in your designs" },
          { id: "d39_t1_s5", label: "Database normalization: 1NF, 2NF, 3NF, BCNF — when to denormalize for performance" },
          { id: "d39_t1_s6", label: "ER diagram exercise: e-commerce system (users, orders, products, payments, inventory)" }
        ]
      }
    ]
  },
  {
    day: 40,
    phase: "Phase 5: Apache Kafka",
    phaseRange: "Days 35–42",
    categories: ["System Design", "DSA"],
    title: "Phase 5 Review — Kafka + Patterns Consolidation",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Phase 5 — Comprehensive Review",
        category: "System Design",
        subtopics: [
          { id: "d40_t1_s1", label: "Whiteboard: Kafka architecture — topics, partitions, consumer groups, rebalancing, DLT" },
          { id: "d40_t1_s2", label: "Explain: delivery guarantees, exactly-once semantics, idempotent producer/consumer" },
          { id: "d40_t1_s3", label: "Explain: Saga pattern (choreography vs orchestration) with compensating transactions" },
          { id: "d40_t1_s4", label: "Explain: Circuit breaker states and when each transition occurs" },
          { id: "d40_t1_s5", label: "Rapid-fire: Design Patterns — name the pattern from a description (10 scenarios)" },
          { id: "d40_t1_s6", label: "Rapid-fire: Microservices patterns — API Gateway, Service Discovery, Outbox, CQRS, Event Sourcing" }
        ]
      },
      {
        name: "DSA — Full Mock Coding Round",
        category: "DSA",
        subtopics: [
          { id: "d40_t2_s1", label: "Mock: solve 2 medium + 1 hard in 90 minutes (simulate real interview)" },
          { id: "d40_t2_s2", label: "Practice: think aloud, ask clarifying questions, discuss trade-offs" },
          { id: "d40_t2_s3", label: "Post-mock: identify weak patterns and plan revision" }
        ]
      }
    ]
  },
  {
    day: 41,
    phase: "Phase 5: Apache Kafka",
    phaseRange: "Days 35–42",
    categories: ["System Design", "DSA"],
    title: "Mixed Revision — Java + Spring + DSA Weak Areas",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Comprehensive — Weak Area Focus",
        category: "System Design",
        subtopics: [
          { id: "d41_t1_s1", label: "Review all 'What I Missed' notes from Days 1–40 — address every unresolved item" },
          { id: "d41_t1_s2", label: "Rapid-fire Java: OOP, Java 8 streams, concurrency — 20 questions without notes" },
          { id: "d41_t1_s3", label: "Rapid-fire Collections: HashMap internals, ConcurrentHashMap, LRU Cache, TreeMap" },
          { id: "d41_t1_s4", label: "Rapid-fire Spring: @Transactional pitfalls, N+1, JWT flow, bean lifecycle, auto-config" },
          { id: "d41_t1_s5", label: "Rapid-fire Kafka: delivery guarantees, consumer lag, partition rebalancing" }
        ]
      },
      {
        name: "DSA — Mixed Hard Practice",
        category: "DSA",
        subtopics: [
          { id: "d41_t2_s1", label: "Solve: Word Search II (Trie + Backtracking)" },
          { id: "d41_t2_s2", label: "Solve: Binary Tree Maximum Path Sum" },
          { id: "d41_t2_s3", label: "Solve: Wildcard Matching (DP)" },
          { id: "d41_t2_s4", label: "Timed: 1 hard problem in 40 minutes" }
        ]
      }
    ]
  },
  {
    day: 42,
    phase: "Phase 5: Apache Kafka",
    phaseRange: "Days 35–42",
    categories: ["System Design", "DSA"],
    title: "DSA Revision Sprint — All Patterns Review",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "DSA — Pattern Cheat Sheet Creation",
        category: "System Design",
        subtopics: [
          { id: "d42_t1_s1", label: "Write cheat sheet: Two Pointers, Sliding Window, Binary Search templates" },
          { id: "d42_t1_s2", label: "Write cheat sheet: BFS, DFS, Topological Sort, Union-Find templates" },
          { id: "d42_t1_s3", label: "Write cheat sheet: DP patterns (1D, 2D, knapsack, LIS, LCS)" },
          { id: "d42_t1_s4", label: "Write cheat sheet: Backtracking, Greedy, Heap (Top-K, Merge-K) templates" }
        ]
      },
      {
        name: "DSA — Revision Problems",
        category: "DSA",
        subtopics: [
          { id: "d42_t2_s1", label: "Revise: LRU Cache, Trie, Union-Find — code from memory" },
          { id: "d42_t2_s2", label: "Revise: Coin Change, House Robber, LIS, LCS patterns" },
          { id: "d42_t2_s3", label: "Revise: Number of Islands, Course Schedule, Merge Intervals" },
          { id: "d42_t2_s4", label: "Solve 2 random problems from your weak categories" }
        ]
      }
    ]
  },

  // ===================== PHASE 6: AWS DEEP DIVE (Days 43–50) =====================
  {
    day: 43,
    phase: "Phase 6: AWS Deep Dive",
    phaseRange: "Days 43–50",
    categories: ["DB/DevOps"],
    title: "Amazon S3 — Storage Classes, Security & Access",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "AWS — S3 Deep Dive",
        category: "DB/DevOps",
        subtopics: [
          { id: "d43_t1_s1", label: "Bucket policies vs IAM policies vs ACLs — when each applies; resource-based vs identity-based" },
          { id: "d43_t1_s2", label: "Storage classes: Standard, Intelligent-Tiering, Standard-IA, Glacier Instant/Flexible/Deep Archive" },
          { id: "d43_t1_s3", label: "S3 lifecycle policies — transition rules (Standard → IA → Glacier), expiration rules" },
          { id: "d43_t1_s4", label: "Versioning, MFA Delete, Object Lock (WORM compliance for regulations)" },
          { id: "d43_t1_s5", label: "Encryption: SSE-S3 (AES-256), SSE-KMS (audit trail), SSE-C (customer key)" },
          { id: "d43_t1_s6", label: "Multipart upload for files > 100MB; S3 Transfer Acceleration via CloudFront edge" },
          { id: "d43_t1_s7", label: "S3 Event Notifications → Lambda/SQS/SNS triggers on object creation/deletion" },
          { id: "d43_t1_s8", label: "Presigned URLs — temporary access without AWS credentials, time-limited (max 7 days)" },
          { id: "d43_t1_s9", label: "S3 Access Points, S3 Select (SQL on objects), cross-region replication for DR" }
        ]
      }
    ]
  },
  {
    day: 44,
    phase: "Phase 6: AWS Deep Dive",
    phaseRange: "Days 43–50",
    categories: ["DB/DevOps"],
    title: "EC2, ECS & Compute Services",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "AWS — Compute Services",
        category: "DB/DevOps",
        subtopics: [
          { id: "d44_t1_s1", label: "EC2 instance types: General Purpose (t3/m6), Compute (c6), Memory (r6), Storage (i3)" },
          { id: "d44_t1_s2", label: "EC2 pricing: On-Demand, Reserved (1yr/3yr), Spot (up to 90% cheaper, interruptible), Savings Plans" },
          { id: "d44_t1_s3", label: "Auto Scaling Groups — Target Tracking, Step, Scheduled scaling; health checks, warm pools" },
          { id: "d44_t1_s4", label: "Launch Templates (always use) vs Launch Configurations (legacy); user data scripts" },
          { id: "d44_t1_s5", label: "ECS: Task Definitions, Services, Clusters — Fargate (serverless) vs EC2 launch type" },
          { id: "d44_t1_s6", label: "ECS Task Role (app permissions) vs Execution Role (pull image, push logs) — critical distinction" },
          { id: "d44_t1_s7", label: "AWS Lambda — cold start, warm start, concurrency limits, reserved/provisioned concurrency" },
          { id: "d44_t1_s8", label: "ALB (L7 content-based routing) vs NLB (L4 ultra-low latency); target groups, health checks" }
        ]
      }
    ]
  },
  {
    day: 45,
    phase: "Phase 6: AWS Deep Dive",
    phaseRange: "Days 43–50",
    categories: ["DB/DevOps"],
    title: "CloudWatch, Monitoring & AWS Security",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "AWS — Monitoring & Security",
        category: "DB/DevOps",
        subtopics: [
          { id: "d45_t1_s1", label: "CloudWatch Metrics — namespaces, dimensions, resolution (1s vs 60s), custom metrics via SDK" },
          { id: "d45_t1_s2", label: "CloudWatch Logs — log groups, log streams, Insights queries (SQL-like), metric filters" },
          { id: "d45_t1_s3", label: "CloudWatch Alarms — thresholds, anomaly detection, composite alarms for complex conditions" },
          { id: "d45_t1_s4", label: "AWS X-Ray — distributed tracing, trace map, segments/subsegments, sampling rules" },
          { id: "d45_t1_s5", label: "IAM — users, groups, roles, policies (identity-based vs resource-based); least privilege principle" },
          { id: "d45_t1_s6", label: "IAM best practices — no root user, MFA, credential rotation, cross-account roles with STS" },
          { id: "d45_t1_s7", label: "KMS — CMKs, key policies, envelope encryption; Secrets Manager vs Parameter Store trade-offs" },
          { id: "d45_t1_s8", label: "VPC — subnets (public/private), route tables, NAT Gateway, Security Groups vs NACLs" }
        ]
      }
    ]
  },
  {
    day: 46,
    phase: "Phase 6: AWS Deep Dive",
    phaseRange: "Days 43–50",
    categories: ["DB/DevOps", "DSA"],
    title: "Terraform — Infrastructure as Code",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "DevOps — Terraform IaC",
        category: "DB/DevOps",
        subtopics: [
          { id: "d46_t1_s1", label: "HCL syntax: resource, data source, variable, output, local, module" },
          { id: "d46_t1_s2", label: "Terraform workflow: init → validate → plan → apply → destroy" },
          { id: "d46_t1_s3", label: "State management — local vs remote (S3 + DynamoDB lock), workspaces for environments" },
          { id: "d46_t1_s4", label: "Modules — reusable configurations; module sources (registry, git, local path)" },
          { id: "d46_t1_s5", label: "count vs for_each — prefer for_each for stable addressing; dynamic blocks" },
          { id: "d46_t1_s6", label: "Lifecycle rules: create_before_destroy, prevent_destroy, ignore_changes" },
          { id: "d46_t1_s7", label: "terraform import — bring existing resources under management; Terragrunt for DRY multi-env" }
        ]
      },
      {
        name: "DSA — Timed Practice",
        category: "DSA",
        subtopics: [
          { id: "d38_t2_s1", label: "Timed: solve 1 easy + 2 medium in 60 minutes" },
          { id: "d38_t2_s2", label: "Solve: Design Twitter (OOP + data structures)" },
          { id: "d38_t2_s3", label: "Solve: Flatten Nested List Iterator" },
          { id: "d38_t2_s4", label: "Solve: Task Scheduler (heap + greedy)" }
        ]
      }
    ]
  },
  {
    day: 47,
    phase: "Phase 6: AWS Deep Dive",
    phaseRange: "Days 43–50",
    categories: ["DB/DevOps", "DSA"],
    title: "Terraform Practice + AWS Review",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "DevOps — Terraform Practice & AWS Review",
        category: "DB/DevOps",
        subtopics: [
          { id: "d47_t1_s1", label: "Write Terraform: EC2 instance + Security Group + IAM role" },
          { id: "d47_t1_s2", label: "Write Terraform: S3 bucket with versioning, encryption, lifecycle policy" },
          { id: "d47_t1_s3", label: "AWS review: S3 storage classes, EC2 pricing, ECS vs Lambda decision tree" },
          { id: "d47_t1_s4", label: "AWS review: VPC, Security Groups vs NACLs, IAM best practices" },
          { id: "d47_t1_s5", label: "AWS review: CloudWatch monitoring for production Spring Boot microservice" }
        ]
      },
      {
        name: "DSA — Mixed Revision",
        category: "DSA",
        subtopics: [
          { id: "d47_t2_s1", label: "Solve: Kth Smallest in a Sorted Matrix" },
          { id: "d47_t2_s2", label: "Solve: Copy List with Random Pointer" },
          { id: "d47_t2_s3", label: "Solve: Add Two Numbers (Linked List)" },
          { id: "d47_t2_s4", label: "Solve: Rotate Array (3 approaches)" }
        ]
      }
    ]
  },
  {
    day: 48,
    phase: "Phase 6: AWS Deep Dive",
    phaseRange: "Days 43–50",
    categories: ["DB/DevOps", "DSA"],
    title: "AWS Final Concepts — RDS, ElastiCache, SQS, SNS",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "AWS — Additional Services",
        category: "DB/DevOps",
        subtopics: [
          { id: "d48_t1_s1", label: "RDS — managed databases, Multi-AZ for HA, read replicas for read scaling, Aurora" },
          { id: "d48_t1_s2", label: "ElastiCache — Redis vs Memcached; cache-aside pattern, session storage, distributed locks" },
          { id: "d48_t1_s3", label: "SQS — Standard vs FIFO queues, visibility timeout, DLQ, long polling, max 256KB message" },
          { id: "d48_t1_s4", label: "SNS — pub/sub, fan-out pattern with SQS, mobile push notifications, email/SMS" },
          { id: "d48_t1_s5", label: "AWS Well-Architected Framework — 6 pillars: Operational Excellence, Security, Reliability, Performance, Cost, Sustainability" }
        ]
      },
      {
        name: "DSA — Full Timed Practice",
        category: "DSA",
        subtopics: [
          { id: "d48_t2_s1", label: "Mock: solve 2 medium + 1 hard in 90 minutes" },
          { id: "d48_t2_s2", label: "Post-mock analysis: which patterns did you recognize quickly vs struggle with?" },
          { id: "d48_t2_s3", label: "Create a cheat sheet: top 15 DSA patterns with template code" }
        ]
      }
    ]
  },
  {
    day: 49,
    phase: "Phase 6: AWS Deep Dive",
    phaseRange: "Days 43–50",
    categories: ["DB/DevOps", "DSA"],
    title: "Phase 6 Review — AWS Rapid-Fire",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "AWS — Comprehensive Review",
        category: "DB/DevOps",
        subtopics: [
          { id: "d49_t1_s1", label: "Rapid-fire: S3 storage classes, presigned URLs, encryption types" },
          { id: "d49_t1_s2", label: "Rapid-fire: EC2 vs ECS vs Lambda — decision tree for compute choices" },
          { id: "d49_t1_s3", label: "Rapid-fire: IAM roles vs policies, KMS vs Secrets Manager" },
          { id: "d49_t1_s4", label: "Rapid-fire: Terraform workflow, state management, modules" },
          { id: "d49_t1_s5", label: "Draw: production architecture — ALB → ECS → RDS + ElastiCache + S3 + CloudWatch" }
        ]
      },
      {
        name: "DSA — Weak Area Focus",
        category: "DSA",
        subtopics: [
          { id: "d49_t2_s1", label: "Review all 'What I Missed' notes from Days 1–48" },
          { id: "d49_t2_s2", label: "Re-solve your weakest 5 problems from the backlog" },
          { id: "d49_t2_s3", label: "Practice explaining solutions aloud (verbal fluency)" },
          { id: "d49_t2_s4", label: "Timed: 1 easy + 2 medium in 60 minutes" }
        ]
      }
    ]
  },
  {
    day: 50,
    phase: "Phase 6: AWS Deep Dive",
    phaseRange: "Days 43–50",
    categories: ["DB/DevOps", "DSA"],
    title: "Midpoint Check — Comprehensive Review",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Midpoint — Full Stack Review",
        category: "DB/DevOps",
        subtopics: [
          { id: "d50_t1_s1", label: "Java self-test: explain OOP, Java 8 streams, concurrency, collections — 30 min rapid-fire" },
          { id: "d50_t1_s2", label: "Spring self-test: DI, JPA N+1, @Transactional, JWT, testing — 20 min rapid-fire" },
          { id: "d50_t1_s3", label: "Kafka self-test: delivery guarantees, consumer lag, partitioning, DLT — 15 min" },
          { id: "d50_t1_s4", label: "AWS self-test: S3, EC2/ECS, IAM, VPC, Terraform — 15 min" },
          { id: "d50_t1_s5", label: "Identify top 5 weakest areas — create focused study plan for Phase 7–8" }
        ]
      },
      {
        name: "DSA — Timed Interview Practice",
        category: "DSA",
        subtopics: [
          { id: "d32_t2_s1", label: "Timed: solve 1 easy + 2 medium problems in 60 minutes" },
          { id: "d32_t2_s2", label: "Practice thinking aloud — explain approach before coding" },
          { id: "d32_t2_s3", label: "Practice edge cases: empty input, single element, large input, negative numbers" },
          { id: "d32_t2_s4", label: "Time/space complexity analysis after each solution" },
          { id: "d29_t2_s4", label: "Solve: Encode and Decode Strings" },
          { id: "d29_t2_s5", label: "Timed: solve 2 medium problems in 30 min" }
        ]
      }
    ]
  },

  // ===================== PHASE 7: SQL & DESIGN PATTERNS (Days 51–56) =====================
  {
    day: 51,
    phase: "Phase 7: SQL & Patterns",
    phaseRange: "Days 51–56",
    categories: ["DB/DevOps", "DSA"],
    title: "SQL Deep Dive — Joins, CTEs & Subqueries",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "SQL — Advanced Queries",
        category: "DB/DevOps",
        subtopics: [
          { id: "d51_t1_s1", label: "JOIN types: INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF JOIN — write queries for each" },
          { id: "d51_t1_s2", label: "Self-joins — employee-manager hierarchy, consecutive date records" },
          { id: "d51_t1_s3", label: "Subqueries — scalar, correlated, EXISTS vs IN (prefer EXISTS for correlated subqueries)" },
          { id: "d51_t1_s4", label: "CTEs (WITH clause) — readable, reusable; recursive CTEs for hierarchical data (org charts)" },
          { id: "d51_t1_s5", label: "GROUP BY with HAVING vs WHERE — WHERE filters before aggregation, HAVING after" },
          { id: "d51_t1_s6", label: "CASE WHEN THEN ELSE END — conditional logic in SELECT and WHERE clauses" },
          { id: "d51_t1_s7", label: "Practice: write queries for nth highest salary, consecutive days, top N per group" }
        ]
      },
      {
        name: "DSA — String Advanced",
        category: "DSA",
        subtopics: [
          { id: "d51_t2_s1", label: "Solve: Longest Palindromic Substring (expand from center)" },
          { id: "d51_t2_s2", label: "Solve: String Compression" },
          { id: "d51_t2_s3", label: "Solve: Repeated Substring Pattern" },
          { id: "d51_t2_s4", label: "KMP algorithm overview — pattern matching in O(n+m)" }
        ]
      }
    ]
  },
  {
    day: 52,
    phase: "Phase 7: SQL & Patterns",
    phaseRange: "Days 51–56",
    categories: ["DB/DevOps", "DSA"],
    title: "SQL — Window Functions (Most Tested Topic!)",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "SQL — Window Functions",
        category: "DB/DevOps",
        subtopics: [
          { id: "d52_t1_s1", label: "OVER (PARTITION BY ... ORDER BY ...) — the window function syntax foundation" },
          { id: "d52_t1_s2", label: "Ranking: ROW_NUMBER() vs RANK() vs DENSE_RANK() — differences with ties" },
          { id: "d52_t1_s3", label: "Analytic: LAG(), LEAD(), FIRST_VALUE(), LAST_VALUE() — access previous/next row" },
          { id: "d52_t1_s4", label: "Aggregate windows: SUM/AVG/COUNT with ROWS BETWEEN, RANGE BETWEEN frames" },
          { id: "d52_t1_s5", label: "Write: 2nd highest salary per department using DENSE_RANK() + subquery" },
          { id: "d52_t1_s6", label: "Write: running total using SUM() OVER (ORDER BY date)" },
          { id: "d52_t1_s7", label: "Write: compare current row with previous using LAG() for trend analysis" }
        ]
      },
      {
        name: "DSA — Binary Search & Heap Revision",
        category: "DSA",
        subtopics: [
          { id: "d52_t2_s1", label: "Solve: Median of Two Sorted Arrays (hard — binary search)" },
          { id: "d52_t2_s2", label: "Solve: Capacity to Ship Packages (binary search on answer)" },
          { id: "d52_t2_s3", label: "Solve: K Closest Points to Origin (heap)" },
          { id: "d52_t2_s4", label: "Solve: Find K Closest Elements" }
        ]
      }
    ]
  },
  {
    day: 53,
    phase: "Phase 7: SQL & Patterns",
    phaseRange: "Days 51–56",
    categories: ["DB/DevOps", "DSA"],
    title: "SQL — Indexing, EXPLAIN & Transactions",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "SQL — Performance & Transactions",
        category: "DB/DevOps",
        subtopics: [
          { id: "d53_t1_s1", label: "Index types: B-tree (range queries), Hash (equality); composite index column order (leftmost prefix)" },
          { id: "d53_t1_s2", label: "Clustered vs Non-clustered indexes — data order on disk vs pointer to data rows" },
          { id: "d53_t1_s3", label: "EXPLAIN / EXPLAIN ANALYZE — reading query plans, spotting sequential scans vs index scans" },
          { id: "d53_t1_s4", label: "ACID properties — Atomicity, Consistency, Isolation, Durability" },
          { id: "d53_t1_s5", label: "Isolation levels: Read Uncommitted → Read Committed → Repeatable Read → Serializable" },
          { id: "d53_t1_s6", label: "MVCC — how PostgreSQL handles concurrent reads without locking; vacuum, analyze" },
          { id: "d53_t1_s7", label: "PostgreSQL specifics: JSONB, array types, pg_stat_activity, partitioning" }
        ]
      },
      {
        name: "DSA — Graph & Tree Final Revision",
        category: "DSA",
        subtopics: [
          { id: "d53_t2_s1", label: "Revise: Dijkstra's algorithm implementation with PriorityQueue" },
          { id: "d53_t2_s2", label: "Revise: Topological Sort (BFS Kahn's + DFS approaches)" },
          { id: "d53_t2_s3", label: "Solve: Critical Connections (bridges in graph)" },
          { id: "d53_t2_s4", label: "Solve: Maximal Rectangle (histogram approach)" }
        ]
      }
    ]
  },
  {
    day: 54,
    phase: "Phase 7: SQL & Patterns",
    phaseRange: "Days 51–56",
    categories: ["DB/DevOps"],
    title: "NoSQL, SQL vs NoSQL & Git Workflows",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Databases — NoSQL & Tools",
        category: "DB/DevOps",
        subtopics: [
          { id: "d54_t1_s1", label: "NoSQL categories: Document (MongoDB), Key-Value (Redis/DynamoDB), Wide-Column (Cassandra), Graph (Neo4j)" },
          { id: "d54_t1_s2", label: "MongoDB — collections, documents, BSON, aggregation pipeline, flexible schema, replica sets" },
          { id: "d54_t1_s3", label: "DynamoDB — partition key, sort key, GSI, LSI, on-demand vs provisioned capacity, single-table design" },
          { id: "d54_t1_s4", label: "SQL vs NoSQL decision — consistency needs, query patterns, scale requirements; polyglot persistence" },
          { id: "d54_t1_s5", label: "Git branching: Git Flow vs Trunk-based dev; rebase vs merge; cherry-pick, stash, bisect" },
          { id: "d54_t1_s6", label: "Code review best practices — PR size, constructive feedback, conventional commits" }
        ]
      }
    ]
  },
  {
    day: 55,
    phase: "Phase 7: SQL & Patterns",
    phaseRange: "Days 51–56",
    categories: ["System Design", "DSA"],
    title: "System Design Fundamentals — Scalability, Caching & Load Balancing",
    estimatedTime: "4–5 hrs",
    topics: [
      {
        name: "HLD — System Design Concepts",
        category: "System Design",
        subtopics: [
          { id: "d55_t1_s1", label: "CAP Theorem — Consistency, Availability, Partition Tolerance; PACELC extension" },
          { id: "d55_t1_s2", label: "Database scaling — vertical (bigger machine) vs horizontal (sharding, read replicas)" },
          { id: "d55_t1_s3", label: "Sharding strategies — range-based, hash-based, directory-based; cross-shard query challenges" },
          { id: "d55_t1_s4", label: "Caching — CDN, Redis cache-aside, write-through, write-behind; cache invalidation strategies" },
          { id: "d55_t1_s5", label: "Rate limiting — token bucket, leaky bucket, fixed window, sliding window log" },
          { id: "d55_t1_s6", label: "Load balancing — round-robin, least connections, consistent hashing (minimizes remapping)" },
          { id: "d55_t1_s7", label: "Message queues vs event streaming — when to use SQS vs Kafka" },
          { id: "d55_t1_s8", label: "Consistent hashing — virtual nodes, minimizes key redistribution; used in Redis Cluster, DynamoDB" },
          { id: "d55_t1_s9", label: "Bloom filters — probabilistic set membership, no false negatives, space-efficient" }
        ]
      },
      {
        name: "DSA — DP Final Revision",
        category: "DSA",
        subtopics: [
          { id: "d55_t2_s1", label: "Revise: Coin Change, House Robber, LIS, LCS, Edit Distance, Knapsack — solve from memory" },
          { id: "d55_t2_s2", label: "Solve: Interleaving String" },
          { id: "d55_t2_s3", label: "Solve: Distinct Subsequences" },
          { id: "d55_t2_s4", label: "Timed: 2 medium DP problems in 30 min" }
        ]
      }
    ]
  },
  {
    day: 56,
    phase: "Phase 7: SQL & Patterns",
    phaseRange: "Days 51–56",
    categories: ["System Design", "DSA"],
    title: "Phase 7 Review — SQL + System Design Consolidation",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "SQL & System Design — Review",
        category: "System Design",
        subtopics: [
          { id: "d56_t1_s1", label: "Write: 2nd highest salary, running total, LAG comparison — without notes" },
          { id: "d56_t1_s2", label: "Explain: B-tree index, composite index column order, EXPLAIN plan reading" },
          { id: "d56_t1_s3", label: "Explain: CAP theorem with examples (ZooKeeper CP, Cassandra AP, MongoDB CP)" },
          { id: "d56_t1_s4", label: "Explain: caching strategies (cache-aside, write-through) with Redis" },
          { id: "d56_t1_s5", label: "Explain: consistent hashing with virtual nodes" },
          { id: "d56_t1_s6", label: "Rapid-fire: SQL isolation levels, MVCC, optimistic vs pessimistic locking" }
        ]
      },
      {
        name: "DSA — Final Hard Practice",
        category: "DSA",
        subtopics: [
          { id: "d56_t2_s1", label: "Solve: N-Queens II" },
          { id: "d56_t2_s2", label: "Solve: Sudoku Solver (backtracking)" },
          { id: "d56_t2_s3", label: "Solve: Palindrome Partitioning II" },
          { id: "d56_t2_s4", label: "Timed: 1 hard in 40 minutes" }
        ]
      }
    ]
  },

  // ===================== PHASE 8: MOCK INTERVIEWS & FINAL POLISH (Days 57–60) =====================
  {
    day: 57,
    phase: "Phase 8: Final Sprint",
    phaseRange: "Days 57–60",
    categories: ["System Design"],
    title: "System Design Practice — URL Shortener, Chat, Notification",
    estimatedTime: "4–5 hrs",
    topics: [
      {
        name: "HLD — Practice Problems (By Interview Frequency)",
        category: "System Design",
        subtopics: [
          { id: "d57_t1_s1", label: "Design URL Shortener (TinyURL) — hashing, collision handling, redirect 301/302, analytics, DB choice" },
          { id: "d57_t1_s2", label: "Design Notification System — fan-out, push vs pull, priority queues, rate limiting, multi-channel" },
          { id: "d57_t1_s3", label: "Design Chat Application — WebSocket, message ordering, presence detection, delivery receipts" },
          { id: "d57_t1_s4", label: "Design Rate Limiter — token bucket, Redis implementation, per-user/per-API/global limits" },
          { id: "d57_t1_s5", label: "Design Search Autocomplete — Trie, ranking by frequency, caching suggestions" },
          { id: "d57_t1_s6", label: "SD framework: requirements → API design → high-level → database → deep dive → bottlenecks → scaling" },
          { id: "d57_t1_s7", label: "Practice: draw clean architecture diagrams with data flow annotations" }
        ]
      }
    ]
  },
  {
    day: 58,
    phase: "Phase 8: Final Sprint",
    phaseRange: "Days 57–60",
    categories: ["System Design", "DB/DevOps"],
    title: "Behavioral Prep — STAR Method & Project Deep-Dive",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Behavioral — STAR Method",
        category: "System Design",
        subtopics: [
          { id: "d58_t1_s1", label: "STAR method: Situation → Task → Action → Result — framework for every behavioral answer" },
          { id: "d58_t1_s2", label: "Craft: 'Tell me about yourself' — 60-second elevator pitch: background → skills → what you want" },
          { id: "d58_t1_s3", label: "Prepare: 'Tell me about a time you improved system performance' — with metrics" },
          { id: "d58_t1_s4", label: "Prepare: 'Describe a challenging technical problem you solved' — debugging story" },
          { id: "d58_t1_s5", label: "Prepare: 'How do you handle conflicting priorities?' — sprint planning, stakeholders" },
          { id: "d58_t1_s6", label: "Prepare: 'Tell me about a time you learned a new technology quickly'" }
        ]
      },
      {
        name: "Behavioral — Project Deep-Dive",
        category: "DB/DevOps",
        subtopics: [
          { id: "d58_t2_s1", label: "Document your project architecture — components, data flow, tech stack on a whiteboard" },
          { id: "d58_t2_s2", label: "Identify 3 key design decisions and justify the trade-offs you made" },
          { id: "d58_t2_s3", label: "Prepare production outage story — root cause, detection, fix, prevention (timeline)" },
          { id: "d58_t2_s4", label: "Describe a significant performance optimization — before/after metrics" },
          { id: "d58_t2_s5", label: "Prepare: 'How do you ensure code quality?' — CI/CD, testing strategy, code reviews" }
        ]
      }
    ]
  },
  {
    day: 59,
    phase: "Phase 8: Final Sprint",
    phaseRange: "Days 57–60",
    categories: ["System Design", "DB/DevOps"],
    title: "Resume Polish, LinkedIn & Final Weak Area Review",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Career — Resume & Online Presence",
        category: "System Design",
        subtopics: [
          { id: "d59_t1_s1", label: "Quantify every resume bullet — add volume: 'for 50K daily transactions' not just 'reduced time'" },
          { id: "d59_t1_s2", label: "Add key technologies: Kafka, Terraform, Microservices with specific achievements" },
          { id: "d59_t1_s3", label: "Update LinkedIn — mirror resume, add Skills section (Java, Spring, Kafka, AWS, Microservices)" },
          { id: "d59_t1_s4", label: "GitHub profile — push 2-3 Spring Boot + Kafka projects (microservices demo is ideal)" },
          { id: "d59_t1_s5", label: "Prepare questions to ask interviewers — team structure, tech stack, growth, on-call rotation" },
          { id: "d59_t1_s6", label: "Create cheat sheet: top 20 most-asked topics across all phases" }
        ]
      },
      {
        name: "Review — Final Weak Area Consolidation",
        category: "DB/DevOps",
        subtopics: [
          { id: "d59_t2_s1", label: "Review all 'What I Missed' notes from 58 days — address every unresolved item" },
          { id: "d59_t2_s2", label: "Practice explaining 5 key concepts aloud — verbal fluency is critical" },
          { id: "d59_t2_s3", label: "Solve 3 random problems from weak categories — focus on understanding, no time limit" },
          { id: "d59_t2_s4", label: "Prepare elevator pitch for each project on your resume" }
        ]
      }
    ]
  },
  {
    day: 60,
    phase: "Phase 8: Final Sprint",
    phaseRange: "Days 57–60",
    categories: ["Java", "Spring Boot", "DSA", "System Design", "DB/DevOps"],
    title: "🎯 Final Mock Interview Day — You Are Ready!",
    estimatedTime: "5–6 hrs",
    topics: [
      {
        name: "Mock — Coding Round (90 min)",
        category: "DSA",
        subtopics: [
          { id: "d60_t1_s1", label: "Mock: solve 2 medium + 1 hard in 90 minutes — no hints, think aloud" },
          { id: "d60_t1_s2", label: "Practice: clarify requirements → approach → code → test → complexity analysis" },
          { id: "d60_t1_s3", label: "Practice edge cases and dry-run with examples before submitting" }
        ]
      },
      {
        name: "Mock — System Design Round (45 min)",
        category: "System Design",
        subtopics: [
          { id: "d60_t2_s1", label: "Pick a random HLD problem and design end-to-end in 45 minutes" },
          { id: "d60_t2_s2", label: "Flow: requirements → API design → high-level → database → deep dive → scaling" },
          { id: "d60_t2_s3", label: "Draw clean architecture diagrams, address bottlenecks, discuss trade-offs" }
        ]
      },
      {
        name: "Mock — Java/Spring Deep-Dive (30 min)",
        category: "Spring Boot",
        subtopics: [
          { id: "d60_t3_s1", label: "Rapid-fire: 20 Java/Spring questions — OOP, streams, threading, collections, Spring DI" },
          { id: "d60_t3_s2", label: "Explain: HashMap internals, N+1 problem, @Transactional pitfalls, JWT flow" },
          { id: "d60_t3_s3", label: "Explain: Kafka delivery guarantees, consumer lag, partition rebalancing" },
          { id: "d60_t3_s4", label: "Explain: Spring Boot auto-configuration, bean lifecycle, AOP proxies" }
        ]
      },
      {
        name: "🎉 Final Checklist",
        category: "Java",
        subtopics: [
          { id: "d60_t4_s1", label: "✅ Review overall progress — celebrate wins, acknowledge the 60-day grind" },
          { id: "d60_t4_s2", label: "✅ Resume finalized, LinkedIn updated, GitHub projects pushed" },
          { id: "d60_t4_s3", label: "✅ Prepare logistics: questions to ask, salary expectations, availability" },
          { id: "d60_t4_s4", label: "✅ Mental prep: rest well, visualize success, trust 60 days of consistent effort" },
          { id: "d60_t4_s5", label: "🚀 You have the experience AND the depth — own the interview! Good luck!" }
        ]
      }
    ]
  }
];

// ============================================================
// Category color mapping
// ============================================================
const CATEGORY_COLORS = {
  "Java": { bg: "#1a3a5c", text: "#58a6ff", border: "#1f6feb" },
  "Spring Boot": { bg: "#1a3c1a", text: "#3fb950", border: "#238636" },
  "DSA": { bg: "#3d1f5c", text: "#bc8cff", border: "#8b5cf6" },
  "System Design": { bg: "#5c3d1a", text: "#f0883e", border: "#d29922" },
  "DB/DevOps": { bg: "#5c1a2e", text: "#f778ba", border: "#db61a2" }
};

// ============================================================
// Phase metadata
// ============================================================
const PHASES = [
  { name: "Phase 1: Core Java", range: "Days 1–10", days: [1,2,3,4,5,6,7,8,9,10] },
  { name: "Phase 2: Collections", range: "Days 11–18", days: [11,12,13,14,15,16,17,18] },
  { name: "Phase 3: Spring Boot", range: "Days 19–26", days: [19,20,21,22,23,24,25,26] },
  { name: "Phase 4: Microservices", range: "Days 27–34", days: [27,28,29,30,31,32,33,34] },
  { name: "Phase 5: Apache Kafka", range: "Days 35–42", days: [35,36,37,38,39,40,41,42] },
  { name: "Phase 6: AWS Deep Dive", range: "Days 43–50", days: [43,44,45,46,47,48,49,50] },
  { name: "Phase 7: SQL & Patterns", range: "Days 51–56", days: [51,52,53,54,55,56] },
  { name: "Phase 8: Final Sprint", range: "Days 57–60", days: [57,58,59,60] }
];
