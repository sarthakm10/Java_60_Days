Today you put inheritance, polymorphism and the `Object` contract into code. Pay attention to *which* method actually runs. That's what interviewers poke at.

<!-- exercise: d2_e1 | Easy | Shape hierarchy with abstract classes -->
**Concepts:** `abstract` class · `extends` · overriding with `@Override` · overloading · runtime polymorphism · `super(...)`

**Task.** Model shapes so new ones can be added without touching existing code:

- `abstract class Shape` has a `name` field set through its constructor, an `abstract double area()`, and a concrete `describe()` that prints `Circle -> area 78.54`, formatted to 2 decimals.
- `Circle(radius)` and `Rectangle(width, height)` extend `Shape`. `Square(side)` extends `Rectangle` and only calls `super(side, side)`.
- **Overloading:** `Rectangle` has `scale(double factor)` and `scale(double wf, double hf)`, each returning a new `Rectangle`.
- `main` puts all shapes in a `List<Shape>`, calls `describe()` on each, and prints the total area.

**Starter code** · `Shapes.java`

```java
import java.util.List;

public class Shapes {
    public static void main(String[] args) {
        Rectangle r = new Rectangle(4, 5);
        List<Shape> shapes = List.of(new Circle(5), r, new Square(3), r.scale(2), r.scale(1, 0.5));
        double total = 0;
        for (Shape s : shapes) {
            s.describe();               // which area() runs is decided at runtime
            total += s.area();
        }
        System.out.printf("Total area: %.2f%n", total);
    }
}

abstract class Shape {
    // TODO: a protected final String name, set through a constructor

    abstract double area();

    void describe() {
        // TODO: print "<name> -> area <area with 2 decimals>"
    }
}

class Circle extends Shape {
    Circle(double radius) { /* TODO */ }

    @Override
    double area() { return 0; }                              // TODO
}

class Rectangle extends Shape {
    Rectangle(double width, double height) { /* TODO */ }

    @Override
    double area() { return 0; }                              // TODO

    Rectangle scale(double factor) { return this; }          // TODO
    Rectangle scale(double wf, double hf) { return this; }   // TODO
}

class Square extends Rectangle {
    Square(double side) { super(side, side); }
}
```

**Expected output**

```text
Circle -> area 78.54
Rectangle -> area 20.00
Square -> area 9.00
Rectangle -> area 80.00
Rectangle -> area 10.00
Total area: 197.54
```

<!-- hints -->
- An abstract class can have a constructor. Subclasses call it with `super("Circle")`.
- `Square` needs to pass its own name. Add a protected `Rectangle(String name, double w, double h)` constructor that `Square` can chain to.
- `String.format("%.2f", value)` or `printf` handles the 2 decimals.
- Overloading is chosen at **compile time** from the argument list; overriding is chosen at **runtime** from the object's real class.

<!-- solution -->
```java
import java.util.List;

public class Shapes {
    public static void main(String[] args) {
        Rectangle r = new Rectangle(4, 5);
        List<Shape> shapes = List.of(new Circle(5), r, new Square(3), r.scale(2), r.scale(1, 0.5));
        double total = 0;
        for (Shape s : shapes) {
            s.describe();
            total += s.area();
        }
        System.out.printf("Total area: %.2f%n", total);
    }
}

abstract class Shape {
    protected final String name;

    protected Shape(String name) { this.name = name; }   // abstract classes can have constructors

    abstract double area();                                // every subclass must implement this

    void describe() {                                      // concrete method shared by all shapes
        System.out.printf("%s -> area %.2f%n", name, area());
    }
}

class Circle extends Shape {
    private final double radius;

    Circle(double radius) {
        super("Circle");
        this.radius = radius;
    }

    @Override
    double area() { return Math.PI * radius * radius; }
}

class Rectangle extends Shape {
    protected final double width, height;

    Rectangle(double width, double height) { this("Rectangle", width, height); }

    protected Rectangle(String name, double width, double height) {
        super(name);
        this.width = width;
        this.height = height;
    }

    @Override
    double area() { return width * height; }

    Rectangle scale(double factor) { return scale(factor, factor); }        // overload 1
    Rectangle scale(double wf, double hf) { return new Rectangle(width * wf, height * hf); }  // overload 2
}

class Square extends Rectangle {
    Square(double side) { super("Square", side, side); }
}
```

**Why it works.** `describe()` lives in `Shape` and calls `area()`. Java dispatches that call to the real object's override at runtime. Adding a `Triangle` means writing one new class, with no `if/else` on types anywhere. That's polymorphism doing its job.

