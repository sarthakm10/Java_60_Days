Today is about the building blocks: classes, constructors, `static`, `final`, and how Java compares objects. Type every line yourself rather than copy-pasting. That's where the syntax sticks.

<!-- exercise: d1_e1 | Easy | Bank account with encapsulation -->
**Concepts:** encapsulation · constructor chaining with `this(...)` · `static` counter · `final` fields

**Task.** Build a `BankAccount` class:

- Fields `accountNumber` and `owner` are `final`; `balance` is private and can only change through methods.
- Two constructors: `BankAccount(owner)` opens with 0 and **must call** `BankAccount(owner, openingBalance)` using `this(...)`.
- Every new account gets the next number: `ACC-1001`, `ACC-1002`, … using a `static` counter.
- `deposit` rejects amounts ≤ 0. `withdraw` rejects amounts ≤ 0 or ones that would take the balance below 0, and returns `true`/`false`.
- `toString()` prints `ACC-1001 [Asha] balance=150.0`.

**Starter code** · `BankAccount.java`

```java
public class BankAccount {
    // TODO: a static counter for accounts opened
    // TODO: final accountNumber and owner, private balance

    public BankAccount(String owner) {
        // TODO: chain to the other constructor with this(...)
    }

    public BankAccount(String owner, double openingBalance) {
        // TODO: bump the counter, build the account number, set the fields
    }

    public void deposit(double amount) {
        // TODO: print "Rejected deposit of <amount>" for amount <= 0
    }

    public boolean withdraw(double amount) {
        // TODO: print "Rejected withdrawal of <amount> from <accountNumber>" when not allowed
        return false;
    }

    public static int getAccountsOpened() {
        return 0; // TODO
    }

    public static void main(String[] args) {
        BankAccount a = new BankAccount("Asha");
        BankAccount b = new BankAccount("Ravi", 500);
        a.deposit(200);
        a.withdraw(50);
        b.withdraw(1000);
        b.deposit(-5);
        System.out.println(a);
        System.out.println(b);
        System.out.println("Accounts opened: " + BankAccount.getAccountsOpened());
    }
}
```

**Expected output**

```text
Rejected withdrawal of 1000.0 from ACC-1002
Rejected deposit of -5.0
ACC-1001 [Asha] balance=150.0
ACC-1002 [Ravi] balance=500.0
Accounts opened: 2
```

<!-- hints -->
- `this(owner, 0.0);` must be the **first** statement of the one-argument constructor.
- A `final` field must be assigned exactly once, in every constructor path. Chaining makes that easy, because only the two-argument constructor assigns it.
- The counter is `private static int accountsOpened`. Increment it before building `"ACC-" + (1000 + accountsOpened)`.
- Override `toString()` with `@Override` so `System.out.println(a)` prints your format, not `BankAccount@1b6d3586`.

<!-- solution -->
```java
public class BankAccount {
    private static int accountsOpened = 0;          // one copy shared by every account
    private static final double MIN_BALANCE = 0.0;  // a constant: static + final

    private final String accountNumber;             // set once, never changes
    private final String owner;
    private double balance;                         // only changed through deposit/withdraw

    public BankAccount(String owner) {
        this(owner, 0.0);                           // constructor chaining, must be the first line
    }

    public BankAccount(String owner, double openingBalance) {
        accountsOpened++;
        this.accountNumber = "ACC-" + (1000 + accountsOpened);
        this.owner = owner;                         // 'this' separates the field from the parameter
        this.balance = openingBalance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Rejected deposit of " + amount);
            return;
        }
        balance += amount;
    }

    public boolean withdraw(double amount) {
        if (amount <= 0 || balance - amount < MIN_BALANCE) {
            System.out.println("Rejected withdrawal of " + amount + " from " + accountNumber);
            return false;
        }
        balance -= amount;
        return true;
    }

    public double getBalance() { return balance; }
    public String getAccountNumber() { return accountNumber; }
    public static int getAccountsOpened() { return accountsOpened; }

    @Override
    public String toString() {
        return accountNumber + " [" + owner + "] balance=" + balance;
    }

    public static void main(String[] args) {
        BankAccount a = new BankAccount("Asha");
        BankAccount b = new BankAccount("Ravi", 500);
        a.deposit(200);
        a.withdraw(50);
        b.withdraw(1000);
        b.deposit(-5);
        System.out.println(a);
        System.out.println(b);
        System.out.println("Accounts opened: " + BankAccount.getAccountsOpened());
    }
}
```

**Why it works.** There's no setter for `balance`, so the only way to change it is through methods that check the rules. That's encapsulation. `accountsOpened` is `static`, so all objects share one counter. Making it an instance field would print `ACC-1001` twice. Try it and see.

**Stretch.** Add a `transfer(BankAccount to, double amount)` method that reuses `withdraw` and `deposit`.

