Modern Java makes the code shorter *and* safer. Today you'll replace null checks with `Optional`, use the `java.time` API, and write Java 21 code with records, sealed types and pattern-matching `switch`. Use JDK 21 for exercise 2.

<!-- exercise: d7_e1 | Easy | Null-safe lookups with `Optional` -->
**Concepts:** `Optional.ofNullable` · `map` / `flatMap` / `filter` · `orElse` vs `orElseGet` · `orElseThrow` · `ifPresentOrElse`

**Task.** `UserRepo` holds three users. Some have no email or address. Implement the lookups **without a single `if (x != null)`**:

- `findById(id)` returns `Optional<User>`.
- `emailOf(id)` returns the email, or `"N/A"` for a missing user or a missing email.
- The city goes through `User::addressOpt` (which returns an `Optional`), so you'll need `flatMap`.
- Show that `orElse(...)` **always** evaluates its argument, while `orElseGet(...)` only does when the Optional is empty.

**Starter code** · `OptionalDemo.java`

```java
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

public class OptionalDemo {
    public static void main(String[] args) {
        UserRepo repo = new UserRepo();
        System.out.println("email of 1: " + repo.emailOf(1));
        System.out.println("email of 2: " + repo.emailOf(2));
        System.out.println("email of 9: " + repo.emailOf(9));
        System.out.println("city of 1: " + "");      // TODO: findById -> flatMap(addressOpt) -> map(city) -> orElse
        System.out.println("city of 2: " + "");      // TODO
        // TODO: user 1 and user 3 -> filter(age >= 18).ifPresentOrElse(...)
        System.out.println("orElse:");
        // TODO: findById(1).map(User::name).orElse(expensiveDefault())
        System.out.println("orElseGet:");
        // TODO: findById(1).map(User::name).orElseGet(OptionalDemo::expensiveDefault)
        // TODO: findById(9).orElseThrow(...) and print "error: user 9 not found"
    }

    static String expensiveDefault() {
        System.out.println("  computing default...");
        return "Guest";
    }
}

record Address(String city) { }

record User(int id, String name, int age, String email, Address address) {
    Optional<Address> addressOpt() { return Optional.ofNullable(address); }
}

class UserRepo {
    private final Map<Integer, User> users = Map.of(
            1, new User(1, "Asha", 30, "asha@mail.com", new Address("Pune")),
            2, new User(2, "Ravi", 25, null, null),
            3, new User(3, "Kiran", 15, "kiran@mail.com", new Address("Delhi")));

    Optional<User> findById(int id) { return Optional.empty(); }   // TODO
    String emailOf(int id) { return ""; }                          // TODO
}
```

**Expected output**

```text
email of 1: asha@mail.com
email of 2: N/A
email of 9: N/A
city of 1: Pune
city of 2: unknown
Asha is an adult
no adult found
orElse:
  computing default...
  -> Asha
orElseGet:
  -> Asha
error: user 9 not found
```

<!-- hints -->
- `Optional.ofNullable(users.get(id))`. Use `of` only when null is impossible, because `Optional.of(null)` throws.
- `map(User::email)` turns a null result into an empty Optional automatically, so `findById(id).map(User::email).orElse("N/A")` covers both cases.
- `map` would give `Optional<Optional<Address>>` here, because `addressOpt()` already returns an Optional. `flatMap` unwraps one level.
- Use `Optional` as a **return type**. Don't use it for fields or method parameters, and never call `get()` without checking.

