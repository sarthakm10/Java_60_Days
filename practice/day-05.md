Lambdas are just objects that implement a one-method interface. Today's code makes that click: you'll use the built-in interfaces, write your own, and rebuild a tiny version of the Stream API.

<!-- exercise: d5_e1 | Easy | Tour of the built-in functional interfaces -->
**Concepts:** `Predicate` · `Function` · `Supplier` · `Consumer` · `BiFunction` · `UnaryOperator` · `BinaryOperator` · default methods `and` / `negate` / `andThen` / `compose`

**Task.** Replace every placeholder lambda in the starter so the program prints the expected output. Each line uses a different interface. Notice which method you call on each one: `test`, `apply`, `get` or `accept`.

**Starter code** · `FunctionalBasics.java`

```java
import java.util.Comparator;
import java.util.List;
import java.util.function.BiFunction;
import java.util.function.BinaryOperator;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.function.UnaryOperator;

public class FunctionalBasics {
    public static void main(String[] args) {
        Predicate<Integer> isEven = n -> false;          // TODO
        Predicate<Integer> isPositive = n -> false;      // TODO
        Predicate<Integer> evenAndPositive = isEven;     // TODO: combine with and()
        System.out.println("Predicate: test(4)=" + evenAndPositive.test(4)
                + ", test(-4)=" + evenAndPositive.test(-4)
                + ", isEven.negate().test(3)=" + isEven.negate().test(3));

        Function<Integer, Integer> times2 = x -> x;      // TODO
        Function<Integer, Integer> plus3 = x -> x;       // TODO
        System.out.println("Function: andThen(2)=" + times2.andThen(plus3).apply(2)
                + ", compose(2)=" + times2.compose(plus3).apply(2));

        int[] counter = {0};                             // why an array? see the hints
        Supplier<String> greeter = () -> "";             // TODO: "Hello #1", then "Hello #2", ...
        System.out.println("Supplier: " + greeter.get() + ", " + greeter.get());

        Consumer<String> shout = s -> { };               // TODO: print "[HELLO]" (no newline)
        Consumer<String> length = s -> { };              // TODO: print " then length 5" (with newline)
        System.out.print("Consumer: ");
        shout.andThen(length).accept("hello");

        BiFunction<String, Integer, String> intro = (name, age) -> "";   // TODO
        System.out.println("BiFunction: " + intro.apply("Asha", 30));

        UnaryOperator<String> excite = s -> s;           // TODO
        System.out.println("UnaryOperator: " + excite.apply("java"));

        BinaryOperator<Integer> maxOp = (a, b) -> a;     // TODO: try BinaryOperator.maxBy(...)
        BinaryOperator<Integer> sumOp = (a, b) -> a;     // TODO: try a method reference
        List<Integer> nums = List.of(4, 9, 2);
        System.out.println("BinaryOperator: max=" + nums.stream().reduce(maxOp).get()
                + ", sum=" + nums.stream().reduce(0, sumOp));
    }
}
```

**Expected output**

```text
Predicate: test(4)=true, test(-4)=false, isEven.negate().test(3)=true
Function: andThen(2)=7, compose(2)=10
Supplier: Hello #1, Hello #2
Consumer: [HELLO] then length 5
BiFunction: Asha is 30
UnaryOperator: JAVA!
BinaryOperator: max=9, sum=15
```

