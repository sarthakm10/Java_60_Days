Today's code is about classes that protect themselves: immutable objects, enums that carry behaviour, and sort orders you can compose.

<!-- exercise: d3_e1 | Medium | Immutable `Employee` with a Builder -->
**Concepts:** immutable class (`final` class + `final` fields) · defensive copies · static nested class (Builder) · "wither" methods

**Task.** Make `Employee` truly immutable:

- `final` class with `private final` fields `name`, `id`, `salary` and `List<String> skills`. No setters.
- It is created only through a **static nested** `Employee.Builder`. `build()` throws `IllegalStateException("name is required")` for a blank name.
- Changing the list you passed into the builder later must **not** affect the employee, and `getSkills().add(...)` must throw.
- `withSalary(double)` returns a **new** `Employee` and leaves the original unchanged.

**Starter code** · `ImmutableDemo.java`

```java
import java.util.ArrayList;
import java.util.List;

public class ImmutableDemo {
    public static void main(String[] args) {
        List<String> skills = new ArrayList<>(List.of("Java", "Spring"));
        Employee e = new Employee.Builder("Asha", 101).salary(90000).skills(skills).build();
        skills.add("Hacking");                         // the caller changes its own list afterwards
        System.out.println(e);
        try {
            e.getSkills().add("Kafka");
        } catch (UnsupportedOperationException ex) {
            System.out.println("Cannot modify skills: " + ex.getClass().getSimpleName());
        }
        Employee raised = e.withSalary(99000);
        System.out.println(raised);
        System.out.println("original unchanged: " + (e.getSalary() == 90000));
        try {
            new Employee.Builder(" ", 102).build();
        } catch (IllegalStateException ex) {
            System.out.println("Builder rejected: " + ex.getMessage());
        }
    }
}

final class Employee {
    // TODO: private final fields name, id, salary, skills

    private Employee(Builder b) {
        // TODO: copy values from the builder (defensively copy skills)
    }

    public double getSalary() { return 0; }                          // TODO
    public List<String> getSkills() { return new ArrayList<>(); }    // TODO: callers must not modify it
    public Employee withSalary(double newSalary) { return this; }    // TODO: return a NEW Employee

    @Override
    public String toString() { return "TODO"; }  // Employee{id=101, name=Asha, salary=90000.0, skills=[Java, Spring]}

    static final class Builder {
        Builder(String name, int id) { /* TODO */ }
        Builder salary(double salary) { return this; }                // TODO
        Builder skills(List<String> skills) { return this; }          // TODO
        Employee build() { return new Employee(this); }               // TODO: validate the name
    }
}
```

**Expected output**

```text
Employee{id=101, name=Asha, salary=90000.0, skills=[Java, Spring]}
Cannot modify skills: UnsupportedOperationException
Employee{id=101, name=Asha, salary=99000.0, skills=[Java, Spring]}
original unchanged: true
Builder rejected: name is required
```

<!-- hints -->
- `final` on a `List` field only stops you from reassigning the reference. The list itself can still change, which is why you need a copy.
- `List.copyOf(list)` makes an unmodifiable copy in one call. Do it in the `Employee` constructor, so later changes to the builder's list can't leak in.
- A static nested class can call the outer class's **private** constructor. That's what makes the Builder pattern work.
- `withSalary` can reuse the builder: `new Builder(name, id).salary(newSalary).skills(skills).build()`.

<!-- solution -->
```java
import java.util.ArrayList;
import java.util.List;

public class ImmutableDemo {
    public static void main(String[] args) {
        List<String> skills = new ArrayList<>(List.of("Java", "Spring"));
        Employee e = new Employee.Builder("Asha", 101).salary(90000).skills(skills).build();
        skills.add("Hacking");
        System.out.println(e);
        try {
            e.getSkills().add("Kafka");
        } catch (UnsupportedOperationException ex) {
            System.out.println("Cannot modify skills: " + ex.getClass().getSimpleName());
        }
        Employee raised = e.withSalary(99000);
        System.out.println(raised);
        System.out.println("original unchanged: " + (e.getSalary() == 90000));
        try {
            new Employee.Builder(" ", 102).build();
        } catch (IllegalStateException ex) {
            System.out.println("Builder rejected: " + ex.getMessage());
        }
    }
}

final class Employee {                                 // final: no subclass can add mutable state
    private final String name;
    private final int id;
    private final double salary;
    private final List<String> skills;

    private Employee(Builder b) {
        this.name = b.name;
        this.id = b.id;
        this.salary = b.salary;
        this.skills = List.copyOf(b.skills);           // defensive copy, and unmodifiable
    }

    public String getName() { return name; }
    public int getId() { return id; }
    public double getSalary() { return salary; }
    public List<String> getSkills() { return skills; } // safe to share: it can't be modified

    public Employee withSalary(double newSalary) {
        return new Builder(name, id).salary(newSalary).skills(skills).build();
    }

    @Override
    public String toString() {
        return "Employee{id=" + id + ", name=" + name + ", salary=" + salary + ", skills=" + skills + "}";
    }

    static final class Builder {                       // static nested: no hidden reference to an outer instance
        private final String name;
        private final int id;
        private double salary;
        private List<String> skills = List.of();

        Builder(String name, int id) {
            this.name = name;
            this.id = id;
        }

        Builder salary(double salary) { this.salary = salary; return this; }
        Builder skills(List<String> skills) { this.skills = skills; return this; }

        Employee build() {
            if (name == null || name.isBlank()) throw new IllegalStateException("name is required");
            return new Employee(this);
        }
    }
}
```

