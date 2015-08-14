# Example Snippets

This page contains snippets of Honeydew code that you can copy
directly into your features for a quick boost!

---

## Authentication

#### Sharecare: Login

To log in to Sharecare, use the following snippet. The examples table
is optional.

     Scenario: Quick Login
     Given I am logged in on the /topics page

     Examples:
     | email_address | password |
     | your@email.com  | 123123123 |

Using the above snippet, you will be immediately logged in on the
destination page without having to waste time at /header, or /login,
or at your profile page, if it's loading slowly. You can get directly
to your destination with this rule.

     Scenario: Login
     Given I am on the /header page
       When I log in as an example user

     Examples:
     | email_address | password |
     | your@email.com  | 123123123 |

If you don't use an examples table, Honeydew will automatically log
you in to <samp>qa-subject@sharecare.com</samp>, which is an account
that exists on QA, Stage, and Prod. It uses the SSO API to obtain an
authenticaton token, courtesy of Jay Heinlein :D, avoiding slow and
error prone issues at the /login page.

It also places the user's profile url into $myProfileUrl. For example,
my $myProfileUrl might be

    http://www.qa.sharecare.com/user/daniel-gempesaw-6.

You can use it in rules like

     Given I am on the $myProfileUrl page
     Given I am on the $myProfileUrl/settings page

#### Sharecare: Register

There's a dedicated rule for creating a new user every time your test
is run. Note that this rule will deliberately fail on production, as
we are not in the habit of making production users!

     Scenario: Quick Create
     Given I am a new user on the / page

After that, you will be logged in as a user whose credentials will be:

    mysharecareqa+_____@gmail.com
    123123123

#### .mil: Login

Use the following snippet to log in to any of our .mil environments. Using
your own AKO account to log into Test/Prod depends directly on the
Example saying `akoId` so make sure to include it!


     Scenario: Dot Mil Login
     Given I am logged in to .mil on the / page

     Examples:
     # for test users:
     | id        | password  |
     | test.user | 123123123 |

     # for ako accounts:
     | akoId       | password  |
     | your.ako.id | 123123123 |


Like above, you get $myProfileUrl in the scope of your test for
free. It decides what to do based on using a specific hostname:

* https://armyfit.dev.sharecare.com
* https://armyfit.stage.sharecare.com
* https://test.armyfit.army.mil
* BROKEN: https://armyfit.army.mil
* https://ultimateme.dev.sharecare.com
* BROKEN: https://ultimateme.stage.sharecare.com
* BROKEN: https://armyfit.army.mil/UltimateMe

N.B.: Currently, some of the login flows are broken. Sorry for the
inconvenience.

#### Sharecare/.mil: Logout

Use the following rule to log out of Sharecare:

      Then I log out of Sharecare

It goes to the /logout page - for example, on Stage, it would navigate
to http://www.stage.sharecare.com/logout. We cannot simply clear
cookies because they are often managed on a different domain, and
Honeydew can only clear cookies for the current domain. There is no
guarantee that the browser would be on the right domain when we tried
clearing cookies.

---

## Breakpoint

Breakpoints are an excellent way to cut down your feedback loop. If
you have a feature that has a lengthy set up period before reaching
the part of the app you're trying to test, you can use a breakpoint to
pause and give _you_ control of the browser after the set up. This
lets you try out rules and selectors without having to wait for the
set up period each time!

Put the following rule anywhere in your test:

     When I set a breakpoint

When the test reaches this point, it will stop and wait for your
input. While in REPL mode, you can use the following keyboard
shortcuts while your cursor is in the editor


| windows key           | mac key               | action                                 |
| -                     | -                     | -                                      |
| <kbd>Alt-Enter</kbd>  | <kbd>Cmd-Enter</kbd>  | evaluate the current rule at point     |
| <kbd>Alt-Escape</kbd> | <kbd>Cmd-Escape</kbd> | exit the REPL and resume normal tests. |

You can also test out your selectors after using a breakpoint. Simply
put them right on the line, no `Givens`, `Whens`, or `Thens` needed:

     css=div.testing-selector

Honeydew will quickly search for your element and if it finds it, it
will pulse red for a second in the browser.

N.B.: If you're using Chrome and your DevTools console is open, it
will not work! The DevTools console conflicts with Honeydew, so you
may want to open up two browsers to the same page, or just use
Firefox, where it does work with an open console.

---

## Example tables

Any time you find yourself copying and pasting rules, you can probably
save yourself time by using an examples table. The examples table will
run the scenario once for each row of examples. If you don't need the
page to be loaded every time, load the page in a different scenario
from your examples scenario.

     Scenario: 1 load the page
     Given I am on the / page

     Scenario: verify elements
         Then the css=<element> element should be present

     Examples:
     | element |
     | .item1  |
     | .item2  |
     | .item3  |

---

## Elements

#### Finding them!?

The most common method of finding elements is CSS selectors, which are
explained in depth [over here](../features/finding-elements.md).

    <a id="unique" class="notUnique" name="email">Log In</a>

To select the above element, your options include:

| selector              | explanation                                       |
| -                     | -                                                 |
| `class=notUnique`     | class is "notUnique"                              |
| `id=unique`           | id is "unique"                                    |
| `link_text=Log In`    | visible text of link is "Log In" (case sensitive) |
| `tag_name=a`          | type of tag is <a></a>                            |
| `name=email`          | name attribute is "email"                         |
| `css=a[class^="not"]` | class starts with "not"                           |
| `css=a[class*="Uni"]` | class includes "Uni"                              |
| `css=a[class$="que"]` | class ends with "que"                             |

#### Pseudo Selectors

We've also included a few pseudo selectors in Honeydew that you can use:

* :visible - filters by is_displayed
* :contains('text') - filters by text, implies :visible
* :random - picks any element that matches

These can be chained in any order:

    css=.many:visible:random
    css=.many:contains('Hello'):random
    css=ul.list li:random:visible

#### Common tasks

Here are a few common tasks that you can use to validate
elements.

| rule                                                                                     | action                                      |
| -                                                                                        | -                                           |
| `When I click on the link css=#element`                                                  | Click on an element                         |
| `When I input "THIS TEXT" into the input field css=input`                                | Type into an input field                    |
| `When I reset the input field css=input`                                                 | Clear existing value in a text field        |
| `Then the id=element contains the text TextOnPage`                                       | Assert text in an element                   |
| `Then there should be exactly 2 of css=div[id]`                                          | Assert exactly N elements of a certain type |
| `Then the class=btn element should have the css background-color:rgba(250, 250, 250, 1)` | Assert CSS rules for an element             |

---

## Waiting for things

#### Waiting for Elements and Text

Use the following rule to check for text anywhere in the
<samp>body</samp> tag:

     Then I wait for the text (.*) to be present

This is not very specific, as it checks the entire page. You can wait
for a specific element to contain text like this:

     Then I wait for the css=div.locator:contains('text') element to be present

Without the contains, you can just wait for an element to be present.

     Then I wait for the css=div.locator element to be present

#### Waiting for AJAX and animations to complete

We've re-implemented the <samp>click and wait</samp> rule to handle
cases where the click sends off an AJAX requests or triggers an
animation. In those cases, Honeydew will check via javascript if there
are any unfinished AJAX requests or animated elements before
continuing the script.

     When I click and wait on the link id=ajax-animation

#### Waiting vs Pausing

Pausing, while easy, is unreliable and leads to either slow or flaky
tests. If you pause for too long, your test will be slow. If you don't
pause long enough, your test will fail whenever anything causes the
test to run slowly (Saucelabs, internet connection, slow Honeydew box,
... many factors!). Instead, explicitly wait for the thing you want to
interact with. You can wait for elements and text to be present in the
above section. See the below section to wait for AJAX or animations to
finish.

#### Forms: Input

* Input text into fields:

         When I input firstName into the input field css=input[type="text"]
         When I input a random e-mail address into the input field css=input[type="text"]
         When I input random text into the input field css=input[type="text"]
         When I input a timestamp into the input field css=input[type="text"]

* Select things from a dropdown:

         When I select United States from the css=select dropdown

    If the <samp>select</samp> is hidden, Honeydew can't click on
    it. You'll have to click on the replacement items:

         When I click on the button css=.dropdown-arrow
         When I click on the link link_text=United States

---

## Analytics: Omniture, Comscore, Google, DFP

#### Page load analytics

Omniture tags can be checked using the following template.

         Then I wait for an entire omniture request to include:
          events=event4
          eVar1=index
          v1=index
          prop8=unregistered
          prop8=un.*

To do comscore, google, or DFP requests, it's very similar: just
change `omniture` to the proper word (and use the appropriate tags, of
course):

         Then I wait for an entire comscore request to include:
         Then I wait for an entire google request to include:
         Then I wait for an entire dfp request to include:

You can specify a max duration timeout - by default, the rule will
wait up to 30 seconds, but you can also use a specific duration with
any of these rules:

         Then I wait 5 seconds for an entire omniture request to include:

You can also assert that a certain tag should be missing via `!`:

         Then I wait 5 seconds for an entire omniture request to include:
          !missing:

Or that a tag should not match a value or [regex][]:

         Then I wait 5 seconds for an entire omniture request to include:
          !not1=this text
          !not2=this.*regex

[regex]: ../faq/regex.md

#### On-Click Events

Omniture events are handled exactly with exactly the same rule!

         Then I wait for an entire omniture request to include:
          events:event9
          c6:m:search-query
          v6:m:search-query

You don't have to change anything at all about your script - just put
in the omniture rule after triggering the omniture request.

---

## Comparing text and attributes

You can store text or attributes in variables.

     When I store the inner text of the css=div.elem element as $innerText
     When I store the href attribute of the css=a.login element as $attribute

You can compare your variables later on: use <samp>the same as</samp>
or <samp>different from</samp> to compare.

     Then the inner text of the css=a.elem element should be the same as $innerText
     Then the href attribute of the a.signUp element should be different from $attribute

You can also run arbitrary javascript and save the result:

     When I set $myVarable = "return [1, 2, 3, 4, 5].reduce(function(a, b) {return a + b;});"

You need to <samp>return</samp> as the last thing in your javascript,
or else nothing will get stored into $myVariable.