<!-- exercise: d1_e2 | Easy | Predict the output: `==` vs `equals()` -->
**Concepts:** Integer cache (-128 to 127) · String pool · `intern()` · compile-time constants · `==` vs `.equals()`

**Task.** Copy this program into your IDE. **Before running it**, write your prediction (`true`/`false`) as a comment next to each line. Then run it and explain every line you got wrong. This is exactly the kind of "what does this print" question interviewers love.

**Starter code** · `EqualityLab.java`

```java
public class EqualityLab {
    public static void main(String[] args) {
        Integer a = 127, b = 127;
        Integer c = 128, d = 128;
        System.out.println("1. 127 == 127       : " + (a == b));       // prediction:
        System.out.println("2. 128 == 128       : " + (c == d));       // prediction:
        System.out.println("3. 128 equals 128   : " + c.equals(d));    // prediction:

        String s1 = "java";
        String s2 = "java";
        String s3 = new String("java");
        String s4 = s3.intern();
        String part = "ja";
        String s5 = part + "va";
        final String constPart = "ja";
        String s6 = constPart + "va";
        System.out.println("4. s1 == s2         : " + (s1 == s2));     // prediction:
        System.out.println("5. s1 == s3         : " + (s1 == s3));     // prediction:
        System.out.println("6. s1.equals(s3)    : " + s1.equals(s3));  // prediction:
        System.out.println("7. s1 == s4         : " + (s1 == s4));     // prediction:
        System.out.println("8. s1 == s5         : " + (s1 == s5));     // prediction:
        System.out.println("9. s1 == s6         : " + (s1 == s6));     // prediction:

        Long big = 127L;
        System.out.println("10. big.equals(127) : " + big.equals(127)); // prediction:
        StringBuilder sb = new StringBuilder("hi");
        StringBuilder same = sb.append("!");
        System.out.println("11. sb == same      : " + (sb == same) + " -> " + sb); // prediction:
    }
}
```

<!-- hints -->
- `Integer a = 127` is autoboxing, which calls `Integer.valueOf(127)`. `valueOf` returns cached objects for -128..127 only.
- String literals go into the String pool, but `new String(...)` always creates a new object on the heap.
- `part + "va"` is computed at **runtime** because `part` is a normal variable. `constPart + "va"` is a compile-time constant because `constPart` is `final` and initialised with a literal.
- `big.equals(127)` autoboxes `127` to an `Integer`, and `Long.equals` checks the type first.
- `StringBuilder` is mutable: `append` changes the same object and returns `this`.

<!-- solution -->
```java
public class EqualityLab {
    public static void main(String[] args) {
        Integer a = 127, b = 127;      // Integer.valueOf(127): same cached object
        Integer c = 128, d = 128;      // outside the cache: two different objects
        System.out.println("1. 127 == 127       : " + (a == b));
        System.out.println("2. 128 == 128       : " + (c == d));
        System.out.println("3. 128 equals 128   : " + c.equals(d));     // compares values

        String s1 = "java";            // pooled literal
        String s2 = "java";            // same pooled object
        String s3 = new String("java"); // new heap object
        String s4 = s3.intern();       // returns the pooled "java"
        String part = "ja";
        String s5 = part + "va";       // runtime concat creates a new object
        final String constPart = "ja";
        String s6 = constPart + "va";  // constant folded to "java" by the compiler, so pooled
        System.out.println("4. s1 == s2         : " + (s1 == s2));
        System.out.println("5. s1 == s3         : " + (s1 == s3));
        System.out.println("6. s1.equals(s3)    : " + s1.equals(s3));
        System.out.println("7. s1 == s4         : " + (s1 == s4));
        System.out.println("8. s1 == s5         : " + (s1 == s5));
        System.out.println("9. s1 == s6         : " + (s1 == s6));

        Long big = 127L;
        System.out.println("10. big.equals(127) : " + big.equals(127)); // Integer is not a Long
        StringBuilder sb = new StringBuilder("hi");
        StringBuilder same = sb.append("!");    // append returns 'this'
        System.out.println("11. sb == same      : " + (sb == same) + " -> " + sb);
    }
}
```

**Expected output**

```text
1. 127 == 127       : true
2. 128 == 128       : false
3. 128 equals 128   : true
4. s1 == s2         : true
5. s1 == s3         : false
6. s1.equals(s3)    : true
7. s1 == s4         : true
8. s1 == s5         : false
9. s1 == s6         : true
10. big.equals(127) : false
11. sb == same      : true -> hi!
```

**Takeaway.** `==` compares references and `equals()` compares content. Always use `equals()` for wrapper types and Strings. Line 2 is the bug that hides in real code: it works in tests with small IDs and breaks in production at 128.