**Why immutability pays off.** An immutable object is thread-safe without locks, safe to use as a `HashMap` key, and safe to share or cache. `String`, `Integer`, `LocalDate` and records all work this way.

<!-- exercise: d3_e2 | Medium | Order state machine with an enum -->
**Concepts:** enum constructor and fields · enum methods · `EnumMap` · `EnumSet` · `values()` / `valueOf()` / `ordinal()`

**Task.** Model an order's lifecycle with `enum OrderStatus { CREATED, PAID, SHIPPED, DELIVERED, CANCELLED }`:

- Each constant has a `label` ("Order placed", …) and an `isFinal` flag. Use **two constructors** that chain, so only the final states pass `true`.
- Allowed moves: CREATED → PAID / CANCELLED, PAID → SHIPPED / CANCELLED, SHIPPED → DELIVERED. Store them in a `static` `EnumMap<OrderStatus, Set<OrderStatus>>`, filled in a static block.
- `canMoveTo(next)` returns a boolean. `moveTo(next)` returns `next` or throws `IllegalStateException("SHIPPED -> CANCELLED not allowed")`.
- In `main`, count a list of orders by status with an `EnumMap`, and collect the final states into an `EnumSet`.

**Starter code** · `OrderFlow.java`

```java
import java.util.EnumMap;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class OrderFlow {
    public static void main(String[] args) {
        OrderStatus s = OrderStatus.CREATED;
        System.out.println(s + " (" + s.label() + ") -> PAID allowed? " + s.canMoveTo(OrderStatus.PAID));
        System.out.println("CREATED -> DELIVERED allowed? " + OrderStatus.CREATED.canMoveTo(OrderStatus.DELIVERED));
        System.out.println("DELIVERED is final? " + OrderStatus.DELIVERED.isFinal());
        try {
            OrderStatus.SHIPPED.moveTo(OrderStatus.CANCELLED);
        } catch (IllegalStateException ex) {
            System.out.println("Rejected: " + ex.getMessage());
        }

        List<OrderStatus> orders = List.of(OrderStatus.PAID, OrderStatus.SHIPPED, OrderStatus.PAID, OrderStatus.CREATED,
                OrderStatus.CANCELLED, OrderStatus.DELIVERED, OrderStatus.SHIPPED, OrderStatus.PAID);
        Map<OrderStatus, Integer> counts = new EnumMap<>(OrderStatus.class);
        // TODO: count orders by status
        System.out.println("Counts: " + counts);

        Set<OrderStatus> finals = EnumSet.noneOf(OrderStatus.class);
        // TODO: add every final status (loop over OrderStatus.values())
        System.out.println("Final states: " + finals);
        System.out.println("Open states: " + EnumSet.complementOf(EnumSet.copyOf(finals)));
        System.out.println("SHIPPED ordinal = " + OrderStatus.valueOf("SHIPPED").ordinal());
    }
}

enum OrderStatus {
    CREATED, PAID, SHIPPED, DELIVERED, CANCELLED;   // TODO: labels + final flags via constructors

    String label() { return name(); }                              // TODO
    boolean isFinal() { return false; }                            // TODO
    boolean canMoveTo(OrderStatus next) { return false; }          // TODO: use the EnumMap
    OrderStatus moveTo(OrderStatus next) { return next; }          // TODO: throw when not allowed
}
```

**Expected output**

