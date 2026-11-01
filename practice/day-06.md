Streams are the most-tested Java 8 topic in coding rounds. These three programs cover the operations you'll actually be asked to write, from `filter` and `map` all the way to `groupingBy`.

<!-- exercise: d6_e1 | Easy | Stream basics and seeing laziness with `peek` -->
**Concepts:** source → intermediate → terminal · `filter` / `map` / `distinct` / `sorted` / `skip` / `limit` · `reduce` · `anyMatch` / `allMatch` / `noneMatch` · `IntStream` · laziness · single-use streams

**Task.** Fill in each `TODO` with **one stream pipeline**. Then run the laziness section and explain why `dddd` and `eeeee` are never printed.

**Starter code** · `StreamBasics.java`

```java
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StreamBasics {
    public static void main(String[] args) {
        List<Integer> nums = List.of(5, 3, 8, 3, 10, 1, 8, 6);

        System.out.println("even squares: " + List.of());          // TODO: [64, 100, 64, 36]
        System.out.println("distinct sorted: " + List.of());       // TODO
        System.out.println("sum with reduce: " + 0);               // TODO: reduce(identity, accumulator)
        System.out.println("max: " + 0);                           // TODO: max(...) returns an Optional
        System.out.println("count > 4: " + 0);                     // TODO
        System.out.println("joined: " + "");                       // TODO: Collectors.joining(", ", "[", "]") on distinct values
        System.out.println("sorted, skip 2, limit 3: " + List.of()); // TODO
        System.out.println("any > 9: " + false + ", all > 0: " + false + ", none < 0: " + false); // TODO
        System.out.println("1..5 sum: " + 0 + ", average: " + 0.0); // TODO: IntStream.rangeClosed, mapToInt(...).average()

        System.out.println("-- laziness --");
        Stream.of("a", "bb", "ccc", "dddd", "eeeee")
                .peek(s -> System.out.println("filter sees " + s))
                .filter(s -> s.length() >= 2)
                .peek(s -> System.out.println("  map sees " + s))
                .map(String::toUpperCase)
                .limit(2)
                .forEach(s -> System.out.println("    got " + s));

        Stream<Integer> once = nums.stream();
        once.count();
        try {
            once.count();
        } catch (IllegalStateException e) {
            System.out.println("reuse: " + e.getMessage());
        }
    }
}
```

**Expected output**

```text
even squares: [64, 100, 64, 36]
distinct sorted: [1, 3, 5, 6, 8, 10]
sum with reduce: 44
max: 10
count > 4: 5
joined: [5, 3, 8, 10, 1, 6]
sorted, skip 2, limit 3: [3, 5, 6]
any > 9: true, all > 0: true, none < 0: true
1..5 sum: 15, average: 5.5
-- laziness --
filter sees a
filter sees bb
  map sees bb
    got BB
filter sees ccc
  map sees ccc
    got CCC
reuse: stream has already been operated upon or closed
```

<!-- hints -->
- `nums.stream().filter(n -> n % 2 == 0).map(n -> n * n).toList()`. `toList()` is Java 16+; older code uses `collect(Collectors.toList())`.
- `reduce(0, Integer::sum)` returns an `Integer`. `max(Integer::compare)` returns `Optional<Integer>`, so call `.get()` or `.orElseThrow()`.
- `distinct()` keeps the **first** occurrence order, so the joined string isn't sorted.
- Streams are pulled one element at a time by the terminal operation. `limit(2)` short-circuits, so after two results the source stops producing.

