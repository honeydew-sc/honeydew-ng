# All Honeydew Rules

[TOC]

## Pages

### Given I am on the (.\*) page

Visit a url. This \_must\_ be the first rule of the test. If you use
a relative URL, the hostname will be automatically prepended.

The input is a string - either a relative url, and Honeydew will
prefix it with the hostname, or a full url. The following will go
to the same page, assuming your hostname is http://www.google.com:

    Given I am on the /search page
    Given I am on the http://www.google.com/search page

There are some special conditions that can get triggered here.

- Army Sharecare: Honeydew will visit http and https versions of the
army website and obtain the necessary basic auth credentials so you
don't have to do anything special in your army tests. This works for
transparently all environments - dev, qa, stage, and
sharecare.com. The usage is the same as normal SC:

        Given I am on the /login page

    That rule will work for a hostname of http://www.qa.sharecare.com and
    http://army.qa.sharecare.com alike.

- Startle: Honeydew will add a cookie to get around the interstitial
popups in Startle, and then it will refresh the page.

### Given I am new user on the (.\*) page

Create a new user and navigate to a particular page, courtesy of the
SSO Kabocha API written by Jay Heinlein. We'll create an account
matching the pattern

    email: mysharecareqa+_____@gmail.com
    password: 123123123

After creating the account via the API, we'll get the browser logged
in and navigate to the page as requested.

### Given I am logged in on the (.\*) page

Instead of wasting time on interstitial pages, you can be logged in
automatically and start the test on the page that you need to be on.

### Given I am logged in to .mil on the (.\*) page

This rule will log you in to any .mil environment, based entirely on
your hostname. It will also forward you to the specified page after
login. Your options for hostname are as follows:

- https://armyfit.dev.sharecare.com
- https://armyfit.stage.sharecare.com
- https://test.armyfit.army.mil
- https://armyfit.army.mil
- https://ultimateme.dev.sharecare.com
- https://ultimateme.stage.sharecare.com
- https://armyfit.army.mil/UltimateMe

### Given I am on the (.\*) page waiting for the (.\*) element

Visit a url and wait for the element to be present. Honeydew does
this implicitly, so you shouldn't have to use this rule.

The first input is a relative or full URL. See the above Given
rule. The second input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

    Given I am on the /search page waiting for the id=search-bar element
    Given I am on the /search page waiting for the css=#search-bar element

### Given I am registering an encrypted user

As per SC-something, we are responsible for providing a way for third
parties to pass us a user's registration information in an encrypted
URL. This rule takes as input an examples table of user information to
encrypt, along with the rule itself, and it uses the exact same
Partner Registration jar to do the encryption. It will redirect you to
the registration pages after encrypting the user data.

### When I refresh the page

This simulates clicking the refresh button on the page. This rule can
be used to bypass the DS white screen/login failures for FF and
Chrome.

### Then I go back to the previous page

Equivalent to clicking the back button in the browser, navigates to
the previous page. No inputs.

## Clicks

### When I click on the link (.\*)

Click on the specified element. If this triggers a page load, Honeydew
will wait until the page finishes loading to proceed.