```text
CREATED (Order placed) -> PAID allowed? true
CREATED -> DELIVERED allowed? false
DELIVERED is final? true
Rejected: SHIPPED -> CANCELLED not allowed
Counts: {CREATED=1, PAID=3, SHIPPED=2, DELIVERED=1, CANCELLED=1}
Final states: [DELIVERED, CANCELLED]
Open states: [CREATED, PAID, SHIPPED]
SHIPPED ordinal = 2
```

<!-- hints -->
- Constants with arguments look like `PAID("Payment received")`. The list of constants must end with `;` before the fields.
- An enum constructor can't read the enum's own static fields, because they aren't initialised yet. Put the transitions in a `static { ... }` block **after** the constants.
- `counts.merge(status, 1, Integer::sum)` adds 1 or starts at 1.
- `EnumMap` and `EnumSet` always iterate in **declaration order**, and internally they're just arrays or bit-vectors, which makes them faster than `HashMap`/`HashSet`.

<!-- solution -->
```java
import java.util.EnumMap;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class OrderFlow {
    public static void main(String[] args) {
        OrderStatus s = OrderStatus.CREATED;
        System.out.println(s + " (" + s.label() + ") -> PAID allowed? " + s.canMoveTo(OrderStatus.PAID));
        System.out.println("CREATED -> DELIVERED allowed? " + OrderStatus.CREATED.canMoveTo(OrderStatus.DELIVERED));
        System.out.println("DELIVERED is final? " + OrderStatus.DELIVERED.isFinal());
        try {
            OrderStatus.SHIPPED.moveTo(OrderStatus.CANCELLED);
        } catch (IllegalStateException ex) {
            System.out.println("Rejected: " + ex.getMessage());
        }

        List<OrderStatus> orders = List.of(OrderStatus.PAID, OrderStatus.SHIPPED, OrderStatus.PAID, OrderStatus.CREATED,
                OrderStatus.CANCELLED, OrderStatus.DELIVERED, OrderStatus.SHIPPED, OrderStatus.PAID);
        Map<OrderStatus, Integer> counts = new EnumMap<>(OrderStatus.class);
        for (OrderStatus o : orders) counts.merge(o, 1, Integer::sum);
        System.out.println("Counts: " + counts);

        Set<OrderStatus> finals = EnumSet.noneOf(OrderStatus.class);
        for (OrderStatus st : OrderStatus.values()) {
            if (st.isFinal()) finals.add(st);
        }
        System.out.println("Final states: " + finals);
        System.out.println("Open states: " + EnumSet.complementOf(EnumSet.copyOf(finals)));
        System.out.println("SHIPPED ordinal = " + OrderStatus.valueOf("SHIPPED").ordinal());
    }
}

enum OrderStatus {
    CREATED("Order placed"),
    PAID("Payment received"),
    SHIPPED("On the way"),
    DELIVERED("Delivered", true),
    CANCELLED("Cancelled", true);

    private static final Map<OrderStatus, Set<OrderStatus>> NEXT = new EnumMap<>(OrderStatus.class);

    static {                                     // runs after all constants exist
        NEXT.put(CREATED, EnumSet.of(PAID, CANCELLED));
        NEXT.put(PAID, EnumSet.of(SHIPPED, CANCELLED));
        NEXT.put(SHIPPED, EnumSet.of(DELIVERED));
        NEXT.put(DELIVERED, EnumSet.noneOf(OrderStatus.class));
        NEXT.put(CANCELLED, EnumSet.noneOf(OrderStatus.class));
    }

    private final String label;
    private final boolean isFinal;

    OrderStatus(String label) { this(label, false); }   // enum constructors are implicitly private

    OrderStatus(String label, boolean isFinal) {
        this.label = label;
        this.isFinal = isFinal;
    }

    String label() { return label; }
    boolean isFinal() { return isFinal; }

    boolean canMoveTo(OrderStatus next) { return NEXT.get(this).contains(next); }

    OrderStatus moveTo(OrderStatus next) {
        if (!canMoveTo(next)) throw new IllegalStateException(this + " -> " + next + " not allowed");
        return next;
    }
}
```

**Why enums beat `int` constants.** With `static final int PAID = 1`, nothing stops you from passing `42`. An enum is type-safe, has a readable `toString()`, can hold data and behaviour, and is a singleton per constant, so `==` is safe. Avoid storing `ordinal()` in a database: it changes when someone reorders the constants.

<!-- exercise: d3_e3 | Medium | Sorting students: `Comparable` vs `Comparator` -->
**Concepts:** `Comparable` (natural order) · `Comparator.comparing().reversed().thenComparing()` · anonymous inner class · stable sort · `Collections.max`

