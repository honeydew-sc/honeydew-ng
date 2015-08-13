## Regex Cheatsheet

**Reg**ular **ex**pressions is a fancy name for "looking for patterns
in text". This a quick cheat sheet to remind you what
different things you can do with regexes :)

Honeydew tries to do regex matching as often as possible to get you a
successful match. But, if you're not expecting it, certain behavior
might surprise you!

#### escape table

In the table, each example regex matches the string `Alphabet`.

| character           | example regex                     | meaning                             | how to escape                                                        |
| -                   | -                                 | -                                   | -                                                                    |
| `^`                 | `^Alphabet`                       | line starts at this position        | `\^`                                                                 |
| `$`                 | `Alphabet$`                       | line ends at this position          | `\$`                                                                 |
| `.`                 | `Alphabe.`                        | any character at all: wildcard      | `\.`                                                                 |
| `?`                 | `Alphabets?`                      | zero or one of "s"                  | `\?`                                                                 |
| `+`                 | `Alphabet+`                       | one or more of "t"                  | `\+`                                                                 |
| `*`                 | `AlphabetX*`                      | zero or more of "X"                 | `\*`                                                                 |
| `\`                 | `\\?Alphabet`                     | escape character itself             | `\\`                                                                 |
| `[`, `]`            | `[aA]lphabet`                     | at this position, either "a" or "A" | `\[`, `\]`                                                           |
| `{`, `}`            | `Alphabet{1,5}`                   | at least 1, at most 5 of "t"        | `\{`, `\}`                                                           |
| `(`, `)`            | `(Alphabet)`                      | capture group (generally NA in HD)  | `\(`, `\)`                                                           |
| <code>&#124;</code> | <code>google&#124;Alphabet</code> | "google" OR "Alphabet"*             | <code>\&#124;</code> and <code>\\\\&#124;</code> in an example table |

##### more about pipes

-   Pipes (`|`) are especially tricky if they're in an example
    table. Since the example tables are themselves pipe delimited,
    you'll need to double escape them: <code>\\\\&#124;</code>.

        Examples:
        | HD tables use | pipe separators |
        | so double     | escape \\| them |

-   Pipes will also cause unexpected behavior when if they're not used
    in a capture group. For example, the following regex:

        This is a pretty long sentence | separated by a pipe

    will match EITHER: `This is a pretty long sentence ` OR ` separated by
    a pipe`. This means that you won't be asserting both sides of the
    pipe, as the both following are all valid matches ([rubular example][rb]):

        This is a pretty long sentence and the regex skips this part
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

        Or you could put anything you want first, separated by a pipe
                                                 ^^^^^^^^^^^^^^^^^^^^

-   Pipes are most useful when used inside a capture group `()` so that
    instead of alternating on the entire regex, you control a little part
    of it, like such:

        regex: My favorite color is (red|blue)
        matches: My favorite color is red
        matches: My favorite color is blue

[rb]: http://rubular.com/r/e8KeWQLoyp


#### reference: character classes

- `[abc]`   A single character of: a, b, or c
- `[^abc]`  Any single character except: a, b, or c
- `[a-z]`   Any single character in the range a-z
- `[a-zA-Z]`    Any single character in the range a-z or A-Z

#### reference: anchors

- `^`   Start of line
- `$`   End of line
- `\A`  Start of string
- `\z`  End of string

#### reference: character classes

- `.`   Any single character
- `\s`  Any whitespace character
- `\S`  Any non-whitespace character
- `\d`  Any digit
- `\D`  Any non-digit
- `\w`  Any word character (letter, number, underscore)
- `\W`  Any non-word character
- `\b`  Any word boundary

#### reference: quantifiers

- `(...)`   Capture everything enclosed
- `(a|b)`   a or b
- `a?`  Zero or one of a
- `a*`  Zero or more of a
- `a+`  One or more of a
- `a{3}`    Exactly 3 of a
- `a{3,}`   3 or more of a
- `a{3,6}`  Between 3 and 6 of a