The input is a [CSS locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

    When I click on the link css=div.profile a

### When I click on the link (.\*) at offset ((.\*), (.\*))

Click on the specified eleemnt at an offset from the top left. By
default, Honeydew will try to do its clicks at the very center of the
element. If this isn't the behavior you want, you can use this rule to
specify an offset from the top left of the element. For example,

     When I click on the link css=a.login at offset ( 1, 1 )

This rule would click 1 pixel below and one pixel to the right of the
very top left of the element.

This will probably take a decent amount of trial and error, especially
if you're trying to use this rule across browsers or with different
sizes. It may not be worth the effort.

### When I double click on the link (.\*)

Double click on the specified element. If this triggers a page load, Honeydew will wait until the page finishes loading to proceed.

The input is a [CSS locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

    When I double click on the link css=div.profile a

### When I click and wait on the link (.\*)

This click waits for all ajax requests and jquery animations to be
complete. It does not intrinsically know about page loads, but
Honeydew automatically blocks on page load anyway.

The input is a [CSS locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

### When the (.\*) element is present, then click on the link (.\*), else click on the link (.\*)

Depending on whether or not the first specified element is present, this rule will either click on the first specified link or the second specified link.

All inputs are [CSS locators](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

    When the css=#conditional-element is present, then click on the link css=#click-when-present, else click on the link css=#click-when-not-present

### When I trigger the omniture onClick event for the (.\*)

Attempt to trigger an onClick omniture event. The input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

This is used for omniture events that are only fired after having
clicked on an element. Normally, clicking on an `<a>` will move
you to a new page, so we can't check the values of the javascript
variables in that event because we have gone to a new page with its
own context.

This rule uses window.onbeforeunload and prevents the page from
changing so you can look at the javascript variables. NB: this rule
will \_not\_ bring you to the next page; you'll need to re-do the click
normally using [When I click on the link](#when-i-click-on-the-link-42).

    When I trigger the omniture onClick event for the div=#ask-submit input element

### When I drag (.\*) to (.\*)

Drag one element on to another element. This requires jQuery on the
page, and will fail in mysterious ways if the page doesn't have
jQuery.

       When I drag id=column-a to id=column-b

### When I click and wait for a new (.\*)

When your page is using AJAX to redraw existing elements on the page,
it can be difficult to get the timing of your test down. Use this rule
to wait click on an element and then wait for it to be redrawn on the
new page.

    When I click and wait for a new id=form_next

## Waits

### When I wait for the (.\*) element to be visible

### When I wait (.\*) seconds for the (.\*) element to be visible

Wait for an element to be visible. This is useful if your element is
waiting for an AJAX call to finish.

The input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

### When I pause for (.\*) seconds

Useful when watching replay videos if you want to see scrolling or
focus effects. Pauses for (.\*) seconds, entered as a number not the
word (4 not four).

The input is a number.

### Then I wait for the (.\*) element to be present

### Then I wait (.\*) seconds for the (.\*) element to be present

Wait for an element to be present before proceeding. The input is a
[CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

By default, Honeydew will check for the element once a second for
thirty seconds.

    Then I wait for the css=div.waiting element to be present

You can also specify a maximum timeout to wait for your element. In
the following rule, Honeydew will check once a second for 3 seconds:

     Then I wait 3 seconds for the css=div.waiting element to be present

### Then I wait for the text (.\*) to be present

Wait for text to be visible on the page. The input is a string that
you expect to be eventually be on the page. Honeydew checks the
contents of the body tag every 5 seconds for 30 seconds.

    Then I wait for the text ajax request to be present

### Then I wait at most (\\d+) seconds for the new (.\*) element to be present

Wait for a new element to be present.

The first input is a non-negative number for the number of seconds you
wish to wait. The second input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

The usage of this rule is a bit tricky. When you invoke it, it will
count the number of elements that match the CSS locator you
specified. It will then wait for an additional nth-child instance of
that element to be present.

    Then I wait at most 5 seconds for the new css=ul li element to be present

In the above case, if there were already 5 `<li>`'s, the rule would wait
for css=ul li:nth-child(6) to be present.

### When the (.\*) element is present, continue clicking on the (.\*) element

This is a while loop - Honeydew will check for the $1 element. If it's
not present, nothing will happen. If the element is not present,
Honeydew will click on the $2 element and begin checking for the $1
element again. If after .25 seconds it's not present, Honeydew will
click on the $2 element again and so on.

Both inputs are [CSS
locators](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

    When the css=#current-date element is not present, continue clicking on the css=.next-month element

### When the (.\*) element is not present, continue clicking on the (.\*) element

This is a while loop - Honeydew will check for the $1 element. If it's
present, nothing will happen. If the element is not present, Honeydew
will click on the $2 element and begin checking for the $1 element
again. If after .25 seconds it's not present, Honeydew will click on the
$2 element again and so on.

Both inputs are [CSS
locators](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

    When the css=#current-date element is not present, continue clicking on the css=.next-month element

### When the (.\*) element is present, click on the (.\*) element

This is an if statement - Honeydew will check for the $1 element,
If the element is present, Honeydew will click on the $2 element.
If it's not present, nothing will happen.

Both inputs are [CSS
locators](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

    When the css=a.not-helpful element is present, click on the css=a.is-helpful element

### When the (.\*) element is not present, click on the (.\*) element

This is an if statement - Honeydew will check for the $1 element,
If the element is not present, Honeydew will click on the $2 element.
If it is present, nothing will happen.

Both inputs are [CSS
locators](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

    When the css=a.not-helpful element is not present, click on the css=a.is-helpful element

## Forms

### HIDE - When I click on the checkbox (.\*)

This is just an alias for [When I click on the
link](#when-i-click-on-the-link-42). It does exactly the same thing.

The input is a [CSS locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

    When I click on the checkbox css=a

### HIDE - When I click on the radio (.\*)

This is just an alias for [When I click on the
link](#when-i-click-on-the-link-42). It does exactly the same thing.

The input is a [CSS locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

    When I click on the radio css=a

### When I select (.\*) from the (.\*) dropdown

Select the $1 text in the $2 dropdown box. The first input is a string
that is used in a regular expression, and the second input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

Honeydew takes the CSS locator and searches for all of its children
`<option>`s. With that list of elements, Honeydew will go
through and check until it finds one whose text matches the first
input string and it will click on that. If the string matches two
options, it will click on the first one.

    When I select United States from the id=country-selection dropdown

You can also choose an item at random from a dropdown by using "a
random option" as the choice:

    When I select a random option from the id=country-selection dropdown

### When I input (.\*) into the input field (.\*)

### When I input (.\*) into the input field (.\*) as $(.\*)

Input random text or email into the input field specified. The first
input is a string - see below for more options. The second input is a
[CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

### When I input a random e-mail address into the input field (.\*)

a random e-mail address: This will input honeydewsc+xxxxx@gmail.com -
a new email address with five random characters. The password to that
account is "sharecare qa engineer" without the quotes. This is very
useful when creating new accounts.

### When I input random text into the input field (.\*)

random text: This will input five random characters into the input
field. This is useful when making wall posts or sending messages and
checking for their existence. "$input" will be set to the value of the
random text so it can be validated against later in your test.

### When I input a timestamp into the input field (.\*)

a timestamp: This will input the current date and time: 2012-11-2
11:45:39.

### When I input (.\*) characters into the input field (.\*)

n characters: You can insert a specified number of characters into a
field. This may be useful to check character truncation limits.

### When I input a random number into the input field (.\*)

a random number: You can input a random number between 40 and 280 into
the input field. Feel free to raise questions about this range, as it
was chosen at random.

### When I input the sum of (.\*) and (.\*) into the input field (.\*)

Pass in two elements with numbers in them, and a third element in
which to input the sum. All locators are [CSS
locators](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

    When I input the sum of id=human_num_1 and id=human_num_2 into the input field id=txtHomeSignupHumanVerify

### When I post (.\*) to my activity wall

Post the specified text to your own activity wall. For this to work,
you must already be logged in via the `When I log in as an example
user` rule.

     When I post a timestamp to my activity wall

The text to be posted allows for your own text, or any of the
following options (these are the same as the other input rules):

     a random e-mail address | honeydewsc+jawei@gmail.com
     10 characters           | aaaaaaaaaa
     a timestamp             | 2014-10-10 14:14:14
     random text             | jawei

### When I post (.\*) to the activity wall of (.\*)

Make a wall post on someone else's activity wall. Like all Kabocha
rules, you can choose the source by providing an examples table with
email\_address and password. Otherwise, one will be provided for
you. This rule lets you post on another user's activity wall; choose
the other user by supplying their email address.

     When I post random text to the activity wall of sumgai@mailinator.com

### When I find a (.\*) helpful with ID (.\*)

Create a Helpful notification on the user's activity wall.
Supply the content type ("video, "contentarticle", "slideshow",
"guide", "healthguide"), supply the video ID, plus a video title.

     When I find video helpful with ID 0299cd69-5528-4847-8383-fb577213a4da

### When I find a (.\*) helpful with ID (.\*) and title (.\*)

     When I find video helpful with ID 0299cd69-5528-4847-8383-fb577213a4da and title "Awesome Video"

### When I earn a badge for (.\*)

Creates an Earned Badge notification on a user's activity wall.
Supply a program name for a unique Earned Badge notification.

    When I earn a badge for random text

### When I update a blog with id=(.\*) and title=(.\*) to my activity wall

Creates a blog update notification on the user's activity wall. The
blog post has to be previously created to successfully post the
notification to the activity wall.  Supply the correct blog ID and a
blog title to post to the activity wall.  The title has the ability to
use random text and other unique text types.

     When I update a blog with id=ffa983e8-bf78-42d3-a446-c8f7202b80d6 and title=Test Post Text to my activity wall

### When I create a blog with id=(.\*) and title=(.\*) to my activity wall

Creates a blog notification on the user's activity wall. The blog post
has to be previously created to successfully post the notification to
the activity wall.  Supply the correct blog ID and a blog title to
post to the activity wall.  The title has the ability to use random
text and other unique text types.

     When I create a blog with id=ffa983e8-bf78-42d3-a446-c8f7202b80d6 and title=Test Post Text to my activity wall

### When I follow the user with ID (.\*)

Creates a follow notification on the current user's activity wall.
Supply the user's ID you wish to create a follow notification.

     When I follow the user with ID 14e7f6a2-d2a7-4d80-9400-7cfd42d161b9

### When I reset the input field (.\*)

Reset a specific input field. The input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

    When I reset the input field css=#input-field

### When I press the (.\*) key on the (.\*) element

Use this rule to send non-text keys to an element, like pressing enter
after typing your password in a form.

The first input is the key you wish to use. Choose from the following:
Backspace, Tab, Enter, Shift, Control, Pause, Spacebar, Page Up, Page
Down, End, Home, Left, Up, Right, Down, Insert, Delete.

The second input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

    When I press the Backspace key on the css=input element
    When I press the Tab key on the css=#tab element

### When I input (.\*) into the editor (.\*)

Use this rule for a richtext editor like CKEditor or TinyMCE
editor.

The first input is a text string that you wish to be inputted. The
options are the same as in [When I input (.\*) into the input field
(.\*)](#when-i-input-42-into-the-input-field-42).

For CKEditor, go into the console of the page and input
"CKEDITOR.instances" without the quotes. That will give you a list of
all of the editors on the page; these names are how Honeydew figures
out which one to use. For example, on http://ckeditor.com/demo ,
"CKEDITOR.instances" returns {editor1: b}, so in this rule we would
use "editor1".

    When I input random text into the editor editor1

### Then I reset the editor (.\*)

Reset the inner text of a CKEditor or TinyMCE editor. The input is the
name of the editor - see [When I input (.\*) into the editor
(.\*)](#when-i-input-42-into-the-editor-42) for more information about
getting the editor name.

### When I store the inner text of the editor (.\*) as $(.\*)

Store the inner text of a CKEditor or TinyMCE editor as a variable
for later comparison.

The first input is the name of the editor - see [When I input (.\*)
into the editor (.\*)](#when-i-input-42-into-the-editor-42) for more
information about getting the editor name. The second input is
whatever you want to use as the variable name.

### When I submit the form (.\*)

Pass in any element in a form and Webdriver will try to submit the
form. WebDriver has the convenience method "submit" on every
element. If you call this on an element within a form, WebDriver will
walk up the DOM until it finds the enclosing form and then calls
submit on that. If the element isn't in a form, then the
NoSuchElementException will be thrown.

This is useful when having browser problems clicking on a submit
button. It's slightly less realistic than actually clicking on the
button, but it's almost always successful, so it's more reliable.

The input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

    When I submit the form id=email
    When I submit the form id=password
    When I submit the form id=submit-button

NB: For whatever reason, Saucelabs always returns "undefined" to this
rule; since Honeydew can't tell whether that means the submit
succeeded or not, this rule will always pass.

### When I upload an image to (.\*)

Upload an image to the selected element. Use this rule to have the
Honeydew box choose an image to uplaod for you, so you don't have to
worry about it. The input is a CSS locator.

### DEPRECATED - When I upload the (.\*) file to the (.\*) element

Use this rule to upload files to a input type=file element. It will
not work on a flash element. The first option is the complete local
path to the local file - for example,
"/opt/honeydew/t/test-pages/gerenuks.jpeg". The second option is a the
locator for the type=file input tag.

### Then the checkbox (.\*) should be checked

### Then the radio (.\*) should be checked

Verify that the checkbox or radio specified by (.\*) is checked. This rule will
fail if selector is not a checkbox or radio.

### Then the checkbox (.\*) should not be checked

### Then the radio (.\*) should not be checked

Verify that the checkbox or radio specified by (.\*) is NOT checked. This rule will
fail if selector is not a checkbox or radio.

### Then (.\*) should be selected in the (.\*) dropdown

Validate that a dropdown has a selected item. Given a `<select>` tag, it'll go through all of the children `<option>`s. For
each option, it will check if the option's text matches the supplied
text. If the text matches, it will return whether or not that option
is selected.

Honeydew will have trouble if the dropdown is hidden or not visible.

The first input is a string used in a regular expression. The second
input is [a CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

    Then United States should be selected in the css=select dropdown

### Then the list (.\*) includes the option (.\*)

Verify that a desired option exists in a specified dropdown. The first
input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/);
the second input is a string that you want to specify.

### When I choose (.\*) from the (.\*) datepicker

Pass in a string date to be chosen from a date-picker.

The first argument is a strong of the form MM/DD/YYYY. The second
input is either a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/),
an ID, or a class. This rule does not accept the usual range of
Webdriver selector types.

    When I choose 07/02/2015 from the css=.hasDatepicker date-picker

You can apply the same date to multiple datepickers at the same time
if your selector applies to multiple elements - using a class that the
datepickers have in common works great for this, as shown in the above
example.

### When I log in as an example user

This automatically logs in to QA and Stage via SSO's REST interface by
means of Kabocha, courtesy of Jay Heinlein :D

### DEPRECATED - Then (.\*) should be displayed in the (.\*) dropdown

DEPRECATED - This is an alias for ["Then the list (.\*) includes the option (.\*)"](#then-the-list-includes-the-option).

This does \_NOT\_ specify that a choice is selected, only that it
exists. To assert that a dropdown should have an option selected, use
["Then (.\*) should be selected in the (.\*) dropdown"](#then-should-be-selected-in-the-dropdown).

### DEPRECATED - When I check the checkbox (.\*)

DEPRECATED - use [When I click on the
link](#when-i-click-on-the-link-42) instead.

"When I check the checkbox" now looks at the status of the cbox before
deciding whether or not to attempt to toggle it. If the cbox is
already selected/checked, then nothing happens and the rule succeeds;
otherwise it will try the following:

- Click using $webElement->click() - standard click.
- Type a "space" into the checkbox.
- Press the "Enter" key on the checkbox. This will probably submit your
form, and you probably don't want this.

The input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

### When I uncheck the checkbox (.\*)

This rule guarantees that a checkbox will be unchecked: it will clear
the box if the box is already selected; if the box isn't selected, it
will do nothing. It should "just work" with the styled span/input
combination that is also frequently used on Sharecare to create themed
checkboxes.

    When I uncheck the checkbox css=span[for="remember-me"]

### DEPRECATED - When I type (.\*) into the input field (.\*)

DEPRECATED - This is an alias for [When I input (.\*) into the input
field (.\*)](#when-i-input-42-into-the-input-field-42). This was was
previously used in Selenium RC to activate javascript
events. Webdriver alleviates these low-level concerns :)

## Focus

### When I focus on the iframe (.\*)

When working with iframes, you must actively focus them.

The input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/),
but you can also pass in "parent" to focus on the parent page instead
of any iframes.

    When I focus on the iframe css=iframe#iframe
    When I focus on the iframe parent

### When I wait for the popup and focus it

After clicking a link which should spawn a pop-up window or new tab,
enter this rule to focus the window after it is finished loading.

It doesn't take any inputs.

### When I close the popup

When finished with a popup window or tab, close it using this command
to continue sending commands to the main window. This is analogous to
focusing on the parent iframe - you're returning focus back to the
original window.

### When I focus on the main window

Use this to grant focus to the main window after interacting with a
popup window. This command is an alternative to 'When I close the
popup,' and works very well with Facebook popup windows that
automatically close. Also, you can switch back to the main window
without closing it if necessary.

### When I mouse over the element (.\*)

Move the mouse over the element $1 - this will move the element to the
top of the visible browser window if it is out of the current
viewport. If you have a sticky header, the element will be
underneath/behind the header and you will not be able to click on
it. You can get around this by [hiding elements](https://metacpan.org/pod/When&#x20;I&#x20;hide&#x20;the
element&#x20;\(.*\)).

The input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

    When I mouse over the element id=email

### When I focus on the element (.\*)

This is an alias for [When I mouse over the element
(.\*)](https://metacpan.org/pod/#when-i-mouse-over-the-element-42).

### Then I confirm the alert

Accepts the currently displayed alert dialog; usually this is
equivalent to clicking the 'OK' button in the dialog. NB: you must use
this rule \_immediately\_ after creating the alert; if any other
Webdriver command is sent while there is a javascript modal present,
it will fail.

### Then I dismiss the alert

Dismisses the currently displayed alert dialog. For comfirm() and
prompt() dialogs, this is equivalent to clicking the 'Cancel'
button. For alert() dialogs, this is equivalent to clicking the 'OK'
button. NB: you must use this rule \_immediately\_ after creating the
alert; if any other Webdriver command is sent while there is a
javascript modal present, it will fail.

### When I page up (.\*) times

The input is just a number.

    When I page up 1 time
    When I page up 4 times

### When I page down (.\*) times

The input is just a number.

    When I page down 1 time
    When I page down 4 times

### Given I open a new window to (.\*)

Opens a new window, focuses on to it, and navigates to
the specified to url.

## Other: Cookies, Printing, Storing, Size

### When I delete all of the cookies

Delete all of the cookies that Selenium can see. Seemingly randomly,
it may fail with error message "Could not delete cookie PHPSESSID";
add 'and do not end' to ignore this error.

### When I print out all of the cookies

Useful for debugging purposes, this will print a comma separated list
of the cookies that Selenium can see.

### When I print out the body text

Similar to above, useful for debugging purposes. This will print out
the entire body text of the focused window or iframe. For larger
pages, this will create a long report.

### When I print out the source

Print out the HTML source code of the page you're on.

### When I store the (.\*) attribute of the (.\*) element as $(.\*)

Save the value of an attribute of an element as a variable. For
example, you could store the href of an `<a>` as $href, and then refer
to it elsewhere within the program.

The first input is an attribute on the element, like: id, class, href,
src, data-type, for..., etc. The second input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/). The
last input is a string that you wish to use as the name of the variable.

    When I store the id attribute of the css=#absolute element as $variableName
    When I store the href attribute of the tag_name=a element as $href

### When I store the inner text of the (.\*) element as $(.\*)

Specify an element and store its text in a variable to be referenced
later. This is particularly useful in tandem with [When I input (.\*)
into the input field (.\*)](#when-i-input-42-into-the-input-field-42) -
use it to input random text and then store the text. Later, you can
assert that the page should contain the text for review.

The first input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/). The
second input is a string that you wish to use as the name of the
variable.

### When I add a cookie: { name => "(.\*)", value => "(.\*)", domain => "(.\*)"}

You can create a cookie with this rule. The quotes around each field
are mandatory and must be included.

- ` name `: REQUIRED, for example ` "JSESSIONID" `
- ` value `: REQUIRED, for example ` "023823hf2083-fhw8fhse-h238fh" `
- ` domain `: REQUIRED, for example ` ".sharecare.com" `
- ` path `: OPTIONAL, defaults to "/", but you may specify an alternate
path. If you're not sure, don't specify a path and Honeydew will take
care of it.

If you try to create a cookie for a different domain than the one you
are currently on, it will fail. You can only create cookies for the
domain you are on. If you are at www.qa.startle.com, this could be
"www.qa.startle.com", ".qa.startle.com", ".startle.com", or
"startle.com".

Some Examples:

    When I add a cookie: { name => "sc2-login-cookie-name", value => "sc2-expert-cookie", domain => ".sharecare.com"}
    When I add a cookie: { name => "sc2-login-cookie-name", value => "sc2-expert-cookie", domain => ".sharecare.com", path => "/"}

### Then the (.\*) cookie should be present

Check if a specified cookie is present in document.cookie. The input
is a string that is the name of the cookie.

### When I delete the (.\*) cookie

Delete a cookie. The input is the name of the cookie. You can see all
available cookies by putting "document.cookie" in the console without
quotes.

### When I set $(.\*) = "(.\*)"

This command executes arbitrary javascript on the page. The first
input must be a string of letter characters only - A-z; no numbers and
no special characters. The second input is javascript commands that
will be run on the page. You must have a "return" statement as the
final javascript command in order to set a value here.

This can be used to extract the current environment from the URL.

    When I set $env = "return window.location.href.match(/(.*)\.\w+\.com/)[1];"
    When I set $something = "alert('hello'); return 5;"

### When I set the browser size to (.\*)

Change the window dimensions of the browser to the specified size. The
dimensions are 'width x height', so you would want to say

    When I set the browser size to 800x600
    When I set the browser size to 1024x768

## Other: DataServer Users, Brightcove

### Then the user record should include (.\*)=(.\*)

### Then the user record should not include (.\*)=(.\*)

Query the SSO record for the user that you're logged in as and assert
that certain values have been properly persisted. This rule will only
work if you use an examples table with 'email\_address' and 'password'
as table headers:

     Then the user record should include gender=female

     Examples:
     | email_address     | password  |
     | ios@sharecare.com | 123123123 |

Here is the list of valid keys and value types:

     | dateOfBirth   | YYYY-MM-DD     | 1990-09-09              |
     | email         | <STRING>       | dgempesaw@sharecare.com |
     | expert        | true or false  | true                    |
     | gender        | MALE or FEMALE | MALE                    |
     | height        | <FLOAT>        | 70                      |
     | weight        | <FLOAT>        | 70                      |
     | firstName     | <STRING>       | Daniel                  |
     | lastName      | <STRING>       | Daniel                  |
     | city          | <STRING>       | Atlanta                 |
     | country       | <STRING>       | Afghanistan             |
     | postalCode    | <INTEGER>      | 30305                   |
     | state         | <STRING>       | Georgia                 |
     | middleInitial | <STRING>       | X                       |
     | uri           | <STRING>       | /user/daniel-gempesaw-6 |

### When I cheer another user

Specify a user in the examples, and this rule will do the following:

1\. SumGai2 will follow your user.
2\. Your user will cheer SumGai2. This will only show on your user's wall.
3\. SumGai2 will stop following your user.

     When I cheer another user

     Examples:
     | email_address     | password  |
     | ios@sharecare.com | 123123123 |

### Then I set the user record to (.\*)

Use this rule to reset a user's record in dataserver to anything you'd
like. It will determine the user via the example table provided; you
MUST provide an examples table or the rule will blow up your test. The
input is a JSON object.

     Then I set the user record to { "firstName": "Elise", "lastName": "Piders", "zip": 12345 }

     Examples:
     | email_address     | password  |
     | ios@sharecare.com | 123123123 |

### Then I set the (.\*) team to (.\*)

Update the data about a specified team to the json object o you
provide. The first input is the ID of the team; the second input is a
json object that you'd like to update the team to be. Note that the
team ID is probably not what you expect. It's derived from the name of
the team upon its instantiation, with some characters replaced by
hyphens; it may be difficult to get this without using the Team
Service API.

     Then I set the join-me team to { "name": "join yourself" }

     Examples:
     | email_address     | password  |
     | ios@sharecare.com | 123123123 |

This rule requires an examples table with a user who is the owner of
the appropriate team.

### Then I set the password to (.\*)

Reset a user's password. Like the above rule, you MUST provide an
examples table, or the rule will blow up your test. The input is
whatever string you'd like to change the password to.

         Then I set the password to 456456456

     Examples:
     | email_address        | password  |
     | tester@sharecare.com | 123123123 |

### When I play the brightcove video #(.\*)

Honeydew will search the page for a brightcove video and attempt to
play it. This might flake out if the video is created in a
non-standard manner; please let me know if it doesn't work on a
certain page and we can adjust the rule.

     When I play the brightcove video

The digit is optional - without an argument, it will play the first
video. Otherwise, you can play a specific video by referring to it
thusly:

     When I play the brightcove video #2
     When I play the brightcove video #4

The first video is 1; if there are 4 videos available, the last video
would be 4. Choosing a video out of the range will probably not go
well.

## Screenshots

### When I take a reference screenshot

If you want
to manually override the known good reference and replace it with a
new one, use the reference version of the rule:

     When I take a reference screenshot

To force reference screenshoting of a particular element with a custom name:

     When I take a reference screenshot of css=#login as login

### Then I compare to the reference screenshot

Put this rule in your test to automatically take screenshots at the
current URL. Note that the screenshots will be differentiated by the
following:

    build
    url
    browser

If a screenshot for your particular browser/url combination already
exists, this rule will compare the current window against the known
good reference and display a diff if the images are too disparate.

If no reference screenshot exists for the current browser/url, one
will be saved for use in the next time you run the test. That means
you can just put this rule in your test

       Then I compare to the reference screenshot

And the first time the test runs, it will save a reference. The next
time the test runs, it will compare to that reference.

### Then I compare to the reference screenshot of (.\*) as (.\*)

Take a screenshot of a particular element on the page. The first
argument is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/);
the second argument is an optional custom name for your screenshot. We
will use the locator to find the element, get its exact pixel location
& size, and save a screenshot based on those coordinates & dimensions.

     Then I compare to the refernce screenshot of css=#login
     Then I compare to the refernce screenshot of css=#login as login

You can/should optionally use the `as (.*)` directive to name your
screenshot; see the following rule for more information.

### Then I compare to the reference screenshot as (.\*)

Name your screenshot something unique - this helps distinguish between
screenshots taken on the same page. By default, the screenshot
filename has the build, url, and browser in it. If you take two
screenshots on the same page of different elements, the default
filenaming will overwrite each other. Instead, you can use this rule
to name the screenshots after each element.

When forcing a reference screenshot, you should use the same `as
(.*)` name and we will coordinate the filenames for you:

     When I take a reference screenshot as myCustomName
       Then I compare to the reference screenshot as myCustomName

### Then I compare to the reference screenshot without (.\*)

Take a screenshot of the entire page, but black out certain sections
of the page so that they aren't included in the screen shot
comparison. This is useful if you want to ignore ads or content/copy
that changes on the page. However, it will not help very much if
things are moving a \_lot\_ on the page - for example, if your ad
sometimes loads 3 items and sometimes loads 6 items, this rule may not
provide as much assistance as hoped.

     Then I compare to the reference screenshot without (.*)

### Then I wait for the password reset email to arrive for (.\*)

Log in to our catch all email address at SharecareQA@gmail.com and
wait for a new email to arrive with a password reset link in it. You
must pass the name of the user that is expecting a password reset email.

         Then I wait for the password reset email to arrive for Amber Jenkins

## Querying: Strings

### Then the page should contain (.\*)

Look for the exact string of text in the page. The input is the string
you want to assert the presence of.

This rule gets all of the text in the body tag and checks if your text
is anywhere in there.

### Then the page should not contain (.\*)

Assert that the text is not present on the page, anywhere! The input
is the string you want to assert the presence of.

This rule gets all of the text in the body tag and checks if your text
is anywhere in there.

### Then the pattern (.\*) should be in the page

Check whether a regular expression matches anywhere in the source. The
input is a regular expression that is matched against the raw HTML
source text of the current page.

### Then I wait for the javascript variable (.\*) to match (.\*)

Wait an optional amount of time for the javascript variable to meet
the constraints. If you don't specify a timeout, the rule will wait
for three minutes (180 seconds).

    Then I wait for the javascript variable username to match sharecare
    Then I wait 10 seconds for the javascript variable username to match sharecare
    Then I wait 10 minutes for the javascript variable username to match sharecare

### Then the javascript variable (.\*) should contain (.\*)

Check if a javascript variable on the page matches. The first input is
the name of the javascript variable. The second input is a bit more
complicated. You can do "should contain a, b, c, or d" to specify
multiple possibilities - Honeydew will split the string on the commas
and the "or" and build a regular expression to compare against the
variable. You can also just pass it a regular expression as the second input.

    Then the javascript variable thisVarIsEmpty should be empty and do not end
    Then the javascript variable thisVarIsEmpty should contain something, else, or be empty

    Then the javascript variable hasAValue should contain aValue
    Then the javascript variable hasAValue should contain aValue, notThis, or be empty

    Then the javascript variable thisVarIsEmpty should match (2|)

    Then the javascript variable hasAValue should contain anything
    Then the javascript variable hasAValue should contain notThis, anything, or be empty

    Then the javascript variable property1 should contain directory and do not end

    Then the javascript variable property3 should contain people - location

    Then the javascript variable property1 should contain directory or not this
    Then the javascript variable property1 should contain not this or directory

### Then the javascript variable (.\*) should match (.\*)

Check if a javascript variable matches the specified value. The first
input is a string and should be visible in the global scope - that is,
you should be able to type it into the console and get a value
back. The second input is a regular expression.

### Then the javascript variable (.\*) should be empty

Check that the javascript variable is either equal (===) to null or
undefined.

### Then the javascript variable (.\*) should not contain (.\*)

Check that a javascript variable doesn't contain any of the specified
values. See above for details on how to construct a 'contains' list.

    Then the javascript variable property1 should contain not this or directory

### Then the javascript variable (.\*) should not match (.\*)

Check that a javascript variable does not match a regular expression.

### Then the javascript variable (.\*) should be the same as (.\*)

Check if a javascript variable is exactly the same as another
one. Both inputs must be javascript variables, and capitalization
matters.

    Then the javascript variable s.eVar1 should be the same as s.prop1

### Then the comscore request should include (.\*)=(.\*)

### Then the omniture request should include (.\*)=(.\*)

### Then the google request should include (.\*)=(.\*)

### Then the dfp request should include (.\*)=(.\*)

### Then the comscore request should not include (.\*)=(.\*)

### Then the omniture request should not include (.\*)=(.\*)

### Then the google request should not include (.\*)=(.\*)

### Then the dfp request should not include (.\*)=(.\*)

Using BrowserMob Proxy, validate that there was a request in the HAR
that included the requested query parameters. This rule would work
wonderfully with an examples table:

     Then the comscore request should include <param>=<value>

     Examples:
     | param | value   |
     | c1    | 1578392 |

Both wildcards accept strings - the first should be the Beacon
Parameter, and the second should be the expected value of the
parameter.

### Then the comscore tag (.\*) should be the same as (.\*)

### Then the omniture tag (.\*) should be the same as (.\*)

### Then the google tag (.\*) should be the same as (.\*)

### Then the dfp tag (.\*) should be the same as (.\*)

### Then the comscore tag (.\*) should not be the same as (.\*)

### Then the omniture tag (.\*) should not be the same as (.\*)

### Then the google tag (.\*) should not be the same as (.\*)

### Then the dfp tag (.\*) should not be the same as (.\*)

Assert that a given omniture or comscore tag should match the value of
another tag.

     Then the omniture tag eVar1 should be the same as prop1

### Then I wait for the comscore request to match (.\*)=(.\*)

### Then I wait for the omniture request to match (.\*)=(.\*)

### Then I wait for the google request to match (.\*)=(.\*)

### Then I wait for the dfp request to match (.\*)=(.\*)

This is the 'wait-patiently' version of the comscore/omniture rule. It
will try to wait for a ComScore or Omniture request where one of the
query parameters matches the asserted value. The value can be a
regular expression.

     Then I wait for the comscore request to match <tag>=<value>

     Examples:
     | param | value |
     | c1    | 1578  |

The default timeout is 180 seconds; you can specify your own timeout
as follows:

     Then I wait 10 seconds for the omniture request to match eVar1=index
     Then I wait 10 minutes for the omniture request to match eVar1=index

### Then I wait for an entire comscore request to include:

### Then I wait for an entire omniture request to include:

### Then I wait for an entire google request to include:

### Then I wait for an entire dfp request to include:

### Then I wait (.\*) seconds for an entire comscore request to include:

Unlike the other analytics rules, this rule checks that a single
request contains all of the lines in the ensuing table. Note that this
is \_NOT\_ the same as an examples table - it will only run once, not
once per line. If you don't specify any lines beneath it, this rule
... may blow up, or pass gracefully, we're not sure.

     Then I wait for an entire comscore request to include:
      c1=hello
      c2=goodbye

     Then I wait 5 seconds for an entire comscore request to include:
      c1=hello
      c2=goodbye

### Then the url should be (.\*)

Specify exactly what the url of the current page should be.

### Then the url should match (.\*)

Use a regular expression to assert what the url should be. The input
is a regular expression that is compared against the current URL.

### Then the url should not match (.\*)

Use a regular expression to assert what the url should not be. The
input is a regular expression that is compared against the current
URL.

### Then the page should not reference qa, dev, or stage

Parses the entire page for img, link, and script tags; if it finds
one, it inspects the href or src attribute for 'qa','dev', or 'stage'
and prints out the reference if it fails. Note that this can and will
generate false positives, so feel free to use 'and do not end'
liberally.

### Then all of the links should have successful status codes

Parses the entire page for a tags; if it finds one, it inspects the
href attribute and attempts to get the headers of that link. Note that
this does generate false positives, so if you get a result you don't
expect, please double check it.

### When I parse the appointment data in the (.\*) element

Pass in the locator of an element with appointment data in
it. In general, these are of the form "css=div.pending"; to
choose the fourth appointment, you could do
"css=div.pending:nth-child(4)".

The rule will attempt to parse the text and stores the following
variables:

- name: $patientName
- date: $apptDate (MM/DD/YYYY)
- time: $apptTime (HH:MM AM EST)

## Querying: Elements

### Then the omniture requests should use the right account

Assert that all omniture requests on the page go to the proper
account. For production, we should be using `sharecareprod`. For all
other environments, we expect to use `sharecaredev`. DrOz has
analogous accounts: `sharedrozprod` and `sharedrozdev`. If you want
to assert your own account, get in touch and we can add it in for you!

### Then the (.\*) element should be visible

Assert that an element should be visible. The input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

### Then the (.\*) element should not be visible

Assert that an element should be visible. The input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

### Then the (.\*) element should have the css rule (.\*):(.\*)

Assert that the css style of an element should match a certain
value. For example, if you wanted to assert that the .follow-button
element should have a background-color of rgba(250, 250, 250, 1), you
could write

    Then the class=follow-button element should have the css rule background-color:rgba(250, 250, 250, 1)

### Then the (.\*) element should not have the css rule (.\*):(.\*)

Assert that the css style of an element should NOT match a certain
value. For example, if you wanted to assert that the .follow-button
element should have a background-color of rgba(250, 250, 250, 1), you
could write

    Then the class=follow-button element should not have the css rule background-color:rgba(250, 250, 250, 1)

### DEPRECATED - Then the (.\*) element should have (.\*) style of (.\*)

DEPRECATED - Assert that the css style of an element should match a certain
value. For example, if you wanted to assert that the .follow-button
element should have a background-color of rgba(250, 250, 250, 1), you
could write

    Then the class=follow-button element should have background-color style of rgba(250, 250, 250, 1)

### DEPRECATED - Then the (.\*) element should not have (.\*) style of (.\*)

DEPRECATED - Assert that the css style of an element should NOT match a certain
value. For example, if you wanted to assert that the .follow-button
element should have a background-color of rgba(250, 250, 250, 1), you
could write

    Then the class=follow-button element should not have background-color style of rgba(250, 250, 250, 1)

### Then the element (.\*) should have a background image with URL (.\*)

Use when an element's background image is set in its CSS property. The
first input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/). The
second input is either the relative URL or the fully qualified URL of
the image.

    Then the element css=body.isAdmin should have a background-image with URL /images/bg_header.gif?v=0
    Then the element css=body.isAdmin should have a background-image with URL http://static.sharecare.com/images/bg_header.gif?v=0

### Then the (.\*) element should have the attribute (.\*)=(.\*)

Assert the attribute of an element - for example

    Then the element link_text=Click Me should have the attribute style="left: 0px".

Using this rule, you can also assert the href of an a, as

    Then the element id=element should have the attribute href="/theUrl.html"

The first input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/). The
second input is the name of an attribute, like "id", "class", "href",
"src", etc. The third and last input is a string that specifies what
the value of the attribute should be.

### Then the (.\*) element should match the attribute pattern (.\*) =~ (.\*)

Similar to ["Then the (.\*) element should have the attribute (.\*)=(.\*)"](#then-the-element-should-have-the-attribute), you can assert that the attribute of an element should match a regular expression.

The first input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/). The
second input is the name of an attribute, like "id", "class", "href",
"src", etc. The third and last input is a regular expression that
specifies what the value of the attribute should be.

    Then the css=div.class element should match the attribute pattern href =~ ^http.*\.com$

### Then the (.\*) element should contain the text (.\*)

Verify that the element has the specified text somewhere inside
it. Partial text matches also succeed: specifying "Welcome" would
match the phrase "Welcome to the website!"

The first input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/). The
second input is a string that is compared against the text of the
specified element.

    Then the css=.datePicker element contains the text 07/28/2015

### Then the title should match (.\*)

### Then the title should not match (.\*)

Since the title is not technically visible on the page, it requires a
separate rule to validate its contents. The only argument is a regular
expression, as you're used to.

     Then the title should match this-expression

If you want an exact match, surround your argument with ^ and $ like
so:

     Then the title should match ^exactly-this-string$

Be sure to escape the special regex chars.

### Then the (.\*) attribute of the (.\*) element should be the same as $(.\*)

Use in tandem with its partner [When I store the (.\*) attribute of
the (.\*) element as
$(.\*)](#when-i-store-the-42-attribute-of-the-42-element-as-42).

The first input is the element attribute; the second input is the
element; the third input is the same name that you used in the partner
storing rule for the variable name. See the partner rule for more
information.

    Then the href attribute of the css=.special element should be the same as $previousVariable

### Then the (.\*) attribute of the (.\*) element should be different from $(.\*)

Use in tandem with its partner [When I store the (.\*) attribute of
the (.\*) element as
$(.\*)](#when-i-store-the-42-attribute-of-the-42-element-as-42).

The first input is the element attribute; the second input is the
element; the third input is the same name that you used in the partner
storing rule for the variable name. See the partner rule for more
information.

    Then the href attribute of the css=.special element should be different from $previousVariable

### Then the inner text of the (.\*) element should be the same as $(.\*)

Use in tandem with its partner [When I store the inner text of the
(.\*) element as
$(.\*)](#when-i-store-the-inner-text-of-the-42-element-as-42).

The first input is the element; the second input is the same name that
you used in the partner storing rule for the variable name. See the
partner rule for more information.

    Then the inner text of the css=.special element should be the same as $previousVariable

### Then the inner text of the (.\*) element should be different from $(.\*)

Use in tandem with its partner [When I store the inner text of the
(.\*) element as
$(.\*)](#when-i-store-the-inner-text-of-the-42-element-as-42).

The first input is the element; the second input is the same name that
you used in the partner storing rule for the variable name. See the
partner rule for more information.

    Then the inner text of the css=.special element should be the different from $previousVariable

### Then the (.\*) element should have a secure (.\*) attribute

Assert that a particular element has a secure src or href
attribute. The rule will check if the attribute starts with 'https://'
and fail if it doesn't.

The first input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/). The
second input is the name of the attribute - usually "href" or "src".

### Then the (.\*) element should have an empty (.\*) attribute

You should be able to assert that a particular element has no
particular attribute, or that its attribute is empty - for example, an
element that doesn't have a class can be asserted to have an empty
class attribute.

The first input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/). The
second input is the name of the attribute like "href" or "src" or "class".

### Then there should be exactly (.\*) of (.\*)

Specify an exact count for a certain type of elements. The first
argument is a number, and the second argument is a CSS locator.

     Then there should be exactly 5 of css=h1

### Then there should be more than (.\*) of (.\*)

Assert that there are at least N of a certain element on the page.

     Then there should be more than 5 of css=li.wall-activity

### Then there should be less than (.\*) of (.\*)

Assert that there are lass than N of a certain element on the page.

     Then there should be less than 5 of css=li.wall-activity

### Then the (.\*) element should be present

Validate the element $1 is in the page. The input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

Note that this is not the same as "visible" on the page - elements can
be present but not visible.

    Then the css=.show-me element should be present

### Then the (.\*) element should not be present

Validate the element $1 is not on the page. The input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

Note that this is not the same as "visible" on the page - elements can
be present but not visible.

    Then the css=#hidden element should not be present

### Then the value of the element (.\*) is (.\*)

Assert that an element's text or value exactly matches the specified value.

The first input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/). The
second input is a string that should be compared against. This does a
strict string equality comparison, not a regular expression match.

Do not quote the second argument

    Then the value of thelement css=span#special-text is special text

### Then the (.\*) element should be editable

Validate that the element $1 is editable. The input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

### Then the (.\*) element should not be editable

Validate that the element $1 is not editable. The input is a [CSS
locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

### Then I hide the (.\*) element

Use javascript to hide an element. This sets the elem.style.display of
the specified element to none via javascript. The input is a [CSS locator](http://honeydew.be.jamconsultg.com/docs/reference/finding-elements/).

    Then I hide the id=nav element

### Then I log out of Sharecare

Log out of SSO and Sharecare by navigating to /logout.

    Then I log out of Sharecare

Also, "Then I log out of SSO via javascript" no longer uses
ssoservice.logout(), since it didn't work in IE. Instead, it uses the
/logout method.

### Then all the images should be loaded successfully

Verify that all of the `<img>` tags on the page are
successfully loaded, using img.complete in IE and
img.naturalHeight/img.naturalWidth in non-IE browsers.

It's might be a bit fragile, so it might pop up some false positives...

### When I set a breakpoint

This will stop your test at this rule and let you interact with the
browser. Use Ctrl-Alt-Enter/Ctrl-Cmd-Enter for Windows/OS X to evaluate the
line at point to the browser.

## Proxy

### Given I mock my location as (.\*)

### When I mock my location as (.\*)

Using this rule, you can mock your location and you'll get different
ad results based on where the server thinks you are. On the backend,
we're using `X-Forwarded-For` on all requests, and if the server is
inspecting that header, it will think you're somewhere else.

## Mobile

### When I hide the keyboard

Mobile only: hide the keyboard.

    When I hide the keyboard

### When I tap at (.\*)

Do a tap via pixels or percentages, ONLY ON MOBILE.

     When I tap at 0.5, 0.5

### When I join the (.\*) team

Join a team by its name. Teams are only on mobile, so although there
is nothing stopping you from using this rule elsewhere, I'm not sure
why you'd want to.

### When I leave the (.\*) team

Leave a team by its name. Teams are only on mobile, so although there
is nothing stopping you from using this rule elsewhere, I'm not sure
why you'd want to.

When comparing an entire analytics request, we accept a rule like:

     Then I wait for an entire comscore request to include:
     tag=value
     tag2=value2

This function turns the family of expected tags into a hashref with
keys as param name and values as param value:

    {
        tag => 'value',
        tag2 => 'value2'
    }