<!-- exercise: d1_e3 | Medium | String toolkit with a static block -->
**Concepts:** `static` block · utility class (private constructor) · `StringBuilder` · `char` handling · two pointers

**Task.** Write a utility class `StringToolkit` that can't be instantiated, with these `static` methods:

1. `compress("aaabccddd")` returns `"a3b1c2d3"`. If the compressed form isn't shorter, return the original (`"abc"` stays `"abc"`).
2. `isPalindrome(s)` ignores case and anything that isn't a letter or digit. Don't build a cleaned copy; use two pointers.
3. `reverseWords("  the sky   is blue ")` returns `"blue is sky the"`, with extra spaces removed.
4. `countVowels(s)` uses a vowel `Set<Character>` that is filled once in a **`static` block**, which prints `[static block] vowel table ready`.

**Starter code** · `StringToolkit.java`

```java
import java.util.HashSet;
import java.util.Set;

public class StringToolkit {
    private static final Set<Character> VOWELS = new HashSet<>();

    // TODO: a static block that fills VOWELS and prints "[static block] vowel table ready"

    // TODO: make the class impossible to instantiate

    public static String compress(String s) {
        return s; // TODO: use a StringBuilder
    }

    public static boolean isPalindrome(String s) {
        return false; // TODO: two pointers, skip non letters/digits
    }

    public static String reverseWords(String s) {
        return s; // TODO
    }

    public static int countVowels(String s) {
        return 0; // TODO
    }

    public static void main(String[] args) {
        System.out.println("main starts");
        System.out.println(compress("aaabccddd"));
        System.out.println(compress("abc"));
        System.out.println(isPalindrome("A man, a plan, a canal: Panama"));
        System.out.println(isPalindrome("race a car"));
        System.out.println(reverseWords("  the sky   is blue "));
        System.out.println(countVowels("Interview Preparation"));
    }
}
```

**Expected output**

```text
[static block] vowel table ready
main starts
a3b1c2d3
abc
true
false
blue is sky the
9
```

<!-- hints -->
- A static block is just `static { ... }` inside the class. It runs once, when the class is loaded, which happens **before** `main`. That's why its line prints first.
- For `compress`, loop `i` from 1 to `s.length()` inclusive. When `i == s.length()` or the char changes, append the previous char and its run length.
- `String +` inside a loop creates a new String every time, because Strings are immutable. `StringBuilder` grows one buffer instead.
- `s.trim().split("\\s+")` splits on one or more whitespace characters.
- `Character.isLetterOrDigit(ch)` and `Character.toLowerCase(ch)` are all you need for the palindrome.

<!-- solution -->
```java
import java.util.HashSet;
import java.util.Set;

public class StringToolkit {
    private static final Set<Character> VOWELS = new HashSet<>();

    static {                                           // runs once, when the class is loaded
        for (char ch : "aeiouAEIOU".toCharArray()) VOWELS.add(ch);
        System.out.println("[static block] vowel table ready");
    }

    private StringToolkit() { }                        // utility class: no instances

    public static String compress(String s) {
        if (s.isEmpty()) return s;
        StringBuilder sb = new StringBuilder();
        int run = 1;
        for (int i = 1; i <= s.length(); i++) {
            if (i < s.length() && s.charAt(i) == s.charAt(i - 1)) {
                run++;
            } else {
                sb.append(s.charAt(i - 1)).append(run);
                run = 1;
            }
        }
        return sb.length() < s.length() ? sb.toString() : s;
    }

    public static boolean isPalindrome(String s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            char left = s.charAt(i), right = s.charAt(j);
            if (!Character.isLetterOrDigit(left)) i++;
            else if (!Character.isLetterOrDigit(right)) j--;
            else if (Character.toLowerCase(left) != Character.toLowerCase(right)) return false;
            else { i++; j--; }
        }
        return true;
    }

    public static String reverseWords(String s) {
        String[] words = s.trim().split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) sb.append(' ');
        }
        return sb.toString();
    }

    public static int countVowels(String s) {
        int count = 0;
        for (char ch : s.toCharArray()) {
            if (VOWELS.contains(ch)) count++;              // char autoboxes to Character
        }
        return count;
    }

    public static void main(String[] args) {
        System.out.println("main starts");
        System.out.println(compress("aaabccddd"));
        System.out.println(compress("abc"));
        System.out.println(isPalindrome("A man, a plan, a canal: Panama"));
        System.out.println(isPalindrome("race a car"));
        System.out.println(reverseWords("  the sky   is blue "));
        System.out.println(countVowels("Interview Preparation"));
    }
}
```

**Complexity.** All four methods are O(n) time. `isPalindrome` uses O(1) extra space; the others need O(n) for the result.

**Stretch.** Replace the `StringBuilder` in `reverseWords` with `String.join(" ", ...)` over a reversed list. Then time both versions on a 1-million-word string.