<!-- solution -->
```java
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StreamBasics {
    public static void main(String[] args) {
        List<Integer> nums = List.of(5, 3, 8, 3, 10, 1, 8, 6);

        System.out.println("even squares: " + nums.stream().filter(n -> n % 2 == 0).map(n -> n * n).toList());
        System.out.println("distinct sorted: " + nums.stream().distinct().sorted().toList());
        System.out.println("sum with reduce: " + nums.stream().reduce(0, Integer::sum));
        System.out.println("max: " + nums.stream().max(Integer::compare).orElseThrow());
        System.out.println("count > 4: " + nums.stream().filter(n -> n > 4).count());
        System.out.println("joined: " + nums.stream().distinct().map(String::valueOf)
                .collect(Collectors.joining(", ", "[", "]")));
        System.out.println("sorted, skip 2, limit 3: " + nums.stream().sorted().skip(2).limit(3).toList());
        System.out.println("any > 9: " + nums.stream().anyMatch(n -> n > 9)
                + ", all > 0: " + nums.stream().allMatch(n -> n > 0)
                + ", none < 0: " + nums.stream().noneMatch(n -> n < 0));
        System.out.println("1..5 sum: " + IntStream.rangeClosed(1, 5).sum()
                + ", average: " + nums.stream().mapToInt(Integer::intValue).average().orElse(0));

        System.out.println("-- laziness --");
        Stream.of("a", "bb", "ccc", "dddd", "eeeee")
                .peek(s -> System.out.println("filter sees " + s))
                .filter(s -> s.length() >= 2)
                .peek(s -> System.out.println("  map sees " + s))
                .map(String::toUpperCase)
                .limit(2)                                  // after 2 results the pipeline stops pulling
                .forEach(s -> System.out.println("    got " + s));

        Stream<Integer> once = nums.stream();
        once.count();
        try {
            once.count();                                  // a stream is single-use
        } catch (IllegalStateException e) {
            System.out.println("reuse: " + e.getMessage());
        }
    }
}
```

**What the laziness output shows.** Elements go through the pipeline one at a time (*vertical* processing), not stage by stage. That's why `filter` + `findFirst` on a million elements can stop after the first match. Use `peek` only for debugging; never use it for real side effects.

<!-- exercise: d6_e2 | Medium | Employee analytics with `groupingBy` and `partitioningBy` -->
**Concepts:** `groupingBy` with downstream collectors (`counting`, `averagingInt`, `mapping`, `joining`, `maxBy`, `collectingAndThen`) · `partitioningBy` · `TreeMap::new` for sorted output · `mapToInt().sum()`

**Task.** Answer each question with one stream expression. These are the exact queries asked in Java 8 interview rounds. Use `TreeMap::new` as the map factory so the departments print in alphabetical order.

1. Employee count per department
2. Average salary per department (printed with no decimals)
3. Name of the top earner in each department
4. Names per department, comma-separated
5. Names partitioned by salary > 70,000
6. The second-highest-paid employee
7. Total payroll

**Starter code** · `EmployeeStats.java`

```java
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class EmployeeStats {
    public static void main(String[] args) {
        List<Emp> emps = List.of(
                new Emp("Asha", "Engineering", 120000), new Emp("Ravi", "Engineering", 95000),
                new Emp("Neha", "Sales", 60000), new Emp("Kabir", "Sales", 72000),
                new Emp("Meera", "HR", 55000), new Emp("Arjun", "Engineering", 150000),
                new Emp("Zoya", "HR", 48000));

        Map<String, Long> countByDept = new TreeMap<>();               // TODO 1
        System.out.println("count: " + countByDept);

        Map<String, Double> avgByDept = new TreeMap<>();               // TODO 2
        avgByDept.forEach((dept, avg) -> System.out.printf("avg %s: %.0f%n", dept, avg));

        Map<String, String> topByDept = new TreeMap<>();               // TODO 3
        System.out.println("top earner: " + topByDept);

        Map<String, String> namesByDept = new TreeMap<>();             // TODO 4
        System.out.println("names: " + namesByDept);

        Map<Boolean, List<String>> above70k = Map.of();                 // TODO 5
        System.out.println("salary > 70k: " + above70k);

        Emp second = emps.get(0);                                       // TODO 6
        System.out.println("2nd highest: " + second.getName() + " (" + second.getSalary() + ")");

        int payroll = 0;                                                // TODO 7
        System.out.println("payroll: " + payroll);
    }
}

class Emp {
    private final String name, dept;
    private final int salary;

    Emp(String name, String dept, int salary) { this.name = name; this.dept = dept; this.salary = salary; }

    String getName() { return name; }
    String getDept() { return dept; }
    int getSalary() { return salary; }
}
```

**Expected output**