<!-- solution -->
```java
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

public class OptionalDemo {
    public static void main(String[] args) {
        UserRepo repo = new UserRepo();
        System.out.println("email of 1: " + repo.emailOf(1));
        System.out.println("email of 2: " + repo.emailOf(2));
        System.out.println("email of 9: " + repo.emailOf(9));
        System.out.println("city of 1: " + repo.findById(1).flatMap(User::addressOpt).map(Address::city).orElse("unknown"));
        System.out.println("city of 2: " + repo.findById(2).flatMap(User::addressOpt).map(Address::city).orElse("unknown"));

        for (int id : new int[]{1, 3}) {
            repo.findById(id)
                    .filter(u -> u.age() >= 18)
                    .ifPresentOrElse(u -> System.out.println(u.name() + " is an adult"),
                            () -> System.out.println("no adult found"));
        }

        System.out.println("orElse:");
        String a = repo.findById(1).map(User::name).orElse(expensiveDefault());           // argument always evaluated
        System.out.println("  -> " + a);
        System.out.println("orElseGet:");
        String b = repo.findById(1).map(User::name).orElseGet(OptionalDemo::expensiveDefault); // only if empty
        System.out.println("  -> " + b);

        try {
            repo.findById(9).orElseThrow(() -> new NoSuchElementException("user 9 not found"));
        } catch (NoSuchElementException e) {
            System.out.println("error: " + e.getMessage());
        }
    }

    static String expensiveDefault() {
        System.out.println("  computing default...");
        return "Guest";
    }
}

record Address(String city) { }

record User(int id, String name, int age, String email, Address address) {
    Optional<Address> addressOpt() { return Optional.ofNullable(address); }
}

class UserRepo {
    private final Map<Integer, User> users = Map.of(
            1, new User(1, "Asha", 30, "asha@mail.com", new Address("Pune")),
            2, new User(2, "Ravi", 25, null, null),
            3, new User(3, "Kiran", 15, "kiran@mail.com", new Address("Delhi")));

    Optional<User> findById(int id) {
        return Optional.ofNullable(users.get(id));
    }

    String emailOf(int id) {
        return findById(id).map(User::email).orElse("N/A");   // missing user OR missing email -> N/A
    }
}
```

**Interview trap.** `orElse(callDatabase())` runs the database call even when a value is present. Use `orElseGet(() -> callDatabase())` for anything expensive or with side effects. Spring Data's `findById` returns `Optional` for the same reason this repo does.

<!-- exercise: d7_e2 | Medium | Records, sealed types and pattern-matching `switch` (Java 21) -->
**Concepts:** `record` (+ compact constructor) · `sealed` / `permits` · exhaustive `switch` without `default` · type patterns with `when` guards · record deconstruction patterns · `case null` · switch `yield` · text blocks · `instanceof` patterns

**Task.** Using **JDK 21**:

1. Declare `sealed interface Shape permits Circle, Square, Rect` and three records. `Rect` validates its sides in a **compact constructor**.
2. `area(Shape)` uses a `switch` with **no `default`** (the compiler knows every subtype), and deconstructs `Rect(double w, double h)`.
3. `describe(Object)` handles `null`, `Integer` above 100 (with a `when` guard), other `Integer`s, blank and non-blank `String`s, any `Shape`, and everything else.
4. Use an arrow `switch` with `yield`, an `instanceof` pattern, and print a text-block report.

**Starter code** · `ModernShapes.java`

```java
import java.util.Arrays;
import java.util.List;

public class ModernShapes {
    sealed interface Shape permits Circle, Square, Rect { }
    record Circle(double r) implements Shape { }
    record Square(double side) implements Shape { }
    record Rect(double w, double h) implements Shape { }      // TODO: compact constructor that validates

    static double area(Shape s) {
        return 0;   // TODO: pattern-matching switch, no default
    }

    static String describe(Object o) {
        return "TODO";
    }

    public static void main(String[] args) {
        List<Shape> shapes = List.of(new Circle(1), new Square(2), new Rect(2, 3));
        for (Shape s : shapes) System.out.printf("%s -> %.2f%n", s, area(s));
        System.out.println(new Rect(2, 3).equals(new Rect(2, 3)));

        for (Object o : Arrays.asList(42, 500, "", "hello", new Square(3), 2.5, null)) {
            System.out.println(describe(o));
        }
        try {
            new Rect(-1, 2);
        } catch (IllegalArgumentException e) {
            System.out.println("invalid: " + e.getMessage());
        }

        Object obj = "pattern";
        // TODO: if obj is a String longer than 3 chars -> print "instanceof pattern: PATTERN" (no cast!)

        String day = "SAT";
        String type = "";   // TODO: switch expression; SAT/SUN -> "weekend", default block uses yield
        System.out.println(day + " is a " + type);

        // TODO: print a text-block report using .formatted(...)
    }
}
```

**Expected output**

```text
Circle[r=1.0] -> 3.14
Square[side=2.0] -> 4.00
Rect[w=2.0, h=3.0] -> 6.00
true
int 42
big int 500
blank string
string of length 5
shape with area 9.0
something else: Double
null!
invalid: sides must be positive
instanceof pattern: PATTERN
SAT is a weekend
Report
  shapes: 3
  total area: 13.14
```

<!-- hints -->
- A compact constructor has no parameter list: `record Rect(double w, double h) implements Shape { Rect { if (w <= 0 || h <= 0) throw ...; } }`. The fields are assigned automatically after it runs.
- Record pattern: `case Rect(double w, double h) -> w * h;`. Type pattern: `case Circle c -> Math.PI * c.r() * c.r();`.
- Put the guarded case `case Integer i when i > 100` **before** `case Integer i`, or the compiler rejects it as unreachable (dominated).
- Text block: start with `"""` on its own line. The indentation of the closing `"""` decides how much leading space is stripped.