<!-- hints -->
- `f.andThen(g)` means "f first, then g": (2·2)+3 = 7. `f.compose(g)` means "g first, then f": (2+3)·2 = 10.
- A lambda can only use local variables that are effectively final. `counter` itself never changes (it's the same array), but its contents can, which is why `++counter[0]` is allowed. An `AtomicInteger` works too.
- `UnaryOperator<T>` is a `Function<T, T>`, and `BinaryOperator<T>` is a `BiFunction<T, T, T>`. They're shortcuts for when the types are all the same.
- `BinaryOperator.maxBy(Comparator.naturalOrder())` and `Integer::sum` are ready-made operators.

<!-- solution -->
```java
import java.util.Comparator;
import java.util.List;
import java.util.function.BiFunction;
import java.util.function.BinaryOperator;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.function.UnaryOperator;

public class FunctionalBasics {
    public static void main(String[] args) {
        Predicate<Integer> isEven = n -> n % 2 == 0;                       // T -> boolean
        Predicate<Integer> isPositive = n -> n > 0;
        Predicate<Integer> evenAndPositive = isEven.and(isPositive);
        System.out.println("Predicate: test(4)=" + evenAndPositive.test(4)
                + ", test(-4)=" + evenAndPositive.test(-4)
                + ", isEven.negate().test(3)=" + isEven.negate().test(3));

        Function<Integer, Integer> times2 = x -> x * 2;                   // T -> R
        Function<Integer, Integer> plus3 = x -> x + 3;
        System.out.println("Function: andThen(2)=" + times2.andThen(plus3).apply(2)
                + ", compose(2)=" + times2.compose(plus3).apply(2));

        int[] counter = {0};
        Supplier<String> greeter = () -> "Hello #" + (++counter[0]);       // () -> T
        System.out.println("Supplier: " + greeter.get() + ", " + greeter.get());

        Consumer<String> shout = s -> System.out.print("[" + s.toUpperCase() + "]");   // T -> void
        Consumer<String> length = s -> System.out.println(" then length " + s.length());
        System.out.print("Consumer: ");
        shout.andThen(length).accept("hello");

        BiFunction<String, Integer, String> intro = (name, age) -> name + " is " + age;   // (T, U) -> R
        System.out.println("BiFunction: " + intro.apply("Asha", 30));

        UnaryOperator<String> excite = s -> s.toUpperCase() + "!";         // T -> T
        System.out.println("UnaryOperator: " + excite.apply("java"));

        BinaryOperator<Integer> maxOp = BinaryOperator.maxBy(Comparator.naturalOrder());   // (T, T) -> T
        BinaryOperator<Integer> sumOp = Integer::sum;
        List<Integer> nums = List.of(4, 9, 2);
        System.out.println("BinaryOperator: max=" + nums.stream().reduce(maxOp).get()
                + ", sum=" + nums.stream().reduce(0, sumOp));
    }
}
```

**Cheat sheet.** Predicate: `test` (filter). Function: `apply` (map). Supplier: `get` (lazy values, `orElseGet`). Consumer: `accept` (`forEach`). For primitives, prefer `IntPredicate`, `IntFunction`, `ToIntFunction` and friends, which avoid boxing.

<!-- exercise: d5_e2 | Medium | Replace a `switch` and helper methods with lambdas and method references -->
**Concepts:** custom `@FunctionalInterface` · `Map` of behaviours (strategy table) · static, bound, unbound and constructor method references

**Task.** The starter works, but it's written the old way. Refactor it:

1. Replace the `volume(l, w, h)` helper with your own `@FunctionalInterface TriFunction<A, B, C, R>` and a lambda.
2. Replace the `switch` in `calc` with a `Map<String, BinaryOperator<Integer>>`. Adding an operator should mean adding one map entry.
3. Rewrite each lambda in section 3 as a **method reference**, one of each kind.

The output must stay exactly the same.

**Starter code** · `MethodRefs.java`

```java
import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.function.Supplier;

public class MethodRefs {
    public static void main(String[] args) {
        // 1. TODO: replace with a TriFunction lambda
        System.out.println("volume = " + volume(2, 3, 4));

        // 2. TODO: replace calc's switch with a Map<String, BinaryOperator<Integer>>
        for (String expr : List.of("8 + 2", "8 - 2", "8 * 2", "8 max 2")) {
            String[] t = expr.split(" ");
            System.out.println(expr + " = " + calc(t[1], Integer.parseInt(t[0]), Integer.parseInt(t[2])));
        }

        // 3. TODO: turn each lambda into a method reference
        Function<String, Integer> parse = s -> Integer.parseInt(s);
        String prefix = "Mr. ";
        Function<String, String> greet = s -> prefix.concat(s);
        Function<String, String> upper = s -> s.toUpperCase();
        Supplier<List<String>> listMaker = () -> new ArrayList<>();
        Function<Integer, int[]> arrayMaker = n -> new int[n];

        List<String> names = listMaker.get();
        names.add(greet.apply("Sharma"));
        names.add(upper.apply("verma"));
        System.out.println("parsed + 1 = " + (parse.apply("41") + 1));
        System.out.println("names = " + names);
        System.out.println("array length = " + arrayMaker.apply(5).length);
    }

    static int volume(int l, int w, int h) { return l * w * h; }

    static int calc(String op, int a, int b) {
        switch (op) {
            case "+": return a + b;
            case "-": return a - b;
            case "*": return a * b;
            case "max": return Math.max(a, b);
            default: throw new IllegalArgumentException("unknown op " + op);
        }
    }
}
```

**Expected output**

```text
volume = 24
8 + 2 = 10
8 - 2 = 6
8 * 2 = 16
8 max 2 = 8
parsed + 1 = 42
names = [Mr. Sharma, VERMA]
array length = 5
```

<!-- hints -->
- `@FunctionalInterface interface TriFunction<A, B, C, R> { R apply(A a, B b, C c); }`. The annotation makes the compiler reject a second abstract method.
- Use a `LinkedHashMap` so the entries keep insertion order. `Integer::sum` and `Math::max` already have the shape `(int, int) -> int`.
- Static: `Integer::parseInt`. Bound (one specific object): `prefix::concat`. Unbound (the first argument becomes the target): `String::toUpperCase`. Constructor: `ArrayList::new`, `int[]::new`.
- Subtraction has no ready-made method, so a lambda `(a, b) -> a - b` is fine there.

<!-- solution -->
```java
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Supplier;

public class MethodRefs {
    @FunctionalInterface
    interface TriFunction<A, B, C, R> {
        R apply(A a, B b, C c);                       // exactly one abstract method
    }

    private static final Map<String, BinaryOperator<Integer>> OPS = new LinkedHashMap<>();
    static {
        OPS.put("+", Integer::sum);
        OPS.put("-", (a, b) -> a - b);
        OPS.put("*", (a, b) -> a * b);
        OPS.put("max", Math::max);                    // a new operator = a new entry, no switch to edit
    }

    public static void main(String[] args) {
        TriFunction<Integer, Integer, Integer, Integer> volume = (l, w, h) -> l * w * h;
        System.out.println("volume = " + volume.apply(2, 3, 4));

        for (String expr : List.of("8 + 2", "8 - 2", "8 * 2", "8 max 2")) {
            String[] t = expr.split(" ");
            BinaryOperator<Integer> op = OPS.get(t[1]);
            if (op == null) throw new IllegalArgumentException("unknown op " + t[1]);
            System.out.println(expr + " = " + op.apply(Integer.parseInt(t[0]), Integer.parseInt(t[2])));
        }

        Function<String, Integer> parse = Integer::parseInt;        // static method
        String prefix = "Mr. ";
        Function<String, String> greet = prefix::concat;            // bound: always calls prefix.concat(x)
        Function<String, String> upper = String::toUpperCase;       // unbound: calls x.toUpperCase()
        Supplier<List<String>> listMaker = ArrayList::new;          // constructor
        Function<Integer, int[]> arrayMaker = int[]::new;           // array constructor

        List<String> names = listMaker.get();
        names.add(greet.apply("Sharma"));
        names.add(upper.apply("verma"));
        System.out.println("parsed + 1 = " + (parse.apply("41") + 1));
        System.out.println("names = " + names);
        System.out.println("array length = " + arrayMaker.apply(5).length);
    }
}
```

**Design note.** The operator map is the Strategy pattern without any classes, and it's Open/Closed (Day 10): new behaviour is added by registration, not by editing a `switch`. Spring does the same thing when it injects a `Map<String, PaymentHandler>` of all beans.

<!-- exercise: d5_e3 | Medium | Build your own mini Stream API -->
**Concepts:** generic methods taking functional interfaces · `Predicate<? super T>` / `Function<? super T, ? extends R>` · `BiConsumer` · effectively-final rule · `Comparator.comparing().thenComparing()`

**Task.** Without using `java.util.stream`, write these generic static methods and make `main` print the expected output:

- `filter(list, predicate)`, `map(list, function)`, `reduce(list, identity, binaryOperator)`
- `count(list, predicate)` and `forEachIndexed(list, (index, item) -> ...)`

Then uncomment `minLength++` once, read the compiler error, and comment it out again.

**Starter code** · `MiniStreams.java`

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.function.BiConsumer;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Predicate;

public class MiniStreams {
    public static void main(String[] args) {
        List<String> words = List.of("lambda", "java", "stream", "api", "functional", "code");
        System.out.println("long words: " + filter(words, w -> w.length() > 4));
        System.out.println("lengths: " + map(words, String::length));
        System.out.println("total letters: " + reduce(map(words, String::length), 0, Integer::sum));
        System.out.println("first letters of words with 'a': " + map(filter(words, w -> w.contains("a")), w -> w.charAt(0)));

        List<String> sorted = new ArrayList<>(words);
        sorted.sort(Comparator.comparing(String::length).thenComparing(Function.identity()));
        System.out.println("by length then alphabet: " + sorted);

        int minLength = 5;
        // minLength++;   // uncomment once and read the compiler error
        System.out.println("words with >= 5 letters: " + count(words, w -> w.length() >= minLength));
        forEachIndexed(filter(words, w -> w.length() <= 4), (i, w) -> System.out.println(i + ": " + w));
    }

    static <T> List<T> filter(List<T> list, Predicate<? super T> keep) { return new ArrayList<>(); }            // TODO
    static <T, R> List<R> map(List<T> list, Function<? super T, ? extends R> fn) { return new ArrayList<>(); }  // TODO
    static <T> T reduce(List<T> list, T identity, BinaryOperator<T> op) { return identity; }                   // TODO
    static <T> long count(List<T> list, Predicate<? super T> test) { return 0; }                               // TODO
    static <T> void forEachIndexed(List<T> list, BiConsumer<Integer, ? super T> action) { }                    // TODO
}
```

**Expected output**

```text
long words: [lambda, stream, functional]
lengths: [6, 4, 6, 3, 10, 4]
total letters: 33
first letters of words with 'a': [l, j, s, a, f]
by length then alphabet: [api, code, java, lambda, stream, functional]
words with >= 5 letters: 3
0: java
1: api
2: code
```

<!-- hints -->
- Each method is a plain loop. For example, `filter` loops, calls `keep.test(item)` and adds matches to a new list.
- `reduce`: start `result = identity`, then `result = op.apply(result, item)` for each item.
- `Predicate<? super T>` lets you pass a `Predicate<Object>` to filter a `List<String>`. It's the PECS rule from Day 4 applied to functions.
- The compiler error says *"local variables referenced from a lambda expression must be final or effectively final"*. The lambda captures the **value** of `minLength`, so Java forbids changing it afterwards.

<!-- solution -->
```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.function.BiConsumer;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Predicate;

public class MiniStreams {
    public static void main(String[] args) {
        List<String> words = List.of("lambda", "java", "stream", "api", "functional", "code");
        System.out.println("long words: " + filter(words, w -> w.length() > 4));
        System.out.println("lengths: " + map(words, String::length));
        System.out.println("total letters: " + reduce(map(words, String::length), 0, Integer::sum));
        System.out.println("first letters of words with 'a': " + map(filter(words, w -> w.contains("a")), w -> w.charAt(0)));

        List<String> sorted = new ArrayList<>(words);
        sorted.sort(Comparator.comparing(String::length).thenComparing(Function.identity()));
        System.out.println("by length then alphabet: " + sorted);

        int minLength = 5;
        // minLength++;   // error: local variables referenced from a lambda expression must be final or effectively final
        System.out.println("words with >= 5 letters: " + count(words, w -> w.length() >= minLength));
        forEachIndexed(filter(words, w -> w.length() <= 4), (i, w) -> System.out.println(i + ": " + w));
    }

    static <T> List<T> filter(List<T> list, Predicate<? super T> keep) {
        List<T> out = new ArrayList<>();
        for (T item : list) {
            if (keep.test(item)) out.add(item);
        }
        return out;
    }

    static <T, R> List<R> map(List<T> list, Function<? super T, ? extends R> fn) {
        List<R> out = new ArrayList<>(list.size());
        for (T item : list) out.add(fn.apply(item));
        return out;
    }

    static <T> T reduce(List<T> list, T identity, BinaryOperator<T> op) {
        T result = identity;
        for (T item : list) result = op.apply(result, item);
        return result;
    }

    static <T> long count(List<T> list, Predicate<? super T> test) {
        long n = 0;
        for (T item : list) {
            if (test.test(item)) n++;
        }
        return n;
    }

    static <T> void forEachIndexed(List<T> list, BiConsumer<Integer, ? super T> action) {
        for (int i = 0; i < list.size(); i++) action.accept(i, list.get(i));
    }
}
```

**Connect it to tomorrow.** Your `filter` and `map` are *eager*: each one builds a full list right away. Real streams are *lazy*. Nothing runs until a terminal operation, and each element flows through the whole pipeline one at a time. You'll see that with `peek` on Day 6.