```text
count: {Engineering=3, HR=2, Sales=2}
avg Engineering: 121667
avg HR: 51500
avg Sales: 66000
top earner: {Engineering=Arjun, HR=Meera, Sales=Kabir}
names: {Engineering=Asha, Ravi, Arjun, HR=Meera, Zoya, Sales=Neha, Kabir}
salary > 70k: {false=[Neha, Meera, Zoya], true=[Asha, Ravi, Kabir, Arjun]}
2nd highest: Asha (120000)
payroll: 600000
```

<!-- hints -->
- The three-argument form is `groupingBy(classifier, mapFactory, downstream)`, for example `groupingBy(Emp::getDept, TreeMap::new, Collectors.counting())`.
- `maxBy` gives an `Optional<Emp>`. Wrap it: `collectingAndThen(maxBy(comparingInt(Emp::getSalary)), o -> o.get().getName())`.
- `mapping(Emp::getName, joining(", "))` transforms each element **before** collecting it.
- 2nd highest: `sorted(comparingInt(Emp::getSalary).reversed()).skip(1).findFirst()`. Ask in the interview whether duplicate salaries count as one.

<!-- solution -->
```java
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class EmployeeStats {
    public static void main(String[] args) {
        List<Emp> emps = List.of(
                new Emp("Asha", "Engineering", 120000), new Emp("Ravi", "Engineering", 95000),
                new Emp("Neha", "Sales", 60000), new Emp("Kabir", "Sales", 72000),
                new Emp("Meera", "HR", 55000), new Emp("Arjun", "Engineering", 150000),
                new Emp("Zoya", "HR", 48000));

        Map<String, Long> countByDept = emps.stream()
                .collect(Collectors.groupingBy(Emp::getDept, TreeMap::new, Collectors.counting()));
        System.out.println("count: " + countByDept);

        Map<String, Double> avgByDept = emps.stream()
                .collect(Collectors.groupingBy(Emp::getDept, TreeMap::new, Collectors.averagingInt(Emp::getSalary)));
        avgByDept.forEach((dept, avg) -> System.out.printf("avg %s: %.0f%n", dept, avg));

        Map<String, String> topByDept = emps.stream()
                .collect(Collectors.groupingBy(Emp::getDept, TreeMap::new,
                        Collectors.collectingAndThen(
                                Collectors.maxBy(Comparator.comparingInt(Emp::getSalary)),
                                top -> top.get().getName())));
        System.out.println("top earner: " + topByDept);

        Map<String, String> namesByDept = emps.stream()
                .collect(Collectors.groupingBy(Emp::getDept, TreeMap::new,
                        Collectors.mapping(Emp::getName, Collectors.joining(", "))));
        System.out.println("names: " + namesByDept);

        Map<Boolean, List<String>> above70k = emps.stream()
                .collect(Collectors.partitioningBy(e -> e.getSalary() > 70000,
                        Collectors.mapping(Emp::getName, Collectors.toList())));
        System.out.println("salary > 70k: " + above70k);         // always has both keys: false and true

        Emp second = emps.stream()
                .sorted(Comparator.comparingInt(Emp::getSalary).reversed())
                .skip(1)
                .findFirst()
                .orElseThrow();
        System.out.println("2nd highest: " + second.getName() + " (" + second.getSalary() + ")");

        int payroll = emps.stream().mapToInt(Emp::getSalary).sum();   // IntStream: no boxing
        System.out.println("payroll: " + payroll);
    }
}

class Emp {
    private final String name, dept;
    private final int salary;

    Emp(String name, String dept, int salary) { this.name = name; this.dept = dept; this.salary = salary; }

    String getName() { return name; }
    String getDept() { return dept; }
    int getSalary() { return salary; }
}
```

**`groupingBy` or `partitioningBy`?** `partitioningBy` always returns both `true` and `false` keys, even when one list is empty. `groupingBy` only has keys that actually occur. A plain `groupingBy` uses a `HashMap`, so its print order isn't guaranteed. Pass `TreeMap::new` when order matters.

<!-- exercise: d6_e3 | Medium | Word frequency and top-K with `flatMap` -->
**Concepts:** `flatMap` (one-to-many) · `Function.identity()` · `groupingBy(..., counting())` · sorting map entries · `Map.Entry.comparingByValue()` · `toCollection(TreeSet::new)`