**Task.** Given a list of `Student(name, marks, age)`:

1. Implement `Comparable<Student>` so the **natural order** is by name, then by age.
2. Sort by marks (highest first), breaking ties by name, using one `Comparator` chain.
3. Sort by age using an **anonymous inner class** (the pre-Java-8 way), and notice that students with the same age keep their previous relative order.
4. Find the topper with `Collections.max` and a comparator.

**Starter code** · `SortingLab.java`

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class SortingLab {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>(List.of(
                new Student("Meera", 88, 21), new Student("Arjun", 92, 22), new Student("Zoya", 88, 20),
                new Student("Kabir", 75, 23), new Student("Arjun", 81, 20)));

        // TODO 1: natural order
        System.out.println("By name (natural): " + students);

        // TODO 2: marks desc, then name
        System.out.println("By marks desc, then name: " + students);

        // TODO 3: by age with an anonymous Comparator class
        System.out.println("By age (anonymous class): " + students);

        Student top = null; // TODO 4
        System.out.println("Topper: " + top);
    }
}

class Student implements Comparable<Student> {
    private final String name;
    private final int marks, age;

    Student(String name, int marks, int age) { this.name = name; this.marks = marks; this.age = age; }

    String getName() { return name; }
    int getMarks() { return marks; }
    int getAge() { return age; }

    @Override
    public int compareTo(Student other) {
        return 0; // TODO: by name, then age
    }

    @Override
    public String toString() { return name + "(" + marks + ", age " + age + ")"; }
}
```

**Expected output**

```text
By name (natural): [Arjun(81, age 20), Arjun(92, age 22), Kabir(75, age 23), Meera(88, age 21), Zoya(88, age 20)]
By marks desc, then name: [Arjun(92, age 22), Meera(88, age 21), Zoya(88, age 20), Arjun(81, age 20), Kabir(75, age 23)]
By age (anonymous class): [Zoya(88, age 20), Arjun(81, age 20), Meera(88, age 21), Arjun(92, age 22), Kabir(75, age 23)]
Topper: Arjun(92, age 22)
```

<!-- hints -->
- In `compareTo`: `int byName = name.compareTo(other.name); return byName != 0 ? byName : Integer.compare(age, other.age);`
- Never write `return a - b;` in a comparator. It overflows for large or negative numbers. Use `Integer.compare(a, b)`.
- `Comparator.comparingInt(Student::getMarks).reversed().thenComparing(Student::getName)`. `reversed()` applies to everything chained **before** it.
- Anonymous class: `new Comparator<Student>() { @Override public int compare(Student a, Student b) { ... } }`.
- `List.sort` is a stable merge sort (TimSort), so equal elements keep their order from the previous sort.

<!-- solution -->
```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class SortingLab {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>(List.of(
                new Student("Meera", 88, 21), new Student("Arjun", 92, 22), new Student("Zoya", 88, 20),
                new Student("Kabir", 75, 23), new Student("Arjun", 81, 20)));

        Collections.sort(students);                                    // uses compareTo
        System.out.println("By name (natural): " + students);

        students.sort(Comparator.comparingInt(Student::getMarks).reversed()
                .thenComparing(Student::getName));
        System.out.println("By marks desc, then name: " + students);

        students.sort(new Comparator<Student>() {                      // anonymous inner class
            @Override
            public int compare(Student a, Student b) {
                return Integer.compare(a.getAge(), b.getAge());
            }
        });
        System.out.println("By age (anonymous class): " + students);  // stable: Zoya stays before Arjun

        Student top = Collections.max(students, Comparator.comparingInt(Student::getMarks));
        System.out.println("Topper: " + top);
    }
}

class Student implements Comparable<Student> {
    private final String name;
    private final int marks, age;

    Student(String name, int marks, int age) { this.name = name; this.marks = marks; this.age = age; }

    String getName() { return name; }
    int getMarks() { return marks; }
    int getAge() { return age; }

    @Override
    public int compareTo(Student other) {
        int byName = name.compareTo(other.name);
        return byName != 0 ? byName : Integer.compare(age, other.age);
    }

    @Override
    public String toString() { return name + "(" + marks + ", age " + age + ")"; }
}
```

**Rule of thumb.** Use `Comparable` for the one obvious order of a type, like `String` or `LocalDate`. Use `Comparator` for every other order, so you never edit the class to sort it differently. `TreeMap`/`TreeSet` use `compareTo`, so keep it consistent with `equals()`. Otherwise two "equal" keys can silently collapse into one.