<!-- solution -->
```java
import java.util.Arrays;
import java.util.List;

public class ModernShapes {
    sealed interface Shape permits Circle, Square, Rect { }
    record Circle(double r) implements Shape { }
    record Square(double side) implements Shape { }
    record Rect(double w, double h) implements Shape {
        Rect {                                               // compact constructor: validate, fields set after
            if (w <= 0 || h <= 0) throw new IllegalArgumentException("sides must be positive");
        }
    }

    static double area(Shape s) {
        return switch (s) {                                  // exhaustive: sealed, so no default needed
            case Circle c -> Math.PI * c.r() * c.r();
            case Square sq -> sq.side() * sq.side();
            case Rect(double w, double h) -> w * h;          // record deconstruction
        };
    }

    static String describe(Object o) {
        return switch (o) {
            case null -> "null!";
            case Integer i when i > 100 -> "big int " + i;   // guarded pattern before the general one
            case Integer i -> "int " + i;
            case String s when s.isBlank() -> "blank string";
            case String s -> "string of length " + s.length();
            case Shape s -> "shape with area " + String.format("%.1f", area(s));
            default -> "something else: " + o.getClass().getSimpleName();
        };
    }

    public static void main(String[] args) {
        List<Shape> shapes = List.of(new Circle(1), new Square(2), new Rect(2, 3));
        for (Shape s : shapes) System.out.printf("%s -> %.2f%n", s, area(s));
        System.out.println(new Rect(2, 3).equals(new Rect(2, 3)));   // records get equals/hashCode/toString

        for (Object o : Arrays.asList(42, 500, "", "hello", new Square(3), 2.5, null)) {
            System.out.println(describe(o));
        }
        try {
            new Rect(-1, 2);
        } catch (IllegalArgumentException e) {
            System.out.println("invalid: " + e.getMessage());
        }

        Object obj = "pattern";
        if (obj instanceof String str && str.length() > 3) {         // test + cast + bind in one step
            System.out.println("instanceof pattern: " + str.toUpperCase());
        }

        String day = "SAT";
        String type = switch (day) {
            case "SAT", "SUN" -> "weekend";
            default -> {
                String t = "weekday";
                yield t;                                             // yield returns a value from a block
            }
        };
        System.out.println(day + " is a " + type);

        String report = """
                Report
                  shapes: %d
                  total area: %.2f
                """.formatted(shapes.size(), shapes.stream().mapToDouble(ModernShapes::area).sum());
        System.out.print(report);
    }
}
```

**Why sealed + switch is powerful.** Add a `Triangle` to `permits` and every `switch` over `Shape` stops compiling until you handle it. The compiler finds every place you forgot. A `default` branch would silently hide that. This is how modern Java models "one of a fixed set" types, such as payment results or API responses.

<!-- exercise: d7_e3 | Medium | Dates, times and time zones with `java.time` -->
**Concepts:** `LocalDate` / `LocalTime` / `ZonedDateTime` · `Period` (date-based) vs `Duration` (time-based) · `ChronoUnit.DAYS.between` · `DateTimeFormatter` · immutability · `datesUntil`

**Task.** Treat **1 Nov 2026** as "today", so the output is repeatable, and compute:

1. Age from a birthday of 15 Mar 1998, as years, months and days
2. The next birthday, how many days away it is, and its weekday
3. Format today as `01 Nov 2026`, then parse `25/12/2026` and count the days until it
4. Show that `plusDays` doesn't change the original date
5. Add one month to 31 Jan 2026. What happens?
6. The length of a 09:30–17:15 meeting
7. Convert 20 Nov 2026 10:00 in Kolkata to New York time
8. Count the working days (Mon–Fri) from 2 Nov to 13 Nov 2026, inclusive

**Starter code** · `DateTimeLab.java`

```java
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Period;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Locale;

public class DateTimeLab {
    public static void main(String[] args) {
        LocalDate today = LocalDate.of(2026, 11, 1);     // fixed "today" so the output is repeatable
        LocalDate birthday = LocalDate.of(1998, 3, 15);

        // TODO 1: "age: 28 years 7 months 17 days"
        // TODO 2: "next birthday: 2027-03-15 (in 134 days), a MONDAY"
        // TODO 3: "formatted: 01 Nov 2026" and "days until 25/12/2026: 54"
        // TODO 4: "plusDays returns a new object: 2026-11-11, today still 2026-11-01"
        // TODO 5: "Jan 31 + 1 month = 2026-02-28"
        // TODO 6: "meeting length: 7h 45m (PT7H45M)"
        // TODO 7: "10:00 in Kolkata = 2026-11-19 23:30 America/New_York (offset -05:00)"
        // TODO 8: "working days 2 Nov to 13 Nov: 10"
    }
}
```

