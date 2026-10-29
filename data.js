// ============================================================
// 60-Day SDE Interview Prep – Complete Curriculum Data
// Aligned with the 60dayplan PDF + DSA Practice
// Target: Backend/Full-Stack Java Developer with 2–3 YOE
// ============================================================

const CURRICULUM_DATA = [
  // ===================== PHASE 1: CORE JAVA DEEP DIVE (Days 1–10) =====================
  {
    day: 1,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "OOP Principles & JVM Memory Model",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Java — OOP & Memory Model",
        category: "Java",
        subtopics: [
          { id: "d1_t1_s1", label: "SOLID Principles — explain each with a real code example you can whiteboard" },
          { id: "d1_t1_s2", label: "JVM Architecture — Stack vs Heap, Method Area, GC Roots" },
          { id: "d1_t1_s3", label: "String Pool & interning — why \"abc\" == \"abc\" is true but new String(\"abc\") == new String(\"abc\") is false" },
          { id: "d1_t1_s4", label: "== vs .equals() — reference comparison vs content comparison; always use .equals() for objects" },
          { id: "d1_t1_s5", label: "final, finally, finalize — differences, use cases, and why finalize is deprecated" },
          { id: "d1_t1_s6", label: "static keyword — static blocks, static initializers, static imports, class-level vs instance-level" },
          { id: "d1_t1_s7", label: "Wrapper classes, auto-boxing, unboxing pitfalls — Integer cache -128 to 127 trap" }
        ]
      },
      {
        name: "DSA — Time & Space Complexity",
        category: "DSA",
        subtopics: [
          { id: "d1_t2_s1", label: "Big-O, Big-Ω, Big-Θ notations — know how to classify any algorithm" },
          { id: "d1_t2_s2", label: "Common complexities: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)" },
          { id: "d1_t2_s3", label: "Practice calculating time complexity of nested loops and recursive functions" },
          { id: "d1_t2_s4", label: "Space complexity — auxiliary space vs total space" }
        ]
      }
    ]
  },
  {
    day: 2,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "OOP Deep Dive — Inheritance, Polymorphism, Immutability",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Java — OOP Continued",
        category: "Java",
        subtopics: [
          { id: "d2_t1_s1", label: "Encapsulation & Abstraction — abstract classes vs interfaces, when to use each" },
          { id: "d2_t1_s2", label: "Method overloading vs overriding — compile-time vs runtime polymorphism, covariant return types" },
          { id: "d2_t1_s3", label: "Cannot override static/final/private methods — know the rules and why" },
          { id: "d2_t1_s4", label: "Immutable classes — final fields, no setters, defensive copies; why String is immutable" },
          { id: "d2_t1_s5", label: "transient keyword — excluded from serialization, gets default value on deserialization" },
          { id: "d2_t1_s6", label: "Serialization — Serializable vs Externalizable, serialVersionUID, custom serialization" },
          { id: "d2_t1_s7", label: "StringBuilder vs StringBuffer — thread-safety, performance, when to use each" }
        ]
      },
      {
        name: "DSA — Arrays Fundamentals",
        category: "DSA",
        subtopics: [
          { id: "d2_t2_s1", label: "Array memory layout, access patterns, and cache locality" },
          { id: "d2_t2_s2", label: "Solve: Two Sum (brute-force & HashMap optimal)" },
          { id: "d2_t2_s3", label: "Solve: Best Time to Buy and Sell Stock" },
          { id: "d2_t2_s4", label: "Solve: Contains Duplicate" },
          { id: "d2_t2_s5", label: "Solve: Maximum Subarray (Kadane's Algorithm)" }
        ]
      }
    ]
  },
  {
    day: 3,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "Java 8 — Lambdas, Functional Interfaces & Streams",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Java 8 — Lambdas & Streams (Critical for Interviews)",
        category: "Java",
        subtopics: [
          { id: "d3_t1_s1", label: "Lambda syntax, effectively-final variables, method references (:: operator)" },
          { id: "d3_t1_s2", label: "Built-in functional interfaces: Predicate<T>, Function<T,R>, Consumer<T>, Supplier<T>" },
          { id: "d3_t1_s3", label: "Stream API pipeline: filter → map → sorted → collect (Collectors.toList())" },
          { id: "d3_t1_s4", label: "Collectors: groupingBy, partitioningBy, joining, counting — write code for each" },
          { id: "d3_t1_s5", label: "flatMap — flattening nested collections (List<List<T>> → Stream<T>)" },
          { id: "d3_t1_s6", label: "reduce() operation — accumulator pattern, identity value" },
          { id: "d3_t1_s7", label: "Code pattern: groupingBy for grouping employees by department (very common interview Q)" }
        ]
      },
      {
        name: "DSA — Strings & Hashing Basics",
        category: "DSA",
        subtopics: [
          { id: "d3_t2_s1", label: "Solve: Valid Anagram" },
          { id: "d3_t2_s2", label: "Solve: Valid Palindrome" },
          { id: "d3_t2_s3", label: "Solve: Group Anagrams (HashMap pattern)" },
          { id: "d3_t2_s4", label: "Solve: Longest Common Prefix" },
          { id: "d3_t2_s5", label: "Solve: Two Sum using HashMap approach" }
        ]
      }
    ]
  },
  {
    day: 4,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "Java 8 — Optional, Date/Time API & Advanced Streams",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Java 8 — Optional & Date/Time",
        category: "Java",
        subtopics: [
          { id: "d4_t1_s1", label: "Optional<T>: orElse, orElseGet, ifPresent, map, filter — avoid NullPointerException" },
          { id: "d4_t1_s2", label: "Code pattern: Optional.ofNullable(user).map(User::getEmail).orElse(\"N/A\")" },
          { id: "d4_t1_s3", label: "Default and static methods in interfaces — multiple inheritance of behavior" },
          { id: "d4_t1_s4", label: "Date/Time API: LocalDate, LocalDateTime, ZonedDateTime, Duration, Period" },
          { id: "d4_t1_s5", label: "Parallel streams — when to use, ForkJoinPool, common pitfalls, shared mutable state" },
          { id: "d4_t1_s6", label: "Stream short-circuit ops: findFirst, anyMatch, allMatch, noneMatch, limit — efficiency gains" }
        ]
      },
      {
        name: "DSA — Two Pointers Technique",
        category: "DSA",
        subtopics: [
          { id: "d4_t2_s1", label: "Two-pointer pattern — converging pointers on sorted arrays" },
          { id: "d4_t2_s2", label: "Solve: 3Sum" },
          { id: "d4_t2_s3", label: "Solve: Container With Most Water" },
          { id: "d4_t2_s4", label: "Solve: Remove Duplicates from Sorted Array" },
          { id: "d4_t2_s5", label: "Solve: Move Zeroes" }
        ]
      }
    ]
  },
  {
    day: 5,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "Java 11–17 Features (LTS Releases)",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Java 11–17 — Modern Features",
        category: "Java",
        subtopics: [
          { id: "d5_t1_s1", label: "Java 11: var in lambda, String methods (isBlank, strip, lines, repeat), Files.readString" },
          { id: "d5_t1_s2", label: "Java 14–16: Records — immutable data carriers, auto-generated equals/hashCode/toString" },
          { id: "d5_t1_s3", label: "Java 15: Text Blocks (\"\"\" multi-line strings) — cleaner SQL/JSON templates" },
          { id: "d5_t1_s4", label: "Java 16: Pattern Matching for instanceof — no explicit casting needed" },
          { id: "d5_t1_s5", label: "Java 17 (LTS): Sealed classes — restrict which classes can extend/implement" },
          { id: "d5_t1_s6", label: "Switch expressions (Java 14+): yield keyword, arrow syntax, return values from switch" },
          { id: "d5_t1_s7", label: "NullPointerException improvements — helpful messages pinpointing exact null variable" }
        ]
      },
      {
        name: "DSA — Sliding Window",
        category: "DSA",
        subtopics: [
          { id: "d5_t2_s1", label: "Fixed-size vs variable-size sliding window patterns" },
          { id: "d5_t2_s2", label: "Solve: Maximum Sum Subarray of Size K" },
          { id: "d5_t2_s3", label: "Solve: Longest Substring Without Repeating Characters" },
          { id: "d5_t2_s4", label: "Solve: Minimum Window Substring" },
          { id: "d5_t2_s5", label: "Solve: Permutation in String" }
        ]
      }
    ]
  },
  {
    day: 6,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "Generics & Exception Handling",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Java — Generics & Exception Handling",
        category: "Java",
        subtopics: [
          { id: "d6_t1_s1", label: "Type parameters (<T>, <K,V>), bounded types (<T extends Number>), PECS principle" },
          { id: "d6_t1_s2", label: "Wildcards — unbounded (?), upper-bounded (? extends), lower-bounded (? super)" },
          { id: "d6_t1_s3", label: "Type erasure — how generics work at compile-time, limitations at runtime" },
          { id: "d6_t1_s4", label: "Checked vs Unchecked exceptions — when to use each in real projects" },
          { id: "d6_t1_s5", label: "Custom exceptions — extending RuntimeException vs Exception, best practices" },
          { id: "d6_t1_s6", label: "try-with-resources — AutoCloseable interface, multi-catch syntax" },
          { id: "d6_t1_s7", label: "Exception chaining: new RuntimeException(\"msg\", cause) — never swallow exceptions" }
        ]
      },
      {
        name: "DSA — Linked Lists I",
        category: "DSA",
        subtopics: [
          { id: "d6_t2_s1", label: "Singly linked list — implementation, insertion, deletion, traversal" },
          { id: "d6_t2_s2", label: "Solve: Reverse Linked List (iterative & recursive)" },
          { id: "d6_t2_s3", label: "Solve: Merge Two Sorted Lists" },
          { id: "d6_t2_s4", label: "Solve: Linked List Cycle Detection (Floyd's Tortoise & Hare)" },
          { id: "d6_t2_s5", label: "Solve: Remove Nth Node From End of List" }
        ]
      }
    ]
  },
  {
    day: 7,
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
          { id: "d7_t1_s1", label: "Thread lifecycle: NEW → RUNNABLE → BLOCKED → WAITING → TIMED_WAITING → TERMINATED" },
          { id: "d7_t1_s2", label: "Runnable vs Callable vs Thread — differences and when to use each" },
          { id: "d7_t1_s3", label: "synchronized keyword — method-level vs block-level, intrinsic locks (monitor)" },
          { id: "d7_t1_s4", label: "volatile keyword — visibility guarantee, happens-before relationship" },
          { id: "d7_t1_s5", label: "wait(), notify(), notifyAll() — inter-thread communication on Object monitor" },
          { id: "d7_t1_s6", label: "Deadlock — causes, detection (jstack), prevention strategies (lock ordering, tryLock timeout)" },
          { id: "d7_t1_s7", label: "ThreadLocal<T> — per-thread storage without synchronization, InheritableThreadLocal" }
        ]
      },
      {
        name: "DSA — Linked Lists II & Stacks",
        category: "DSA",
        subtopics: [
          { id: "d7_t2_s1", label: "Solve: Middle of Linked List (slow & fast pointers)" },
          { id: "d7_t2_s2", label: "Solve: Palindrome Linked List" },
          { id: "d7_t2_s3", label: "Solve: Reorder List" },
          { id: "d7_t2_s4", label: "Solve: Valid Parentheses (stack)" },
          { id: "d7_t2_s5", label: "Solve: Min Stack — O(1) getMin()" }
        ]
      }
    ]
  },
  {
    day: 8,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "Concurrency — Locks, Executors & CompletableFuture",
    estimatedTime: "4–5 hrs",
    topics: [
      {
        name: "Java — Advanced Concurrency",
        category: "Java",
        subtopics: [
          { id: "d8_t1_s1", label: "ReentrantLock vs synchronized — tryLock(timeout), lockInterruptibly(), fairness, Condition objects" },
          { id: "d8_t1_s2", label: "ReadWriteLock, StampedLock — optimistic reads for read-heavy workloads" },
          { id: "d8_t1_s3", label: "ExecutorService — FixedThreadPool, CachedThreadPool, ScheduledExecutor, graceful shutdown" },
          { id: "d8_t1_s4", label: "Future<T> limitations — get() blocks the calling thread" },
          { id: "d8_t1_s5", label: "CompletableFuture — thenApply, thenAccept, thenCombine, exceptionally, allOf/anyOf (non-blocking)" },
          { id: "d8_t1_s6", label: "Atomic classes: AtomicInteger, AtomicReference, CAS operations, LongAdder for high contention" },
          { id: "d8_t1_s7", label: "CountDownLatch, CyclicBarrier, Semaphore — synchronization utilities" }
        ]
      },
      {
        name: "DSA — Binary Search",
        category: "DSA",
        subtopics: [
          { id: "d8_t2_s1", label: "Binary search template — iterative and recursive" },
          { id: "d8_t2_s2", label: "Solve: Search in Rotated Sorted Array" },
          { id: "d8_t2_s3", label: "Solve: Find Minimum in Rotated Sorted Array" },
          { id: "d8_t2_s4", label: "Solve: Find First and Last Position of Element" },
          { id: "d8_t2_s5", label: "Solve: Koko Eating Bananas (binary search on answer)" }
        ]
      }
    ]
  },
  {
    day: 9,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "Design Principles — SOLID, DRY, KISS + Memory Management",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Java — Design Principles & GC",
        category: "Java",
        subtopics: [
          { id: "d9_t1_s1", label: "S — Single Responsibility: one reason to change per class, refactoring exercise" },
          { id: "d9_t1_s2", label: "O — Open/Closed: open for extension, closed for modification — Strategy pattern example" },
          { id: "d9_t1_s3", label: "L — Liskov Substitution: subtypes must be substitutable without breaking behavior" },
          { id: "d9_t1_s4", label: "I — Interface Segregation: prefer small, focused interfaces over fat ones" },
          { id: "d9_t1_s5", label: "D — Dependency Inversion: depend on abstractions (List<T>) not concretions (ArrayList<T>)" },
          { id: "d9_t1_s6", label: "GC algorithms: G1 (default Java 9+), ZGC (low-latency), tuning flags (-Xms, -Xmx, -XX:+UseG1GC)" },
          { id: "d9_t1_s7", label: "Memory leaks — static collections, unclosed resources, inner classes holding outer ref" }
        ]
      },
      {
        name: "DSA — Queues & Monotonic Stack",
        category: "DSA",
        subtopics: [
          { id: "d9_t2_s1", label: "Solve: Implement Queue using Stacks" },
          { id: "d9_t2_s2", label: "Solve: Daily Temperatures (monotonic stack)" },
          { id: "d9_t2_s3", label: "Solve: Next Greater Element I" },
          { id: "d9_t2_s4", label: "Solve: Evaluate Reverse Polish Notation" },
          { id: "d9_t2_s5", label: "Solve: Sliding Window Maximum (monotonic deque)" }
        ]
      }
    ]
  },
  {
    day: 10,
    phase: "Phase 1: Core Java",
    phaseRange: "Days 1–10",
    categories: ["Java", "DSA"],
    title: "Phase 1 Review — Java Core Rapid-Fire Q&A",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Java — Core Review & Interview Q&A",
        category: "Java",
        subtopics: [
          { id: "d10_t1_s1", label: "Rapid-fire: explain JVM memory, String pool, == vs .equals(), final/finally/finalize" },
          { id: "d10_t1_s2", label: "Rapid-fire: explain overloading vs overriding rules, abstract vs interface" },
          { id: "d10_t1_s3", label: "Rapid-fire: Stream pipeline, groupingBy, Optional chaining, parallel stream pitfalls" },
          { id: "d10_t1_s4", label: "Rapid-fire: synchronized vs ReentrantLock, CompletableFuture vs Future, volatile vs atomic" },
          { id: "d10_t1_s5", label: "Rapid-fire: Records, Sealed classes, Pattern Matching, text blocks" },
          { id: "d10_t1_s6", label: "Write 5 code snippets from memory: Stream groupingBy, Optional chaining, CompletableFuture chain, producer-consumer, immutable class" }
        ]
      },
      {
        name: "DSA — Trees I",
        category: "DSA",
        subtopics: [
          { id: "d10_t2_s1", label: "Tree traversals: Inorder, Preorder, Postorder (recursive & iterative)" },
          { id: "d10_t2_s2", label: "Solve: Maximum Depth of Binary Tree" },
          { id: "d10_t2_s3", label: "Solve: Invert Binary Tree" },
          { id: "d10_t2_s4", label: "Solve: Same Tree / Subtree of Another Tree" },
          { id: "d10_t2_s5", label: "Solve: Level Order Traversal (BFS)" }
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
    title: "ArrayList, LinkedList & List Internals",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Collections — ArrayList & LinkedList (Q1–Q12 from PDF)",
        category: "Java",
        subtopics: [
          { id: "d11_t1_s1", label: "ArrayList internals — dynamic Object[] array, default capacity 10, grows by 1.5x when full" },
          { id: "d11_t1_s2", label: "ArrayList vs LinkedList — random access O(1) vs O(n); add at ends O(1) for LinkedList" },
          { id: "d11_t1_s3", label: "Thread-safety: Collections.synchronizedList() vs CopyOnWriteArrayList vs Vector (legacy)" },
          { id: "d11_t1_s4", label: "ConcurrentModificationException — fail-fast iterators, use Iterator.remove() or removeIf()" },
          { id: "d11_t1_s5", label: "contains() is O(n) for both — use HashSet for O(1) lookups" },
          { id: "d11_t1_s6", label: "remove(int) vs remove(Object) — the Integer autoboxing trap" },
          { id: "d11_t1_s7", label: "subList() returns a view not a copy — structural modification causes exception" },
          { id: "d11_t1_s8", label: "Arrays.asList() (fixed-size, mutable set) vs List.of() (Java 9, fully immutable, no nulls)" }
        ]
      },
      {
        name: "DSA — Trees II",
        category: "DSA",
        subtopics: [
          { id: "d11_t2_s1", label: "Solve: Binary Tree Right Side View" },
          { id: "d11_t2_s2", label: "Solve: Lowest Common Ancestor" },
          { id: "d11_t2_s3", label: "Solve: Validate Binary Search Tree" },
          { id: "d11_t2_s4", label: "Solve: Kth Smallest Element in a BST" },
          { id: "d11_t2_s5", label: "Solve: Diameter of Binary Tree" }
        ]
      }
    ]
  },
  {
    day: 12,
    phase: "Phase 2: Collections",
    phaseRange: "Days 11–18",
    categories: ["Java", "DSA"],
    title: "HashMap Internals — The Most Asked Topic",
    estimatedTime: "4–5 hrs",
    topics: [
      {
        name: "Collections — HashMap Deep Dive (Q13–Q22)",
        category: "Java",
        subtopics: [
          { id: "d12_t1_s1", label: "HashMap internals — array of Node<K,V>, hash & (capacity-1) for index, default capacity 16, load factor 0.75" },
          { id: "d12_t1_s2", label: "Treeification — bucket converts linked list → Red-Black Tree when size > 8 and table ≥ 64 (Java 8+)" },
          { id: "d12_t1_s3", label: "Hash collision handling — chaining with linked list, O(n) in Java 7 → O(log n) in Java 8+" },
          { id: "d12_t1_s4", label: "hashCode() + equals() contract — MUST override both; equal objects must have same hashCode" },
          { id: "d12_t1_s5", label: "Rehashing — when size > capacity × loadFactor, capacity doubles, entries redistribute" },
          { id: "d12_t1_s6", label: "HashMap vs LinkedHashMap vs TreeMap — no order vs insertion-order vs sorted by key" },
          { id: "d12_t1_s7", label: "Mutable keys danger — if key's hashCode changes after put(), entry becomes unretrievable" },
          { id: "d12_t1_s8", label: "null key behavior — HashMap allows 1 null key (bucket 0); Hashtable/CHM do NOT" }
        ]
      },
      {
        name: "DSA — Trees III & BST Operations",
        category: "DSA",
        subtopics: [
          { id: "d12_t2_s1", label: "Solve: Serialize and Deserialize Binary Tree" },
          { id: "d12_t2_s2", label: "Solve: Construct Binary Tree from Preorder and Inorder" },
          { id: "d12_t2_s3", label: "Solve: Binary Tree Maximum Path Sum" },
          { id: "d12_t2_s4", label: "Solve: Convert Sorted Array to Balanced BST" },
          { id: "d12_t2_s5", label: "Solve: Path Sum II" }
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
        name: "Collections — ConcurrentHashMap & Map Advanced (Q19–Q30)",
        category: "Java",
        subtopics: [
          { id: "d13_t1_s1", label: "ConcurrentHashMap — bucket-level CAS + synchronized (Java 8+), no null keys/values, high concurrency" },
          { id: "d13_t1_s2", label: "HashMap vs Hashtable vs ConcurrentHashMap — always prefer CHM, never use Hashtable" },
          { id: "d13_t1_s3", label: "LRU Cache with LinkedHashMap — accessOrder=true + override removeEldestEntry()" },
          { id: "d13_t1_s4", label: "Map.getOrDefault(), putIfAbsent(), computeIfAbsent() — atomic operations for concurrent maps" },
          { id: "d13_t1_s5", label: "Map.merge() — one-liner word frequency: map.merge(word, 1, Integer::sum)" },
          { id: "d13_t1_s6", label: "Map.compute() — atomic read-modify-write without external synchronization" },
          { id: "d13_t1_s7", label: "WeakHashMap — keys are WeakReferences, GC can collect; use for caches and metadata" },
          { id: "d13_t1_s8", label: "EnumMap — array-backed by ordinal, O(1), no hashing; always use for enum keys" }
        ]
      },
      {
        name: "DSA — Heaps / Priority Queues",
        category: "DSA",
        subtopics: [
          { id: "d13_t2_s1", label: "Heap fundamentals — min-heap, max-heap, PriorityQueue in Java" },
          { id: "d13_t2_s2", label: "Solve: Kth Largest Element in an Array" },
          { id: "d13_t2_s3", label: "Solve: Top K Frequent Elements" },
          { id: "d13_t2_s4", label: "Solve: Merge K Sorted Lists" },
          { id: "d13_t2_s5", label: "Solve: Find Median from Data Stream (two heaps)" }
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
        name: "Collections — Sets (Q31–Q40)",
        category: "Java",
        subtopics: [
          { id: "d14_t1_s1", label: "HashSet is backed by HashMap — add(element) calls map.put(element, PRESENT)" },
          { id: "d14_t1_s2", label: "HashSet vs LinkedHashSet vs TreeSet — no order vs insertion-order vs sorted (Red-Black Tree)" },
          { id: "d14_t1_s3", label: "Remove duplicates preserving order: new LinkedHashSet<>(list) or stream().distinct()" },
          { id: "d14_t1_s4", label: "Set operations: union (addAll), intersection (retainAll), difference (removeAll)" },
          { id: "d14_t1_s5", label: "TreeSet comparator caveat — if compareTo returns 0, elements treated as equal (deduplication trap!)" },
          { id: "d14_t1_s6", label: "NavigableSet — floor, ceiling, lower, higher, pollFirst, pollLast, descendingSet" },
          { id: "d14_t1_s7", label: "CopyOnWriteArraySet — thread-safe, copy on write, good for read-heavy small sets" },
          { id: "d14_t1_s8", label: "BitSet — memory-efficient boolean set, used for Sieve of Eratosthenes, bloom filters" }
        ]
      },
      {
        name: "DSA — Tries & Advanced Trees",
        category: "DSA",
        subtopics: [
          { id: "d14_t2_s1", label: "Trie implementation — insert, search, startsWith" },
          { id: "d14_t2_s2", label: "Solve: Implement Trie (Prefix Tree)" },
          { id: "d14_t2_s3", label: "Solve: Design Add and Search Words Data Structure" },
          { id: "d14_t2_s4", label: "Solve: Word Search II (Trie + Backtracking)" }
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
        name: "Collections — Queue, Deque & Stack (Q41–Q50)",
        category: "Java",
        subtopics: [
          { id: "d15_t1_s1", label: "Queue methods: add/offer (insert), remove/poll (remove), element/peek (examine) — exception vs null return" },
          { id: "d15_t1_s2", label: "ArrayDeque vs LinkedList as Stack/Queue — ArrayDeque is faster (no node overhead)" },
          { id: "d15_t1_s3", label: "PriorityQueue — min-heap by default, O(log n) offer/poll, O(1) peek; Collections.reverseOrder() for max-heap" },
          { id: "d15_t1_s4", label: "BlockingQueue — ArrayBlockingQueue, LinkedBlockingQueue; put() blocks if full, take() blocks if empty" },
          { id: "d15_t1_s5", label: "Producer-Consumer pattern with BlockingQueue — no manual synchronization needed" },
          { id: "d15_t1_s6", label: "ConcurrentLinkedQueue — non-blocking CAS-based queue, very high throughput" },
          { id: "d15_t1_s7", label: "Monotonic stack pattern — use for next greater element, stock span, largest rectangle problems" },
          { id: "d15_t1_s8", label: "TransferQueue — producer blocks until consumer takes the item; stronger coupling guarantee" }
        ]
      },
      {
        name: "DSA — Backtracking I",
        category: "DSA",
        subtopics: [
          { id: "d15_t2_s1", label: "Backtracking framework — choose → explore → unchoose" },
          { id: "d15_t2_s2", label: "Solve: Subsets (power set)" },
          { id: "d15_t2_s3", label: "Solve: Permutations" },
          { id: "d15_t2_s4", label: "Solve: Combination Sum" },
          { id: "d15_t2_s5", label: "Solve: N-Queens" }
        ]
      }
    ]
  },
  {
    day: 16,
    phase: "Phase 2: Collections",
    phaseRange: "Days 11–18",
    categories: ["Java", "DSA"],
    title: "Iterator, Comparator, Utility Methods & Concurrent Collections",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Collections — Iterator, Sorting & Advanced (Q51–Q68)",
        category: "Java",
        subtopics: [
          { id: "d16_t1_s1", label: "Comparable (natural order, compareTo) vs Comparator (external, compare) — Comparator.comparing() chains" },
          { id: "d16_t1_s2", label: "Collections.sort() uses TimSort — O(n log n), stable; list.sort(null) uses Comparable" },
          { id: "d16_t1_s3", label: "Fail-fast vs fail-safe iterators — modCount check, CopyOnWriteArrayList iterates on snapshot" },
          { id: "d16_t1_s4", label: "Collections.binarySearch() — list MUST be sorted, returns -(insertion point) - 1 if not found" },
          { id: "d16_t1_s5", label: "Immutable collections: List.of(), Set.of(), Map.of() (Java 9+) — null-free, truly immutable" },
          { id: "d16_t1_s6", label: "CopyOnWriteArrayList — copy on every write, reads never block; ideal for event listener lists" },
          { id: "d16_t1_s7", label: "ConcurrentSkipListMap — thread-safe sorted map, O(log n), alternative to synchronized TreeMap" },
          { id: "d16_t1_s8", label: "Stream + Collections: groupingBy, partitioningBy, toMap with merge function for duplicate keys" }
        ]
      },
      {
        name: "DSA — Graphs I",
        category: "DSA",
        subtopics: [
          { id: "d16_t2_s1", label: "Graph representations — adjacency list vs adjacency matrix" },
          { id: "d16_t2_s2", label: "BFS & DFS — implementation and when to use each" },
          { id: "d16_t2_s3", label: "Solve: Number of Islands" },
          { id: "d16_t2_s4", label: "Solve: Clone Graph" },
          { id: "d16_t2_s5", label: "Solve: Rotten Oranges (multi-source BFS)" }
        ]
      }
    ]
  },
  {
    day: 17,
    phase: "Phase 2: Collections",
    phaseRange: "Days 11–18",
    categories: ["Java", "DSA"],
    title: "Advanced Collections Q&A (Q69–Q80) & Interview Patterns",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Collections — Advanced Q&A (Q69–Q80)",
        category: "Java",
        subtopics: [
          { id: "d17_t1_s1", label: "Find duplicates efficiently: Set.add() returns false for existing — O(n) time & space" },
          { id: "d17_t1_s2", label: "Sort Map by value: stream().sorted(Map.Entry.comparingByValue()) → collect to LinkedHashMap" },
          { id: "d17_t1_s3", label: "IdentityHashMap — uses == instead of equals(), System.identityHashCode() for keys" },
          { id: "d17_t1_s4", label: "Thread-safe counter without synchronized: AtomicInteger.incrementAndGet(), LongAdder for high contention" },
          { id: "d17_t1_s5", label: "Efficient intersection of large lists: convert one to HashSet → O(n+m) vs O(n×m) with nested loops" },
          { id: "d17_t1_s6", label: "Collections.rotate() — three-reversal algorithm for circular shift" },
          { id: "d17_t1_s7", label: "Stream short-circuit: findFirst/anyMatch stop early — efficient for large collections" },
          { id: "d17_t1_s8", label: "Full Collections review — be ready to whiteboard any collection's internal structure" }
        ]
      },
      {
        name: "DSA — Graphs II",
        category: "DSA",
        subtopics: [
          { id: "d17_t2_s1", label: "Solve: Course Schedule (Topological Sort — Kahn's BFS)" },
          { id: "d17_t2_s2", label: "Solve: Course Schedule II (return ordering)" },
          { id: "d17_t2_s3", label: "Solve: Pacific Atlantic Water Flow" },
          { id: "d17_t2_s4", label: "Solve: Word Ladder (BFS shortest transformation)" },
          { id: "d17_t2_s5", label: "Solve: Network Delay Time (Dijkstra's)" }
        ]
      }
    ]
  },
  {
    day: 18,
    phase: "Phase 2: Collections",
    phaseRange: "Days 11–18",
    categories: ["Java", "DSA"],
    title: "Phase 2 Review — Collections Rapid-Fire & Graph Practice",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Collections — Final Rapid-Fire Review",
        category: "Java",
        subtopics: [
          { id: "d18_t1_s1", label: "Whiteboard: HashMap put/get flow including treeification threshold" },
          { id: "d18_t1_s2", label: "Whiteboard: ConcurrentHashMap bucket-level locking vs synchronized(map)" },
          { id: "d18_t1_s3", label: "Whiteboard: LinkedHashMap as LRU Cache with removeEldestEntry()" },
          { id: "d18_t1_s4", label: "Explain: when to use ArrayList vs LinkedList vs CopyOnWriteArrayList" },
          { id: "d18_t1_s5", label: "Explain: PriorityQueue for Top-K problems, BlockingQueue for producer-consumer" },
          { id: "d18_t1_s6", label: "Rapid-fire: answer 10 random collections questions from Q1–Q80 without notes" }
        ]
      },
      {
        name: "DSA — Graphs III & Union-Find",
        category: "DSA",
        subtopics: [
          { id: "d18_t2_s1", label: "Union-Find (Disjoint Set) — path compression, union by rank" },
          { id: "d18_t2_s2", label: "Solve: Redundant Connection" },
          { id: "d18_t2_s3", label: "Solve: Accounts Merge" },
          { id: "d18_t2_s4", label: "Solve: Surrounded Regions" },
          { id: "d18_t2_s5", label: "Solve: Graph Valid Tree" }
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
          { id: "d19_t1_s1", label: "IoC Container: BeanFactory (lazy) vs ApplicationContext (eager, events, i18n)" },
          { id: "d19_t1_s2", label: "@Component, @Service, @Repository, @Controller — stereotypes and why @Repository translates exceptions" },
          { id: "d19_t1_s3", label: "@Autowired: constructor injection (preferred for immutability & testability) vs field vs setter" },
          { id: "d19_t1_s4", label: "@Primary and @Qualifier — resolving ambiguous beans, named injection" },
          { id: "d19_t1_s5", label: "Bean scopes: singleton (default), prototype, request, session, application" },
          { id: "d19_t1_s6", label: "Lifecycle: @PostConstruct → use → @PreDestroy; InitializingBean & DisposableBean interfaces" },
          { id: "d19_t1_s7", label: "@Conditional, @Profile — conditional bean creation for different environments" },
          { id: "d19_t1_s8", label: "Spring AOP: @Aspect, @Before, @After, @Around — understand proxy mechanism (JDK dynamic / CGLIB)" }
        ]
      },
      {
        name: "DSA — Dynamic Programming I",
        category: "DSA",
        subtopics: [
          { id: "d19_t2_s1", label: "DP fundamentals — overlapping subproblems, optimal substructure, memoization vs tabulation" },
          { id: "d19_t2_s2", label: "Solve: Climbing Stairs" },
          { id: "d19_t2_s3", label: "Solve: House Robber" },
          { id: "d19_t2_s4", label: "Solve: Coin Change (minimum coins)" },
          { id: "d19_t2_s5", label: "Solve: Longest Increasing Subsequence" }
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
          { id: "d20_t1_s1", label: "@SpringBootApplication = @Configuration + @EnableAutoConfiguration + @ComponentScan — know what each does" },
          { id: "d20_t1_s2", label: "Auto-configuration: spring.factories (Boot 2) / AutoConfiguration.imports (Boot 3) with @ConditionalOn* annotations" },
          { id: "d20_t1_s3", label: "@RestController = @Controller + @ResponseBody; HTTP mappings: @GetMapping, @PostMapping, @PutMapping, @DeleteMapping" },
          { id: "d20_t1_s4", label: "@PathVariable, @RequestParam, @RequestBody, @RequestHeader — request data binding" },
          { id: "d20_t1_s5", label: "ResponseEntity<T> — control HTTP status codes, headers, and body in responses" },
          { id: "d20_t1_s6", label: "@Valid + Bean Validation: @NotNull, @NotBlank, @Size, @Email, @Pattern — request validation" },
          { id: "d20_t1_s7", label: "@ControllerAdvice + @ExceptionHandler — global exception handling with custom error DTOs" },
          { id: "d20_t1_s8", label: "HATEOAS, API versioning (URI vs header), Richardson Maturity Model" }
        ]
      },
      {
        name: "DSA — Dynamic Programming II",
        category: "DSA",
        subtopics: [
          { id: "d20_t2_s1", label: "Solve: Longest Common Subsequence (2D DP)" },
          { id: "d20_t2_s2", label: "Solve: Edit Distance" },
          { id: "d20_t2_s3", label: "Solve: Unique Paths" },
          { id: "d20_t2_s4", label: "Solve: Word Break" },
          { id: "d20_t2_s5", label: "Solve: 0/1 Knapsack & Partition Equal Subset Sum" }
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
          { id: "d21_t1_s1", label: "@Entity, @Table, @Id, @GeneratedValue — entity mapping basics and ID strategies" },
          { id: "d21_t1_s2", label: "Relationships: @OneToOne, @OneToMany, @ManyToOne, @ManyToMany — owning side vs mappedBy" },
          { id: "d21_t1_s3", label: "FetchType.LAZY vs EAGER — N+1 problem: what it is, how to detect via SQL logging" },
          { id: "d21_t1_s4", label: "N+1 solutions: JOIN FETCH in @Query, @EntityGraph, @BatchSize, @Fetch(FetchMode.SUBSELECT)" },
          { id: "d21_t1_s5", label: "JPQL, @Query with named parameters, native queries with nativeQuery=true" },
          { id: "d21_t1_s6", label: "Pagination: Pageable, Page<T>, Slice<T>, @PageableDefault — API pagination pattern" },
          { id: "d21_t1_s7", label: "CrudRepository vs JpaRepository vs PagingAndSortingRepository — repository hierarchy" },
          { id: "d21_t1_s8", label: "Spring Data projections: interface-based and class-based DTOs for partial data retrieval" }
        ]
      },
      {
        name: "DSA — Greedy Algorithms",
        category: "DSA",
        subtopics: [
          { id: "d21_t2_s1", label: "Greedy choice property — when greedy works vs when DP is needed" },
          { id: "d21_t2_s2", label: "Solve: Jump Game" },
          { id: "d21_t2_s3", label: "Solve: Gas Station" },
          { id: "d21_t2_s4", label: "Solve: Merge Intervals" },
          { id: "d21_t2_s5", label: "Solve: Non-overlapping Intervals" }
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
          { id: "d22_t1_s1", label: "@Transactional — declarative transaction management, self-invocation proxy pitfall" },
          { id: "d22_t1_s2", label: "Propagation: REQUIRED, REQUIRES_NEW, NESTED, MANDATORY — know when to use each" },
          { id: "d22_t1_s3", label: "Isolation levels: READ_COMMITTED (default), REPEATABLE_READ, SERIALIZABLE — dirty/phantom reads" },
          { id: "d22_t1_s4", label: "Optimistic locking: @Version for concurrent updates; Pessimistic locking: LockModeType" },
          { id: "d22_t1_s5", label: "Entity lifecycle: Transient → Persistent → Detached → Removed" },
          { id: "d22_t1_s6", label: "First-level cache (session) vs Second-level cache (EhCache/Hazelcast) — @Cacheable entities" },
          { id: "d22_t1_s7", label: "Database migrations: Flyway vs Liquibase — versioned schema changes" }
        ]
      },
      {
        name: "DSA — Intervals & Sorting",
        category: "DSA",
        subtopics: [
          { id: "d22_t2_s1", label: "Solve: Insert Interval" },
          { id: "d22_t2_s2", label: "Solve: Meeting Rooms I and II" },
          { id: "d22_t2_s3", label: "Solve: Sort Colors (Dutch National Flag)" },
          { id: "d22_t2_s4", label: "Solve: Largest Number (custom sort)" },
          { id: "d22_t2_s5", label: "Merge Sort and Quick Sort — know time/space complexity, stability" }
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
          { id: "d23_t1_s1", label: "Security filter chain architecture — SecurityFilterChain bean (replacing WebSecurityConfigurerAdapter)" },
          { id: "d23_t1_s2", label: "JWT structure: Header.Payload.Signature — token generation, validation, expiration" },
          { id: "d23_t1_s3", label: "JwtAuthenticationFilter (OncePerRequestFilter) — extract token, validate, set SecurityContext" },
          { id: "d23_t1_s4", label: "Refresh token strategy — short-lived access token + long-lived refresh token" },
          { id: "d23_t1_s5", label: "OAuth2/OpenID Connect basics — resource server, authorization server, PKCE flow" },
          { id: "d23_t1_s6", label: "@PreAuthorize, @PostAuthorize, @Secured — method-level security with SpEL expressions" },
          { id: "d23_t1_s7", label: "CORS configuration: @CrossOrigin, global CorsConfigurationSource bean" },
          { id: "d23_t1_s8", label: "PasswordEncoder: BCrypt (default), never store plain text passwords" }
        ]
      },
      {
        name: "DSA — Bit Manipulation & Math",
        category: "DSA",
        subtopics: [
          { id: "d23_t2_s1", label: "Bitwise operations: AND, OR, XOR, NOT, shifts — XOR tricks" },
          { id: "d23_t2_s2", label: "Solve: Single Number (XOR)" },
          { id: "d23_t2_s3", label: "Solve: Number of 1 Bits / Counting Bits" },
          { id: "d23_t2_s4", label: "Solve: Missing Number" },
          { id: "d23_t2_s5", label: "Solve: Pow(x, n) — fast exponentiation" }
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
          { id: "d24_t1_s1", label: "@SpringBootTest vs @WebMvcTest vs @DataJpaTest — full context vs slice tests (know the trade-offs)" },
          { id: "d24_t1_s2", label: "MockMvc — testing REST controllers without starting a server, verify status & body" },
          { id: "d24_t1_s3", label: "@MockBean — replace real beans with mocks in Spring context" },
          { id: "d24_t1_s4", label: "JUnit 5: @Test, @BeforeEach, @AfterEach, @ParameterizedTest with @ValueSource, @CsvSource" },
          { id: "d24_t1_s5", label: "Mockito: when/thenReturn, verify, ArgumentCaptor, @Spy for partial mocking" },
          { id: "d24_t1_s6", label: "TestContainers — spin up real Postgres/MySQL in Docker for integration tests" },
          { id: "d24_t1_s7", label: "Test naming: AAA pattern (Arrange-Act-Assert), test pyramid (unit > integration > E2E)" }
        ]
      },
      {
        name: "DSA — Matrix & 2D Problems",
        category: "DSA",
        subtopics: [
          { id: "d24_t2_s1", label: "Solve: Spiral Matrix" },
          { id: "d24_t2_s2", label: "Solve: Rotate Image (90° rotation in-place)" },
          { id: "d24_t2_s3", label: "Solve: Set Matrix Zeroes" },
          { id: "d24_t2_s4", label: "Solve: Search a 2D Matrix" },
          { id: "d24_t2_s5", label: "Solve: Game of Life" }
        ]
      }
    ]
  },
  {
    day: 25,
    phase: "Phase 3: Spring Boot",
    phaseRange: "Days 19–26",
    categories: ["Spring Boot", "DSA"],
    title: "Spring Boot — Actuator, Profiles & Configuration",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Spring Boot — Production Features",
        category: "Spring Boot",
        subtopics: [
          { id: "d25_t1_s1", label: "Actuator: /health, /metrics, /info, /beans — monitoring production apps" },
          { id: "d25_t1_s2", label: "Custom HealthIndicator — check downstream dependencies" },
          { id: "d25_t1_s3", label: "Micrometer metrics: Counter, Gauge, Timer — Prometheus + Grafana integration" },
          { id: "d25_t1_s4", label: "Profile-specific configs: application-{profile}.yml, spring.profiles.active" },
          { id: "d25_t1_s5", label: "@ConfigurationProperties — type-safe configuration binding with validation" },
          { id: "d25_t1_s6", label: "Externalized configuration hierarchy — CLI args > env vars > application.yml > defaults" },
          { id: "d25_t1_s7", label: "Spring Boot 3 updates — Jakarta namespace, native compilation with GraalVM, Micrometer Tracing" }
        ]
      },
      {
        name: "DSA — Design-based Problems",
        category: "DSA",
        subtopics: [
          { id: "d25_t2_s1", label: "Solve: LRU Cache (HashMap + Doubly Linked List)" },
          { id: "d25_t2_s2", label: "Solve: LFU Cache" },
          { id: "d25_t2_s3", label: "Solve: Design HashMap from scratch" },
          { id: "d25_t2_s4", label: "Solve: Insert Delete GetRandom O(1)" },
          { id: "d25_t2_s5", label: "Solve: Time Based Key-Value Store" }
        ]
      }
    ]
  },
  {
    day: 26,
    phase: "Phase 3: Spring Boot",
    phaseRange: "Days 19–26",
    categories: ["Spring Boot", "DSA"],
    title: "Phase 3 Review — Spring Boot Rapid-Fire & DP Practice",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Spring — Comprehensive Review",
        category: "Spring Boot",
        subtopics: [
          { id: "d26_t1_s1", label: "Explain: IoC, DI, Bean lifecycle, @Transactional pitfalls (self-invocation, checked exceptions)" },
          { id: "d26_t1_s2", label: "Explain: N+1 problem and 3 solutions (JOIN FETCH, @EntityGraph, @BatchSize)" },
          { id: "d26_t1_s3", label: "Explain: JWT auth flow end-to-end — login → token → filter → SecurityContext" },
          { id: "d26_t1_s4", label: "Explain: @WebMvcTest vs @SpringBootTest — when to use which test slice" },
          { id: "d26_t1_s5", label: "Explain: Spring Boot auto-configuration with @ConditionalOnClass, @ConditionalOnMissingBean" },
          { id: "d26_t1_s6", label: "Draw: Spring request lifecycle — DispatcherServlet → HandlerMapping → Controller → ViewResolver" }
        ]
      },
      {
        name: "DSA — DP & Backtracking Mixed",
        category: "DSA",
        subtopics: [
          { id: "d26_t2_s1", label: "Solve: Palindrome Partitioning" },
          { id: "d26_t2_s2", label: "Solve: Target Sum (DP)" },
          { id: "d26_t2_s3", label: "Solve: Decode Ways" },
          { id: "d26_t2_s4", label: "Solve: Generate Parentheses" },
          { id: "d26_t2_s5", label: "Timed: solve 2 medium DP problems in 40 minutes" }
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
          { id: "d27_t1_s1", label: "Monolith vs Microservices — trade-offs, when to decompose, domain-driven boundaries" },
          { id: "d27_t1_s2", label: "API Gateway — single entry point, routing, auth, rate limiting, SSL termination (Spring Cloud Gateway / AWS API GW)" },
          { id: "d27_t1_s3", label: "Service Discovery — Eureka (client-side), Consul; services register themselves, callers look up by name" },
          { id: "d27_t1_s4", label: "Circuit Breaker — Resilience4j: CLOSED → OPEN → HALF_OPEN states, prevents cascade failures" },
          { id: "d27_t1_s5", label: "Bulkhead — isolate failures with separate thread pools per downstream service" },
          { id: "d27_t1_s6", label: "Saga Pattern — choreography (events) vs orchestration; compensating transactions on failure" },
          { id: "d27_t1_s7", label: "Outbox Pattern — write to DB outbox in same transaction, publish to Kafka via CDC; avoids dual-write problem" }
        ]
      },
      {
        name: "DSA — Mixed Medium Practice",
        category: "DSA",
        subtopics: [
          { id: "d27_t2_s1", label: "Solve: Product of Array Except Self" },
          { id: "d27_t2_s2", label: "Solve: Longest Consecutive Sequence" },
          { id: "d27_t2_s3", label: "Solve: Subarray Sum Equals K" },
          { id: "d27_t2_s4", label: "Solve: Trapping Rain Water" },
          { id: "d27_t2_s5", label: "Solve: Longest Palindromic Substring" }
        ]
      }
    ]
  },
  {
    day: 28,
    phase: "Phase 4: Microservices",
    phaseRange: "Days 27–34",
    categories: ["System Design", "DSA"],
    title: "Microservices — Advanced Patterns & Event-Driven",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Microservices — Communication & Patterns",
        category: "System Design",
        subtopics: [
          { id: "d28_t1_s1", label: "CQRS — separate read/write models, denormalized read side optimized for queries" },
          { id: "d28_t1_s2", label: "Event Sourcing — store state as sequence of events, replay to rebuild; pairs well with CQRS" },
          { id: "d28_t1_s3", label: "Strangler Fig — gradually migrate monolith by intercepting calls and routing to new services" },
          { id: "d28_t1_s4", label: "Sidecar pattern — helper process alongside main container (e.g., Envoy proxy for service mesh)" },
          { id: "d28_t1_s5", label: "Sync: REST (WebClient preferred over RestTemplate) vs Async: Kafka, RabbitMQ, SQS" },
          { id: "d28_t1_s6", label: "gRPC — binary protocol with Protocol Buffers, faster than REST for internal service-to-service" },
          { id: "d28_t1_s7", label: "Distributed transactions — avoid 2PC; use Saga + idempotency keys + eventual consistency" }
        ]
      },
      {
        name: "DSA — Mixed Hard Practice",
        category: "DSA",
        subtopics: [
          { id: "d28_t2_s1", label: "Solve: Largest Rectangle in Histogram" },
          { id: "d28_t2_s2", label: "Solve: Maximal Rectangle" },
          { id: "d28_t2_s3", label: "Solve: Minimum Window Substring (revision)" },
          { id: "d28_t2_s4", label: "Solve: Basic Calculator" },
          { id: "d28_t2_s5", label: "Timed: solve 1 hard problem in 45 minutes" }
        ]
      }
    ]
  },
  {
    day: 29,
    phase: "Phase 4: Microservices",
    phaseRange: "Days 27–34",
    categories: ["System Design", "Spring Boot"],
    title: "Inter-Service Communication & Resilience4j",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Microservices — Resilience & Communication",
        category: "System Design",
        subtopics: [
          { id: "d29_t1_s1", label: "Resilience4j: @CircuitBreaker, @Retry, @RateLimiter, @TimeLimiter, @Bulkhead — configure each" },
          { id: "d29_t1_s2", label: "Retry pattern — max attempts, exponential backoff with jitter to avoid thundering herd" },
          { id: "d29_t1_s3", label: "Fallback strategies — default values, cached responses, degraded service mode" },
          { id: "d29_t1_s4", label: "WebClient with retry + timeout + circuit breaker — reactive HTTP client configuration" },
          { id: "d29_t1_s5", label: "Correlation IDs — propagate across services via MDC for debugging distributed requests" },
          { id: "d29_t1_s6", label: "Distributed tracing: Micrometer Tracing (Boot 3) / Sleuth (Boot 2), trace/span IDs, Zipkin/Jaeger" }
        ]
      },
      {
        name: "DSA — Revision: Trees & Graphs",
        category: "DSA",
        subtopics: [
          { id: "d29_t2_s1", label: "Revise: Binary Tree Maximum Path Sum" },
          { id: "d29_t2_s2", label: "Revise: Course Schedule (Topological Sort)" },
          { id: "d29_t2_s3", label: "Revise: Number of Islands" },
          { id: "d29_t2_s4", label: "Revise: Validate BST" },
          { id: "d29_t2_s5", label: "Timed: solve 2 medium tree/graph problems in 30 min" }
        ]
      }
    ]
  },
  {
    day: 30,
    phase: "Phase 4: Microservices",
    phaseRange: "Days 27–34",
    categories: ["System Design", "Spring Boot"],
    title: "Observability — Health Checks, Metrics & Logging",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Microservices — Observability Stack",
        category: "System Design",
        subtopics: [
          { id: "d30_t1_s1", label: "Health checks: Actuator /health, Kubernetes liveness/readiness probes — startup probe for slow apps" },
          { id: "d30_t1_s2", label: "Metrics: Micrometer with Prometheus + Grafana dashboards — custom counters, timers" },
          { id: "d30_t1_s3", label: "Centralized logging: ELK Stack (Elasticsearch, Logstash, Kibana) or AWS CloudWatch Logs" },
          { id: "d30_t1_s4", label: "Structured logging — JSON log format, correlation ID in every log entry" },
          { id: "d30_t1_s5", label: "Alerting: CloudWatch Alarms, PagerDuty integration — alert on latency, error rate" },
          { id: "d30_t1_s6", label: "Rate limiting: Token bucket, leaky bucket, Redis-based distributed rate limiting" }
        ]
      },
      {
        name: "DSA — Revision: DP & Greedy",
        category: "DSA",
        subtopics: [
          { id: "d30_t2_s1", label: "Revise: Coin Change, House Robber, LIS patterns" },
          { id: "d30_t2_s2", label: "Revise: LCS, Edit Distance, Unique Paths patterns" },
          { id: "d30_t2_s3", label: "Revise: Merge Intervals, Jump Game, Gas Station" },
          { id: "d30_t2_s4", label: "Solve: Best Time to Buy and Sell Stock with Cooldown" },
          { id: "d30_t2_s5", label: "Solve: Maximal Square" }
        ]
      }
    ]
  },
  {
    day: 31,
    phase: "Phase 4: Microservices",
    phaseRange: "Days 27–34",
    categories: ["DB/DevOps", "DSA"],
    title: "Docker — Containers, Compose & Dockerizing Spring Boot",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "DevOps — Docker",
        category: "DB/DevOps",
        subtopics: [
          { id: "d31_t1_s1", label: "Dockerfile instructions: FROM, COPY, RUN, CMD, ENTRYPOINT, EXPOSE — know the difference" },
          { id: "d31_t1_s2", label: "Multi-stage builds — reduce image from 800MB to 80MB by separating build and runtime stages" },
          { id: "d31_t1_s3", label: "docker-compose — multi-container local dev (app + Postgres + Redis + Kafka)" },
          { id: "d31_t1_s4", label: ".dockerignore, non-root user, minimal base images (alpine) — security best practices" },
          { id: "d31_t1_s5", label: "Dockerizing Spring Boot — jar packaging, JVM options, health check in Dockerfile" },
          { id: "d31_t1_s6", label: "Docker networking: bridge, host, overlay — container-to-container communication" }
        ]
      },
      {
        name: "DSA — Revision: Sliding Window & Two Pointers",
        category: "DSA",
        subtopics: [
          { id: "d31_t2_s1", label: "Solve: Minimum Size Subarray Sum" },
          { id: "d31_t2_s2", label: "Solve: Longest Substring Without Repeating (revision)" },
          { id: "d31_t2_s3", label: "Solve: 3Sum (revision)" },
          { id: "d31_t2_s4", label: "Solve: Container With Most Water (revision)" },
          { id: "d31_t2_s5", label: "Timed: solve 3 medium problems in 45 min" }
        ]
      }
    ]
  },
  {
    day: 32,
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
          { id: "d32_t1_s1", label: "K8s core: Pod, Deployment, Service, ConfigMap, Secret, Ingress — know what each does" },
          { id: "d32_t1_s2", label: "K8s patterns: sidecar, init containers, liveness/readiness probes, resource limits" },
          { id: "d32_t1_s3", label: "Helm charts — templating K8s manifests, chart structure, values.yaml overrides" },
          { id: "d32_t1_s4", label: "CI/CD: Jenkins pipelines, GitHub Actions — build → test → deploy stages" },
          { id: "d32_t1_s5", label: "Blue-Green vs Canary vs Rolling update — deployment strategies and trade-offs" },
          { id: "d32_t1_s6", label: "Container security: non-root user, read-only filesystem, image scanning (Trivy)" }
        ]
      },
      {
        name: "DSA — Revision: Binary Search & Heap",
        category: "DSA",
        subtopics: [
          { id: "d32_t2_s1", label: "Solve: Median of Two Sorted Arrays (hard)" },
          { id: "d32_t2_s2", label: "Solve: Capacity to Ship Packages (binary search on answer)" },
          { id: "d32_t2_s3", label: "Solve: Task Scheduler (heap + greedy)" },
          { id: "d32_t2_s4", label: "Solve: K Closest Points to Origin" },
          { id: "d32_t2_s5", label: "Timed: solve 2 problems in 30 min" }
        ]
      }
    ]
  },
  {
    day: 33,
    phase: "Phase 4: Microservices",
    phaseRange: "Days 27–34",
    categories: ["System Design", "DSA"],
    title: "Phase 4 Review & LLD — Design Patterns (Creational)",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "LLD — Creational Design Patterns",
        category: "System Design",
        subtopics: [
          { id: "d33_t1_s1", label: "Singleton — thread-safe: enum (best), double-checked locking with volatile, Bill Pugh holder" },
          { id: "d33_t1_s2", label: "Factory Method — subclasses decide which class to instantiate; Spring uses this for bean creation" },
          { id: "d33_t1_s3", label: "Abstract Factory — families of related objects (DB driver factories, UI kits)" },
          { id: "d33_t1_s4", label: "Builder — step-by-step complex construction; Lombok @Builder, StringBuilder; avoid telescoping constructors" },
          { id: "d33_t1_s5", label: "Prototype — clone objects; prefer copy constructor over Cloneable; Spring prototype scope" },
          { id: "d33_t1_s6", label: "When to use each creational pattern — decision matrix for interviews" }
        ]
      },
      {
        name: "DSA — Timed Interview Simulation",
        category: "DSA",
        subtopics: [
          { id: "d33_t2_s1", label: "Timed: solve 1 easy + 2 medium problems in 60 minutes" },
          { id: "d33_t2_s2", label: "Practice thinking aloud — explain approach before coding" },
          { id: "d33_t2_s3", label: "Practice edge cases: empty input, single element, large input" },
          { id: "d33_t2_s4", label: "Time/space complexity analysis after each solution" }
        ]
      }
    ]
  },
  {
    day: 34,
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
          { id: "d34_t1_s1", label: "Adapter — convert incompatible interfaces; wrapping legacy code" },
          { id: "d34_t1_s2", label: "Decorator — add behavior dynamically; Java I/O streams are a perfect example" },
          { id: "d34_t1_s3", label: "Proxy — Spring AOP uses this; @Transactional, @Cacheable create JDK/CGLIB proxies" },
          { id: "d34_t1_s4", label: "Observer — event-driven; Spring ApplicationEventPublisher, Kafka events" },
          { id: "d34_t1_s5", label: "Strategy — interchangeable algorithms; sort Comparators, payment processing strategies" },
          { id: "d34_t1_s6", label: "Template Method — algorithm skeleton; JdbcTemplate, RestTemplate follow this" },
          { id: "d34_t1_s7", label: "Command — encapsulate request as object; undo/redo, job queues" }
        ]
      },
      {
        name: "DSA — Hard Problem Practice",
        category: "DSA",
        subtopics: [
          { id: "d34_t2_s1", label: "Solve: Word Search II (Trie + Backtracking)" },
          { id: "d34_t2_s2", label: "Solve: Longest Valid Parentheses" },
          { id: "d34_t2_s3", label: "Solve: Regular Expression Matching (DP)" },
          { id: "d34_t2_s4", label: "Solve: Burst Balloons (interval DP)" }
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
          { id: "d35_t1_s1", label: "Topics, Partitions, Offsets — the fundamental unit of storage in Kafka" },
          { id: "d35_t1_s2", label: "Producer — key-based partitioning, round-robin, sticky partition strategy" },
          { id: "d35_t1_s3", label: "Consumer Groups — each partition consumed by exactly one consumer per group" },
          { id: "d35_t1_s4", label: "Broker, Leader/Follower replicas, ISR (In-Sync Replicas)" },
          { id: "d35_t1_s5", label: "ZooKeeper (legacy) vs KRaft (Kafka 3.x) — no ZooKeeper dependency in modern Kafka" },
          { id: "d35_t1_s6", label: "Log compaction — retain only latest value per key; useful for event sourcing & state snapshots" },
          { id: "d35_t1_s7", label: "Kafka Connect — source/sink connectors for CDC, database integration" }
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
        name: "Kafka — Error Handling & Delivery Guarantees",
        category: "System Design",
        subtopics: [
          { id: "d36_t1_s1", label: "Error handling: SeekToCurrentErrorHandler, DeadLetterPublishingRecoverer, @RetryableTopic" },
          { id: "d36_t1_s2", label: "Dead Letter Topic (DLT) — failed messages routed to <topic>.DLT after retry exhaustion" },
          { id: "d36_t1_s3", label: "Offset management — auto-commit vs manual commit (acknowledge()); trade-offs for data safety" },
          { id: "d36_t1_s4", label: "Delivery guarantees: at-most-once (fire-forget), at-least-once (acks=all + manual commit), exactly-once (EOS)" },
          { id: "d36_t1_s5", label: "Exactly-once semantics — idempotent producer (enable.idempotence=true) + transactional API + read_committed" },
          { id: "d36_t1_s6", label: "Schema Registry — Apache Avro + Confluent Schema Registry for schema evolution" },
          { id: "d36_t1_s7", label: "Embedded Kafka for testing — @EmbeddedKafka annotation in Spring Boot tests" }
        ]
      },
      {
        name: "Kafka — Interview Questions",
        category: "Spring Boot",
        subtopics: [
          { id: "d36_t2_s1", label: "Q: Explain at-most-once vs at-least-once vs exactly-once with real trade-offs" },
          { id: "d36_t2_s2", label: "Q: What is consumer lag? How to monitor with kafka-consumer-groups.sh / Burrow / Prometheus?" },
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
          { id: "d37_t1_s1", label: "Partition rebalancing — triggered when consumer joins/leaves; static membership reduces rebalancing in K8s" },
          { id: "d37_t1_s2", label: "Message ordering — guaranteed within a partition, NOT across partitions; use same key for ordered messages" },
          { id: "d37_t1_s3", label: "Compacted topics — only last value per key retained; tombstone = null value for deletion" },
          { id: "d37_t1_s4", label: "Kafka Transactions — atomic produce to multiple topics; transactional.id, begin/commit/abort" },
          { id: "d37_t1_s5", label: "Kafka Streams — stateless (map, filter) & stateful (aggregate, join, windowing: tumbling, hopping, session)" },
          { id: "d37_t1_s6", label: "State stores backed by RocksDB + changelog topic for fault tolerance" },
          { id: "d37_t1_s7", label: "MSK (AWS Managed Kafka) — auto-scaling storage, MSK Connect, MSK Serverless" }
        ]
      },
      {
        name: "DSA — Mixed Practice",
        category: "DSA",
        subtopics: [
          { id: "d37_t2_s1", label: "Solve: Alien Dictionary (topological sort)" },
          { id: "d37_t2_s2", label: "Solve: Swim in Rising Water (binary search + BFS)" },
          { id: "d37_t2_s3", label: "Solve: Critical Connections (bridges in graph)" },
          { id: "d37_t2_s4", label: "Solve: Encode and Decode Strings" }
        ]
      }
    ]
  },
  {
    day: 38,
    phase: "Phase 5: Apache Kafka",
    phaseRange: "Days 35–42",
    categories: ["System Design", "DSA"],
    title: "Kafka Interview Prep — Q&A Deep Dive",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Kafka — Interview Q&A",
        category: "System Design",
        subtopics: [
          { id: "d38_t1_s1", label: "Q: What happens when a consumer crashes? Heartbeat timeout → rebalance → partitions redistributed" },
          { id: "d38_t1_s2", label: "Q: How to handle poison pill messages? DLT + manual review + @RetryableTopic with max retries" },
          { id: "d38_t1_s3", label: "Q: How do you scale Kafka consumers? Add consumers to group (max = partition count)" },
          { id: "d38_t1_s4", label: "Q: Compare Kafka vs RabbitMQ vs SQS — when to use each (throughput, ordering, replay)" },
          { id: "d38_t1_s5", label: "Q: How to implement idempotent consumers? Deduplication key in DB, check before processing" },
          { id: "d38_t1_s6", label: "Q: Explain the Outbox Pattern — write event to outbox table in same TX, CDC/poll to publish" },
          { id: "d38_t1_s7", label: "Practice: draw Kafka architecture diagram — producers, brokers, partitions, consumers, ZK/KRaft" }
        ]
      },
      {
        name: "DSA — Timed Practice",
        category: "DSA",
        subtopics: [
          { id: "d38_t2_s1", label: "Timed: solve 1 easy + 2 medium in 60 minutes" },
          { id: "d38_t2_s2", label: "Solve: Random Pick with Weight" },
          { id: "d38_t2_s3", label: "Solve: Design Twitter (OOP + data structures)" },
          { id: "d38_t2_s4", label: "Solve: Flatten Nested List Iterator" }
        ]
      }
    ]
  },
  {
    day: 39,
    phase: "Phase 5: Apache Kafka",
    phaseRange: "Days 35–42",
    categories: ["System Design"],
    title: "Kafka Continued + Machine Coding Practice",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "LLD — Machine Coding + Kafka Review",
        category: "System Design",
        subtopics: [
          { id: "d39_t1_s1", label: "Machine coding approach — requirement gathering, class identification, SOLID principles" },
          { id: "d39_t1_s2", label: "Design a Parking Lot — vehicle types, floors, spots, allocation strategy, payment" },
          { id: "d39_t1_s3", label: "Design a Key-Value Store with TTL — put, get, delete with expiration" },
          { id: "d39_t1_s4", label: "Design Tic-Tac-Toe — board, players, extensible winning condition checker" },
          { id: "d39_t1_s5", label: "Review all Kafka topics — whiteboard producer → broker → consumer → DLT flow" },
          { id: "d39_t1_s6", label: "Explain Kafka Streams windowing: tumbling, hopping, session — with real use cases" }
        ]
      }
    ]
  },
  {
    day: 40,
    phase: "Phase 5: Apache Kafka",
    phaseRange: "Days 35–42",
    categories: ["System Design", "DSA"],
    title: "Machine Coding II + Mixed DSA Revision",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "LLD — Machine Coding Practice II",
        category: "System Design",
        subtopics: [
          { id: "d40_t1_s1", label: "Design BookMyShow — movie, theatre, screen, seat selection, concurrent booking" },
          { id: "d40_t1_s2", label: "Design Snake and Ladder — board, dice, players, game loop with proper OOP" },
          { id: "d40_t1_s3", label: "Design an Elevator System — multiple elevators, scheduling algorithm, direction optimization" },
          { id: "d40_t1_s4", label: "Code review your designs — validate SOLID principles, check for God classes" }
        ]
      },
      {
        name: "DSA — Mixed Revision",
        category: "DSA",
        subtopics: [
          { id: "d40_t2_s1", label: "Solve 2 random problems from your weak categories" },
          { id: "d40_t2_s2", label: "Revise: HashMap internals, LRU Cache implementation" },
          { id: "d40_t2_s3", label: "Revise: Backtracking template (subsets, permutations, combinations)" },
          { id: "d40_t2_s4", label: "Timed: solve 2 medium problems in 30 min" }
        ]
      }
    ]
  },
  {
    day: 41,
    phase: "Phase 5: Apache Kafka",
    phaseRange: "Days 35–42",
    categories: ["System Design", "DSA"],
    title: "Schema Design & DRY/KISS Principles",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "LLD — Schema Design & Principles",
        category: "System Design",
        subtopics: [
          { id: "d41_t1_s1", label: "DRY (Don't Repeat Yourself) — identify and eliminate code/logic duplication" },
          { id: "d41_t1_s2", label: "KISS (Keep It Simple) — avoid over-engineering, premature optimization" },
          { id: "d41_t1_s3", label: "YAGNI (You Ain't Gonna Need It) — build only what's needed now" },
          { id: "d41_t1_s4", label: "Database normalization: 1NF, 2NF, 3NF, BCNF — when to denormalize for performance" },
          { id: "d41_t1_s5", label: "ER diagram design exercise: e-commerce system (users, orders, products, payments)" },
          { id: "d41_t1_s6", label: "Schema design for social media: users, posts, comments, likes, followers" }
        ]
      },
      {
        name: "DSA — Mixed Hard Practice",
        category: "DSA",
        subtopics: [
          { id: "d41_t2_s1", label: "Solve: Wildcard Matching" },
          { id: "d41_t2_s2", label: "Solve: Recover Binary Search Tree" },
          { id: "d41_t2_s3", label: "Solve: Minimum Interval to Include Each Query" },
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
    title: "Phase 5 Review — Kafka + Patterns Consolidation",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Phase 5 — Comprehensive Review",
        category: "System Design",
        subtopics: [
          { id: "d42_t1_s1", label: "Whiteboard: Kafka architecture — topics, partitions, consumer groups, rebalancing, DLT" },
          { id: "d42_t1_s2", label: "Explain: delivery guarantees, exactly-once semantics, idempotent producer/consumer" },
          { id: "d42_t1_s3", label: "Explain: Saga pattern (choreography vs orchestration) with compensating transactions" },
          { id: "d42_t1_s4", label: "Explain: Circuit breaker states and when each transition occurs" },
          { id: "d42_t1_s5", label: "Rapid-fire: Design Patterns — name the pattern from a description (10 scenarios)" },
          { id: "d42_t1_s6", label: "Rapid-fire: Microservices patterns — API Gateway, Service Discovery, Outbox, CQRS, Event Sourcing" }
        ]
      },
      {
        name: "DSA — Full Mock Coding Round",
        category: "DSA",
        subtopics: [
          { id: "d42_t2_s1", label: "Mock: solve 2 medium + 1 hard in 90 minutes (simulate interview)" },
          { id: "d42_t2_s2", label: "Practice: think aloud, ask clarifying questions, discuss trade-offs" },
          { id: "d42_t2_s3", label: "Post-mock: identify weak patterns and plan revision" }
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
          { id: "d43_t1_s1", label: "Bucket policies vs IAM policies vs ACLs — when each applies" },
          { id: "d43_t1_s2", label: "Storage classes: Standard, Intelligent-Tiering, Standard-IA, Glacier Instant/Flexible/Deep Archive" },
          { id: "d43_t1_s3", label: "S3 lifecycle policies — transition rules (Standard → IA → Glacier), expiration rules" },
          { id: "d43_t1_s4", label: "Versioning, MFA Delete, Object Lock (WORM compliance for regulations)" },
          { id: "d43_t1_s5", label: "Encryption: SSE-S3 (AES-256), SSE-KMS (audit trail with CloudTrail), SSE-C (customer key)" },
          { id: "d43_t1_s6", label: "Multipart upload for files > 100MB — S3AsyncClient for large file handling" },
          { id: "d43_t1_s7", label: "S3 Event Notifications → Lambda/SQS/SNS triggers on object creation/deletion" },
          { id: "d43_t1_s8", label: "Presigned URLs — temporary access without AWS credentials, time-limited (max 7 days)" },
          { id: "d43_t1_s9", label: "S3 Transfer Acceleration via CloudFront edge locations for global upload speed" }
        ]
      }
    ]
  },
  {
    day: 44,
    phase: "Phase 6: AWS Deep Dive",
    phaseRange: "Days 43–50",
    categories: ["DB/DevOps"],
    title: "AWS S3 Q&A + S3 Access Points & Select",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "AWS — S3 Advanced & Interview Q&A",
        category: "DB/DevOps",
        subtopics: [
          { id: "d44_t1_s1", label: "Q: How to securely share S3 files externally? Presigned URLs, never make bucket public" },
          { id: "d44_t1_s2", label: "S3 Access Points — named network endpoints with individual policies for large-scale access" },
          { id: "d44_t1_s3", label: "S3 Select + Glacier Select — run SQL queries on objects without full download" },
          { id: "d44_t1_s4", label: "Cross-region replication — disaster recovery, compliance, lower latency reads" },
          { id: "d44_t1_s5", label: "S3 performance optimization — prefix partitioning, multipart uploads, byte-range fetches" },
          { id: "d44_t1_s6", label: "Cost optimization — lifecycle policies, Intelligent-Tiering, storage lens for usage analysis" }
        ]
      }
    ]
  },
  {
    day: 45,
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
          { id: "d45_t1_s1", label: "EC2 instance types: General Purpose (t3/m6), Compute (c6), Memory (r6), Storage (i3)" },
          { id: "d45_t1_s2", label: "EC2 pricing: On-Demand, Reserved (1yr/3yr), Spot (up to 90% cheaper, interruptible), Savings Plans" },
          { id: "d45_t1_s3", label: "Auto Scaling Groups — Target Tracking, Step, Scheduled scaling; health checks, warm pools" },
          { id: "d45_t1_s4", label: "ECS: Task Definitions, Services, Clusters — Fargate (serverless) vs EC2 launch type" },
          { id: "d45_t1_s5", label: "ECS Task Role vs Execution Role — critical distinction (app permissions vs pull-image permissions)" },
          { id: "d45_t1_s6", label: "AWS Lambda — cold start, warm start, concurrency limits, reserved/provisioned concurrency" },
          { id: "d45_t1_s7", label: "ALB vs NLB — L7 content-based routing vs L4 ultra-low latency; target groups, health checks" }
        ]
      }
    ]
  },
  {
    day: 46,
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
          { id: "d46_t1_s1", label: "CloudWatch Metrics — namespaces, dimensions, 1s vs 60s resolution, custom metrics via SDK" },
          { id: "d46_t1_s2", label: "CloudWatch Logs — log groups, log streams, Insights queries (SQL-like), metric filters" },
          { id: "d46_t1_s3", label: "CloudWatch Alarms — thresholds, anomaly detection, composite alarms for complex conditions" },
          { id: "d46_t1_s4", label: "AWS X-Ray — distributed tracing, trace map, segments/subsegments, sampling rules" },
          { id: "d46_t1_s5", label: "IAM — users, groups, roles, policies (identity-based vs resource-based); least privilege principle" },
          { id: "d46_t1_s6", label: "IAM best practices — no root user, MFA, credential rotation, cross-account roles with STS" },
          { id: "d46_t1_s7", label: "KMS — CMKs, key policies, envelope encryption; Secrets Manager vs Parameter Store trade-offs" },
          { id: "d46_t1_s8", label: "VPC — subnets (public/private), route tables, NAT Gateway, Security Groups vs NACLs" }
        ]
      }
    ]
  },
  {
    day: 47,
    phase: "Phase 6: AWS Deep Dive",
    phaseRange: "Days 43–50",
    categories: ["DB/DevOps", "DSA"],
    title: "Terraform — Infrastructure as Code Basics",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "DevOps — Terraform IaC",
        category: "DB/DevOps",
        subtopics: [
          { id: "d47_t1_s1", label: "HCL syntax: resource, data source, variable, output, local, module" },
          { id: "d47_t1_s2", label: "Terraform workflow: init → validate → plan → apply → destroy" },
          { id: "d47_t1_s3", label: "State management — local vs remote (S3 + DynamoDB lock), workspaces for environments" },
          { id: "d47_t1_s4", label: "Modules — reusable configurations, module sources (registry, git, local path)" },
          { id: "d47_t1_s5", label: "count vs for_each — prefer for_each for stable addressing and deletion handling" },
          { id: "d47_t1_s6", label: "Lifecycle rules: create_before_destroy, prevent_destroy, ignore_changes" },
          { id: "d47_t1_s7", label: "terraform import — bring existing resources under Terraform management" },
          { id: "d47_t1_s8", label: "Terragrunt — DRY Terraform for multi-environment setups" }
        ]
      },
      {
        name: "DSA — Revision Sprint",
        category: "DSA",
        subtopics: [
          { id: "d47_t2_s1", label: "Solve 3 random medium problems from your Backlog/Missed list" },
          { id: "d47_t2_s2", label: "Revise: LRU Cache, Trie, Union-Find implementations" },
          { id: "d47_t2_s3", label: "Timed: 2 medium problems in 30 minutes" }
        ]
      }
    ]
  },
  {
    day: 48,
    phase: "Phase 6: AWS Deep Dive",
    phaseRange: "Days 43–50",
    categories: ["DB/DevOps", "DSA"],
    title: "Terraform Practice + AWS Q&A Review",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "DevOps — Terraform Practice & AWS Review",
        category: "DB/DevOps",
        subtopics: [
          { id: "d48_t1_s1", label: "Write Terraform: EC2 instance + Security Group + IAM role (from PDF example)" },
          { id: "d48_t1_s2", label: "Write Terraform: S3 bucket with versioning, encryption, lifecycle policy" },
          { id: "d48_t1_s3", label: "Dynamic blocks — generate repeated nested blocks programmatically" },
          { id: "d48_t1_s4", label: "AWS review: explain S3 storage classes, EC2 pricing, ECS vs Lambda decision tree" },
          { id: "d48_t1_s5", label: "AWS review: explain VPC, Security Groups vs NACLs, IAM best practices" },
          { id: "d48_t1_s6", label: "AWS review: CloudWatch monitoring setup for a production Spring Boot microservice" }
        ]
      },
      {
        name: "DSA — Revision Sprint",
        category: "DSA",
        subtopics: [
          { id: "d48_t2_s1", label: "Solve: Kth Smallest in a Sorted Matrix" },
          { id: "d48_t2_s2", label: "Solve: Copy List with Random Pointer" },
          { id: "d48_t2_s3", label: "Solve: Add Two Numbers (Linked List)" },
          { id: "d48_t2_s4", label: "Solve: Rotate Array (3 approaches)" }
        ]
      }
    ]
  },
  {
    day: 49,
    phase: "Phase 6: AWS Deep Dive",
    phaseRange: "Days 43–50",
    categories: ["DB/DevOps", "DSA"],
    title: "Phase 6 Review — AWS Rapid-Fire + DSA Weak Areas",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "AWS — Comprehensive Review",
        category: "DB/DevOps",
        subtopics: [
          { id: "d49_t1_s1", label: "Rapid-fire: S3 storage classes, presigned URLs, encryption types" },
          { id: "d49_t1_s2", label: "Rapid-fire: EC2 vs ECS vs Lambda — decision tree for compute" },
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
    title: "AWS Final Day + DSA Timed Practice",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "AWS — Final Concepts",
        category: "DB/DevOps",
        subtopics: [
          { id: "d50_t1_s1", label: "RDS — managed databases, Multi-AZ for HA, read replicas for read scaling" },
          { id: "d50_t1_s2", label: "ElastiCache — Redis vs Memcached, cache-aside pattern, session storage" },
          { id: "d50_t1_s3", label: "SQS — Standard vs FIFO queues, visibility timeout, DLQ, long polling" },
          { id: "d50_t1_s4", label: "SNS — pub/sub, fan-out pattern with SQS, mobile push notifications" },
          { id: "d50_t1_s5", label: "AWS Well-Architected Framework — 6 pillars overview for interview conversations" }
        ]
      },
      {
        name: "DSA — Full Timed Practice",
        category: "DSA",
        subtopics: [
          { id: "d50_t2_s1", label: "Mock: solve 2 medium + 1 hard in 90 minutes" },
          { id: "d50_t2_s2", label: "Post-mock analysis: what patterns did you recognize quickly vs struggle with?" },
          { id: "d50_t2_s3", label: "Create a cheat sheet: top 15 DSA patterns with template code" }
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
          { id: "d51_t1_s3", label: "Subqueries — scalar, correlated, EXISTS vs IN (prefer EXISTS for correlated)" },
          { id: "d51_t1_s4", label: "CTEs (WITH clause) — recursive CTEs for hierarchical data (org charts, category trees)" },
          { id: "d51_t1_s5", label: "GROUP BY with HAVING vs WHERE — HAVING filters after aggregation, WHERE before" },
          { id: "d51_t1_s6", label: "CASE WHEN THEN ELSE END — conditional logic in queries" },
          { id: "d51_t1_s7", label: "Practice: write 5 complex queries (nth highest salary, consecutive days, top N per group)" }
        ]
      },
      {
        name: "DSA — String Advanced",
        category: "DSA",
        subtopics: [
          { id: "d51_t2_s1", label: "Solve: Longest Palindromic Substring" },
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
          { id: "d52_t1_s1", label: "OVER (PARTITION BY ... ORDER BY ...) — the window function syntax" },
          { id: "d52_t1_s2", label: "Ranking: ROW_NUMBER() vs RANK() vs DENSE_RANK() — know the differences with ties" },
          { id: "d52_t1_s3", label: "Analytic: LAG(), LEAD(), FIRST_VALUE(), LAST_VALUE() — previous/next row access" },
          { id: "d52_t1_s4", label: "Aggregate windows: SUM/AVG/COUNT with window frames (ROWS BETWEEN, RANGE BETWEEN)" },
          { id: "d52_t1_s5", label: "Write: 2nd highest salary per department using DENSE_RANK + subquery" },
          { id: "d52_t1_s6", label: "Write: running total using SUM() OVER (ORDER BY date)" },
          { id: "d52_t1_s7", label: "Write: previous row value using LAG() for comparison queries" }
        ]
      },
      {
        name: "DSA — Sorting & Searching Revision",
        category: "DSA",
        subtopics: [
          { id: "d52_t2_s1", label: "Solve: Merge Sort implementation (know time/space)" },
          { id: "d52_t2_s2", label: "Solve: Quick Sort (partition strategies, worst case)" },
          { id: "d52_t2_s3", label: "Solve: Search in Rotated Sorted Array (revision)" },
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
          { id: "d53_t1_s1", label: "Index types: B-tree (range queries), Hash (equality), Composite index column order (leftmost prefix rule)" },
          { id: "d53_t1_s2", label: "Clustered vs Non-clustered indexes — data order vs pointer to data" },
          { id: "d53_t1_s3", label: "EXPLAIN / EXPLAIN ANALYZE — reading query plans, spotting sequential scans" },
          { id: "d53_t1_s4", label: "ACID properties — Atomicity, Consistency, Isolation, Durability" },
          { id: "d53_t1_s5", label: "Isolation levels: Read Uncommitted → Read Committed → Repeatable Read → Serializable" },
          { id: "d53_t1_s6", label: "MVCC — how PostgreSQL implements concurrent reads without locking" },
          { id: "d53_t1_s7", label: "PostgreSQL specifics: JSONB, array types, pg_stat_activity, VACUUM, ANALYZE" }
        ]
      },
      {
        name: "DSA — Graph & Tree Final Revision",
        category: "DSA",
        subtopics: [
          { id: "d53_t2_s1", label: "Revise: Dijkstra's algorithm (PriorityQueue implementation)" },
          { id: "d53_t2_s2", label: "Revise: Topological Sort (BFS Kahn's + DFS)" },
          { id: "d53_t2_s3", label: "Solve: Word Search in Grid (backtracking)" },
          { id: "d53_t2_s4", label: "Solve: Surrounded Regions (BFS/DFS)" }
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
          { id: "d54_t1_s2", label: "MongoDB — collections, documents, BSON, aggregation pipeline, flexible schema" },
          { id: "d54_t1_s3", label: "DynamoDB — partition key, sort key, GSI, LSI, on-demand vs provisioned capacity" },
          { id: "d54_t1_s4", label: "SQL vs NoSQL decision — when to choose each; polyglot persistence strategy" },
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
    title: "System Design Fundamentals — Scalability & Caching",
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
          { id: "d55_t1_s6", label: "Load balancing — round-robin, least connections, consistent hashing (Redis Cluster, DynamoDB)" },
          { id: "d55_t1_s7", label: "Message queues vs event streaming — when to use SQS vs Kafka" },
          { id: "d55_t1_s8", label: "Consistent hashing — minimizes key redistribution when nodes added/removed" },
          { id: "d55_t1_s9", label: "Bloom filters — probabilistic set membership, no false negatives, space-efficient" }
        ]
      },
      {
        name: "DSA — DP Final Revision",
        category: "DSA",
        subtopics: [
          { id: "d55_t2_s1", label: "Revise: Coin Change, House Robber, LIS, LCS, Edit Distance, Knapsack" },
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
          { id: "d56_t1_s1", label: "Write: 2nd highest salary, running total, LAG comparison — without looking at notes" },
          { id: "d56_t1_s2", label: "Explain: B-tree index, composite index column order, EXPLAIN plan reading" },
          { id: "d56_t1_s3", label: "Explain: CAP theorem with examples (Zookeeper CP, Cassandra AP)" },
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
          { id: "d56_t2_s2", label: "Solve: Sudoku Solver" },
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
    title: "System Design Practice — URL Shortener, Chat, Notification System",
    estimatedTime: "4–5 hrs",
    topics: [
      {
        name: "HLD — Practice Problems (In Order of Interview Frequency)",
        category: "System Design",
        subtopics: [
          { id: "d57_t1_s1", label: "Design URL Shortener (TinyURL) — hashing, collision handling, redirect, analytics, DB choice" },
          { id: "d57_t1_s2", label: "Design Notification System — fan-out, push vs pull, priority queues, rate limiting, channels" },
          { id: "d57_t1_s3", label: "Design Chat Application — WebSocket, message ordering, presence detection, delivery receipts" },
          { id: "d57_t1_s4", label: "Design Rate Limiter — token bucket, Redis implementation, per-user/per-API/global limits" },
          { id: "d57_t1_s5", label: "Design Search Autocomplete — Trie, TypeAhead, ranking by frequency" },
          { id: "d57_t1_s6", label: "Framework: requirements → high-level architecture → deep dive → bottlenecks → scaling" },
          { id: "d57_t1_s7", label: "Practice: draw architecture diagrams with components, data flow, and scaling annotations" }
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
          { id: "d58_t1_s2", label: "Craft: 'Tell me about yourself' — 60-second elevator pitch: background → what you do → what you want" },
          { id: "d58_t1_s3", label: "Prepare: 'Tell me about a time you improved system performance' — with metrics and numbers" },
          { id: "d58_t1_s4", label: "Prepare: 'Describe a challenging technical problem you solved' — debugging narrative" },
          { id: "d58_t1_s5", label: "Prepare: 'How do you handle conflicting priorities?' — sprint planning, stakeholder communication" },
          { id: "d58_t1_s6", label: "Prepare: 'Tell me about a time you learned a new technology quickly'" }
        ]
      },
      {
        name: "Behavioral — Project Deep-Dive",
        category: "DB/DevOps",
        subtopics: [
          { id: "d58_t2_s1", label: "Document your project architecture — components, data flow, tech stack on a whiteboard" },
          { id: "d58_t2_s2", label: "Identify 3 key design decisions and justify trade-offs you made" },
          { id: "d58_t2_s3", label: "Prepare production outage story — root cause, detection, fix, prevention (with timeline)" },
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
    title: "Resume Polish, LinkedIn & Interview Logistics",
    estimatedTime: "3–4 hrs",
    topics: [
      {
        name: "Career — Resume & Online Presence",
        category: "System Design",
        subtopics: [
          { id: "d59_t1_s1", label: "Quantify every resume bullet — add volume: 'for 50K daily transactions' not just 'reduced time'" },
          { id: "d59_t1_s2", label: "Add Kafka section: 'Implemented event-driven architecture using Apache Kafka'" },
          { id: "d59_t1_s3", label: "Add Terraform: 'Provisioned AWS infrastructure using Terraform IaC modules'" },
          { id: "d59_t1_s4", label: "Update LinkedIn — mirror resume, add Skills section (Java, Spring, Kafka, AWS, Microservices)" },
          { id: "d59_t1_s5", label: "GitHub profile — push 2-3 Spring Boot + Kafka projects (microservices demo is ideal)" },
          { id: "d59_t1_s6", label: "Prepare questions to ask interviewers — team structure, tech stack, growth, on-call" }
        ]
      },
      {
        name: "Review — Weak Areas Consolidation",
        category: "DB/DevOps",
        subtopics: [
          { id: "d59_t2_s1", label: "Review all 'What I Missed' notes from 58 days — address every unresolved item" },
          { id: "d59_t2_s2", label: "Create cheat sheet: top 20 most-asked interview topics across all phases" },
          { id: "d59_t2_s3", label: "Practice explaining 5 key concepts aloud — verbal fluency is critical" },
          { id: "d59_t2_s4", label: "Solve 3 random problems from weak categories — no time limit, focus on understanding" }
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
          { id: "d60_t1_s3", label: "Practice edge cases and dry-run with examples" }
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
          { id: "d60_t3_s1", label: "Rapid-fire: 20 Java/Spring conceptual questions without pausing" },
          { id: "d60_t3_s2", label: "Explain: HashMap internals, N+1 problem, @Transactional pitfalls, JWT flow" },
          { id: "d60_t3_s3", label: "Explain: Kafka delivery guarantees, consumer lag, partition rebalancing" },
          { id: "d60_t3_s4", label: "Explain: Spring Boot auto-configuration, bean lifecycle, AOP proxies" }
        ]
      },
      {
        name: "🎉 Final Checklist",
        category: "Java",
        subtopics: [
          { id: "d60_t4_s1", label: "✅ Review overall progress — celebrate wins, acknowledge the grind" },
          { id: "d60_t4_s2", label: "✅ Resume finalized, LinkedIn updated, GitHub projects pushed" },
          { id: "d60_t4_s3", label: "✅ Prepare interview logistics: questions to ask, salary expectations, availability" },
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