**Task.** From three lines of text (lower-cased, split on non-word characters), compute:

1. The number of distinct words
2. The **top 3** words by frequency, ties broken alphabetically. This is a classic interview question.
3. The longest word
4. Words grouped by first letter, each group sorted (`TreeMap` of `TreeSet`)
5. The distinct items across nested shopping carts (`List<List<String>>`), sorted

**Starter code** · `WordFrequency.java`

```java
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.function.Function;
import java.util.stream.Collectors;

public class WordFrequency {
    public static void main(String[] args) {
        List<String> lines = List.of(
                "Java streams make Java code short",
                "streams are lazy and streams are composable",
                "Short code is not always clear code");

        List<String> words = List.of();                 // TODO: flatMap lines -> lower-case words
        Map<String, Long> freq = Map.of();              // TODO: word -> count

        System.out.println("distinct words: " + freq.size());
        System.out.println("top 3: " + "");             // TODO: "code=3, streams=3, are=2"
        System.out.println("longest: " + "");           // TODO
        System.out.println("by first letter: " + Map.of());   // TODO: TreeMap<Character, TreeSet<String>>

        List<List<String>> carts = List.of(List.of("pen", "book"), List.of("book", "bag"), List.of("pen", "laptop"));
        System.out.println("distinct cart items: " + List.of());   // TODO: flatMap(List::stream)
    }
}
```

**Expected output**

```text
distinct words: 13
top 3: code=3, streams=3, are=2
longest: composable
by first letter: {a=[always, and, are], c=[clear, code, composable], i=[is], j=[java], l=[lazy], m=[make], n=[not], s=[short, streams]}
distinct cart items: [bag, book, laptop, pen]
```

<!-- hints -->
- `lines.stream().flatMap(line -> Arrays.stream(line.toLowerCase().split("\\W+")))` turns a stream of lines into a stream of words. `map` would give you a stream of arrays instead.
- Frequency: `collect(groupingBy(Function.identity(), counting()))`.
- Sort entries with `Map.Entry.<String, Long>comparingByValue().reversed().thenComparing(Map.Entry.comparingByKey())`. The explicit `<String, Long>` helps type inference.
- Grouping into sorted sets: `groupingBy(w -> w.charAt(0), TreeMap::new, toCollection(TreeSet::new))`.

<!-- solution -->
```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.function.Function;
import java.util.stream.Collectors;

public class WordFrequency {
    public static void main(String[] args) {
        List<String> lines = List.of(
                "Java streams make Java code short",
                "streams are lazy and streams are composable",
                "Short code is not always clear code");

        List<String> words = lines.stream()
                .flatMap(line -> Arrays.stream(line.toLowerCase().split("\\W+")))   // one line -> many words
                .filter(w -> !w.isBlank())
                .toList();
        Map<String, Long> freq = words.stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        System.out.println("distinct words: " + freq.size());

        String top3 = freq.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed()
                        .thenComparing(Map.Entry.comparingByKey()))
                .limit(3)
                .map(e -> e.getKey() + "=" + e.getValue())
                .collect(Collectors.joining(", "));
        System.out.println("top 3: " + top3);

        String longest = words.stream().max(Comparator.comparingInt(String::length)).orElse("");
        System.out.println("longest: " + longest);

        Map<Character, TreeSet<String>> byLetter = words.stream()
                .collect(Collectors.groupingBy(w -> w.charAt(0), TreeMap::new,
                        Collectors.toCollection(TreeSet::new)));     // TreeSet removes duplicates and sorts
        System.out.println("by first letter: " + byLetter);

        List<List<String>> carts = List.of(List.of("pen", "book"), List.of("book", "bag"), List.of("pen", "laptop"));
        System.out.println("distinct cart items: " + carts.stream()
                .flatMap(List::stream)                                // List<List<T>> -> Stream<T>
                .distinct()
                .sorted()
                .toList());
    }
}
```

**Complexity and follow-up.** Counting is O(n). Sorting all distinct words is O(d log d). For top-K on huge inputs, keep a min-heap of size K instead, which is O(d log K). That's the `PriorityQueue` pattern from the DSA side of this plan.