**Expected output**

```text
age: 28 years 7 months 17 days
next birthday: 2027-03-15 (in 134 days), a MONDAY
formatted: 01 Nov 2026
days until 25/12/2026: 54
plusDays returns a new object: 2026-11-11, today still 2026-11-01
Jan 31 + 1 month = 2026-02-28
meeting length: 7h 45m (PT7H45M)
10:00 in Kolkata = 2026-11-19 23:30 America/New_York (offset -05:00)
working days 2 Nov to 13 Nov: 10
```

<!-- hints -->
- `Period.between(birthday, today)` gives years, months and days. `ChronoUnit.DAYS.between(a, b)` gives the total days as one number.
- Next birthday: `birthday.withYear(today.getYear())`. If that's not after today, add one year.
- Pass `Locale.ENGLISH` to `ofPattern("dd MMM yyyy", Locale.ENGLISH)`, otherwise month names follow your machine's language.
- `zoned.withZoneSameInstant(ZoneId.of("America/New_York"))` keeps the same moment and changes the wall-clock time. Use the pattern `yyyy-MM-dd HH:mm VV` to print the zone id.
- `start.datesUntil(end.plusDays(1))` streams every date (the end is exclusive). Filter on `getDayOfWeek().getValue() <= 5`.

<!-- solution -->
```java
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Period;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Locale;

public class DateTimeLab {
    public static void main(String[] args) {
        LocalDate today = LocalDate.of(2026, 11, 1);
        LocalDate birthday = LocalDate.of(1998, 3, 15);

        Period age = Period.between(birthday, today);                       // date-based amount
        System.out.println("age: " + age.getYears() + " years " + age.getMonths() + " months " + age.getDays() + " days");

        LocalDate next = birthday.withYear(today.getYear());
        if (!next.isAfter(today)) next = next.plusYears(1);
        System.out.println("next birthday: " + next + " (in " + ChronoUnit.DAYS.between(today, next)
                + " days), a " + next.getDayOfWeek());

        DateTimeFormatter pretty = DateTimeFormatter.ofPattern("dd MMM yyyy", Locale.ENGLISH);
        System.out.println("formatted: " + today.format(pretty));
        LocalDate christmas = LocalDate.parse("25/12/2026", DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        System.out.println("days until 25/12/2026: " + ChronoUnit.DAYS.between(today, christmas));

        LocalDate later = today.plusDays(10);                                // returns a NEW object
        System.out.println("plusDays returns a new object: " + later + ", today still " + today);

        System.out.println("Jan 31 + 1 month = " + LocalDate.of(2026, 1, 31).plus(Period.ofMonths(1)));  // clamps to month end

        Duration meeting = Duration.between(LocalTime.of(9, 30), LocalTime.of(17, 15));   // time-based amount
        System.out.println("meeting length: " + meeting.toHours() + "h " + meeting.toMinutesPart() + "m (" + meeting + ")");

        ZonedDateTime kolkata = ZonedDateTime.of(LocalDateTime.of(2026, 11, 20, 10, 0), ZoneId.of("Asia/Kolkata"));
        ZonedDateTime newYork = kolkata.withZoneSameInstant(ZoneId.of("America/New_York"));   // same instant
        System.out.println("10:00 in Kolkata = " + newYork.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm VV"))
                + " (offset " + newYork.getOffset() + ")");

        LocalDate start = LocalDate.of(2026, 11, 2), end = LocalDate.of(2026, 11, 13);
        long workingDays = start.datesUntil(end.plusDays(1))
                .filter(d -> d.getDayOfWeek().getValue() <= 5)               // MONDAY=1 … FRIDAY=5
                .count();
        System.out.println("working days 2 Nov to 13 Nov: " + workingDays);
    }
}
```

**Production habits.** Store timestamps as `Instant` or UTC in the database, and convert to a `ZonedDateTime` only for display. Use `LocalDate` for birthdays and due dates, where no time zone applies. Inject a `java.time.Clock` instead of calling `LocalDate.now()` directly, so tests can fix "today" like this exercise does. All `java.time` types are immutable and thread-safe, unlike the old `Date` and `SimpleDateFormat`.