**Stretch.** `Square extends Rectangle` breaks if `Rectangle` gets `setWidth()`. This is the Liskov problem you'll meet on Day 10. Can you explain why?

<!-- exercise: d2_e2 | Medium | Fix the broken `equals()` / `hashCode()` -->
**Concepts:** `equals()` contract · `hashCode()` contract · `HashSet`/`HashMap` lookups · `toString()` · `getClass()` vs `instanceof`

**Task.** The `Point` class below only overrides `equals()`. Run it first and look at the broken output. Then fix `Point` so that:

1. Two points with the same `x` and `y` are equal (reflexive, symmetric, handles `null` and other types).
2. `hashCode()` is consistent with `equals()`. Use `Objects.hash`.
3. `toString()` prints `(1, 2)`.

Don't change `main`.

**Starter code** · `PointDemo.java`

```java
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class PointDemo {
    public static void main(String[] args) {
        Point p1 = new Point(1, 2);
        Point p2 = new Point(1, 2);

        System.out.println("p1.equals(p2): " + p1.equals(p2));
        System.out.println("same hashCode: " + (p1.hashCode() == p2.hashCode()));

        Set<Point> set = new HashSet<>();
        set.add(p1);
        set.add(p2);
        System.out.println("set size: " + set.size());
        System.out.println("set contains (1, 2): " + set.contains(new Point(1, 2)));

        Map<Point, String> labels = new HashMap<>();
        labels.put(new Point(0, 0), "origin");
        System.out.println("label for (0, 0): " + labels.get(new Point(0, 0)));
        System.out.println("p1 equals null: " + p1.equals(null));
        System.out.println("printed: " + p1);
    }
}

class Point {
    private final int x, y;

    Point(int x, int y) { this.x = x; this.y = y; }

    // Buggy: equals without hashCode, and it crashes on null / other types
    @Override
    public boolean equals(Object o) {
        Point other = (Point) o;
        return x == other.x && y == other.y;
    }
}
```

**Expected output**

```text
p1.equals(p2): true
same hashCode: true
set size: 1
set contains (1, 2): true
label for (0, 0): origin
p1 equals null: false
printed: (1, 2)
```

<!-- hints -->
- With the buggy version, `set size` is 2. `HashSet` checks `hashCode()` **first** to pick a bucket, and two equal points using `Object.hashCode()` land in different buckets.
- Start `equals` with `if (this == o) return true;` and then `if (o == null || getClass() != o.getClass()) return false;`.
- `Objects.hash(x, y)` builds a hash from all the fields you compare in `equals`.
- The contract in one line: equal objects **must** have equal hash codes. Equal hash codes do **not** mean equal objects.

<!-- solution -->
```java
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

public class PointDemo {
    public static void main(String[] args) {
        Point p1 = new Point(1, 2);
        Point p2 = new Point(1, 2);

        System.out.println("p1.equals(p2): " + p1.equals(p2));
        System.out.println("same hashCode: " + (p1.hashCode() == p2.hashCode()));

        Set<Point> set = new HashSet<>();
        set.add(p1);
        set.add(p2);
        System.out.println("set size: " + set.size());
        System.out.println("set contains (1, 2): " + set.contains(new Point(1, 2)));

        Map<Point, String> labels = new HashMap<>();
        labels.put(new Point(0, 0), "origin");
        System.out.println("label for (0, 0): " + labels.get(new Point(0, 0)));
        System.out.println("p1 equals null: " + p1.equals(null));
        System.out.println("printed: " + p1);
    }
}

class Point {
    private final int x, y;

    Point(int x, int y) { this.x = x; this.y = y; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;                                  // same reference
        if (o == null || getClass() != o.getClass()) return false;   // null or a different type
        Point other = (Point) o;
        return x == other.x && y == other.y;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);                                   // same fields as equals
    }

    @Override
    public String toString() {
        return "(" + x + ", " + y + ")";
    }
}
```

**Why it matters.** Every `HashMap`/`HashSet` lookup does `hashCode()` → bucket → `equals()` inside the bucket. Break the contract and lookups silently fail: no exception, just missing data. The fields are also `final`. If a key's fields change after you insert it, it's lost in the map.

**Interview follow-up.** `getClass()` or `instanceof`? `getClass()` keeps `equals` symmetric when subclasses exist. `instanceof` allows a subclass to equal its parent but can break symmetry.

<!-- exercise: d2_e3 | Medium | Diamond defaults, static hiding and composition -->
**Concepts:** interface `default` and `static` methods · diamond problem · `Interface.super.method()` · static method hiding · composition over inheritance

**Task.** Write one file that shows three rules:

1. **Diamond.** `Flyer` and `Swimmer` both have `default String move()`. `Duck implements Flyer, Swimmer` must override `move()` and combine both using `Flyer.super.move()` and `Swimmer.super.move()`.
2. **Static hiding.** `Parent` and `Child` both declare `static String kind()` and an instance method `who()`. Show which one runs through a `Parent` reference that points to a `Child`.
3. **Composition.** `Duck` *has a* `SoundMaker` (an interface) passed into its constructor, so `quack()` behaviour can be swapped without subclassing.

**Starter code** · `InterfaceRules.java`

```java
public class InterfaceRules {
    public static void main(String[] args) {
        Duck duck = new Duck("Donald", new LoudQuack());
        System.out.println(duck.move());
        System.out.println(duck.speak());
        Duck rubber = new Duck("Rubber", () -> "squeak");   // SoundMaker is a functional interface
        System.out.println(rubber.speak());
        System.out.println(Flyer.describe());

        Parent ref = new Child();
        System.out.println("ref.who()  = " + ref.who());
        System.out.println("ref.kind() = " + ref.kind());   // static called through an instance: legal but misleading
        System.out.println("Child.kind() = " + Child.kind());
    }
}

interface Flyer {
    default String move() { return "flying"; }
    static String describe() { return ""; }    // TODO
}

interface Swimmer {
    default String move() { return "swimming"; }
}

interface SoundMaker {
    String sound();
}

class LoudQuack implements SoundMaker {
    public String sound() { return "QUACK!"; }
}

class Duck implements Flyer, Swimmer {
    // TODO: name + SoundMaker fields

    Duck(String name, SoundMaker soundMaker) { /* TODO */ }

    @Override
    public String move() { return ""; }        // TODO. Delete this method once to see the compile error
    String speak() { return ""; }              // TODO: "<name> says <sound>"
}

class Parent {
    static String kind() { return "Parent.kind"; }
    String who() { return "Parent.who"; }
}

class Child extends Parent {
    // TODO: hide kind() and override who()
}
```

**Expected output**

```text
Donald is flying and swimming
Donald says QUACK!
Rubber says squeak
Flyer: anything that can fly
ref.who()  = Child.who
ref.kind() = Parent.kind
Child.kind() = Child.kind
```

<!-- hints -->
- If a class implements two interfaces with the same default method, it **won't compile** until you override that method.
- Inside the override, `Flyer.super.move()` calls Flyer's default. It only works for interfaces you directly implement.
- Static methods are bound by the **declared type** at compile time, so `ref.kind()` uses `Parent`. This is called *hiding*, not overriding, and `@Override` on it won't compile.
- Static interface methods are called as `Flyer.describe()`. They are not inherited by implementing classes.

<!-- solution -->
```java
public class InterfaceRules {
    public static void main(String[] args) {
        Duck duck = new Duck("Donald", new LoudQuack());
        System.out.println(duck.move());
        System.out.println(duck.speak());
        Duck rubber = new Duck("Rubber", () -> "squeak");
        System.out.println(rubber.speak());
        System.out.println(Flyer.describe());

        Parent ref = new Child();
        System.out.println("ref.who()  = " + ref.who());     // runtime type wins: overriding
        System.out.println("ref.kind() = " + ref.kind());    // declared type wins: hiding
        System.out.println("Child.kind() = " + Child.kind());
    }
}

interface Flyer {
    default String move() { return "flying"; }
    static String describe() { return "Flyer: anything that can fly"; }
}

interface Swimmer {
    default String move() { return "swimming"; }
}

interface SoundMaker {
    String sound();
}

class LoudQuack implements SoundMaker {
    public String sound() { return "QUACK!"; }
}

class Duck implements Flyer, Swimmer {
    private final String name;
    private final SoundMaker soundMaker;          // HAS-A: behaviour plugged in, not inherited

    Duck(String name, SoundMaker soundMaker) {
        this.name = name;
        this.soundMaker = soundMaker;
    }

    @Override
    public String move() {                        // required: both interfaces define move()
        return name + " is " + Flyer.super.move() + " and " + Swimmer.super.move();
    }

    String speak() { return name + " says " + soundMaker.sound(); }
}

class Parent {
    static String kind() { return "Parent.kind"; }
    String who() { return "Parent.who"; }
}

class Child extends Parent {
    static String kind() { return "Child.kind"; }  // hides Parent.kind, no @Override possible

    @Override
    String who() { return "Child.who"; }
}
```

**Takeaway.** Instance methods use dynamic dispatch, so the runtime type decides. Static methods are resolved by the compiler, so the declared type decides. Composition lets you change a duck's sound at runtime by passing a different `SoundMaker`. Inheritance would have needed a new subclass for every sound.
