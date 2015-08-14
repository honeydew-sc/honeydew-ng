## Locator Basics

#### id=unique

This is the best type of locator that you can use, because it
(theoretically) will never get mistaken for another element. So, as
long as nothing in the UI changes, your test will be rock solid - in
fact, using _id_ is resilient to the majority of UI changes since it
is not at all dependent on the hierarchy or anything else. Only a
direct change to the particular id you're using will break your test,
and that's probably indicative systematic changes on the page, so your
test needs to be re-assessed anyway. In terms of speed, it's one of
the fastest ways to look up an element because it only has to check
against the ids on the page.

When possible, use `id=unique` as your selector. To find the _id_ of the
element that you want, Right Click it in Chrome or Firefox and choose
'Inspect Element' - the console will show up, highlighting your
element and it should show you whether or not there is an _id_
attribute on your element.

| html                      | locator          |
| -                         | -                |
| `<div id="unique"></div>` | `css=#unique`    |
|                           | `css=div#unique` |
|                           | `id=unique`      |

#### class=might_be_unique

Classes aren't guaranteed unique, but often times they may be unique,
and that's exactly what we want! This is an edge case for locators,
but if you're lucky, the class on the element will be unique and won't
be found anywhere else on the page.

Make sure to search the source for any other instances of that class
name! Otherwise your locator will find a different element from the
one you are expecting.

| html                               | locator              |
| -                                  | -                    |
| `<div class="unique-class"></div>` | `class=unique-class` |
|                                    | `css=.unique-class`  |

You can also specify multiple classes on one element:

| html                              | locator               |
| -                                 | -                     |
| `<div class="fancy pants"></div>` | `css=div.fancy.pants` |

#### Meet the parents

If your specific element doesn't have a unique _id_ or _class_ on it,
the next thing to check is its direct parent element, grand parent
element, and/or great-grandparent element. If a nearby ascendent
element has an identifier, use that to narrow down the search!

    Don't <button>Click me!!!</button>

    <div id="useful" class="clickMe">
      <div class="no-id">
         <div class="no-id">
           <button>Click me!!!</button>
         </div>
      </div>
    </div>

In this example, we're trying to click on the button inside the div,
but there's two of the exact same`<button>` element. Neither of them
have an ID or a unique class, but looking at the parent elements of
the intended button, we see that there is an _id_ up there. The
following selectors would all choose the second button element:

| locator                                           | notes                                                                                                                    |
| -                                                 | -                                                                                                                        |
| `css=#useful button`                              | best                                                                                                                     |
| `css=div#useful button`                           | also the best, maybe even slightly better as its easier for a user to see what to look for                               |
| `css=div#useful div.no-id button`                 | technically correct, but the div.no-id doesn't add anything, and makes the selector more brittle                         |
| `css=div#useful div.no-id div.no-id button`       | again, this selector is too brittle - it depends on 4 elements in specific succession                                    |
| `css=div#useful > div.no-id > div.no-id > button` | too brittle, depends on 4 elements to be direct parent/children                                                          |
| `css=.no-id button`                               | not bad, but when possible use IDs instead of classes. 2nd best                                                          |
| `css=div.no-id button`                            | also not bad; 2nd best.                                                                                                  |
| `css=div.no-id > button`                          | not bad, but avoid using the direct descendent `>` selector if possible                                                  |
| `css=div.clickMe button`                          | not bad, clickMe is a unique class, but it's better to use `no-id` as it's on a closer div (parent vs great-grandparent) |

#### Attractive Attributes

Sometimes we don't have any _id_ or _class_ in sight - none on the
element, and nothing in its parents- a barren wasteland of elements
with no helpful markup. We can also use attributes to locate elements!
I try not to use this one as much because there are no guidelines
surrounding attributes, so they can be anything, any time - it's can
get wild out there!

    <img src="awkwardPromPhoto.png">
    <img src="cutePromPhoto.png" title="Cute">

So, to pick the second `<img>` instead of the first, all you have to do is

| locator                                          | notes                                                                                                                                |
| -                                                | -                                                                                                                                    |
| `css=img[title="Cute"]`                          |                                                                                                                                      |
| `css=img[src="cutePromPhoto.png"]`               | For things like images that usually have a _src_ attribute, or anchors that usually have an _href_ attribute, you can also use those |
| `css=img[src="CutePromPhoto.png"][title="Cute"]` | you can also multiple attributes at once                                                                                             |

#### nth-child(n) of mine

For some things, it's really hard for the devs to add _id_, like wall
posts, blog posts, lists of followers, etc - there is no way to tell
how many there will be, and as far as the front end is concerned,
they're all the same thing anyway. In this case, you can use
`:nth-child(n)`.

To use this, you basically specific the type of element you want and
figure out how many of them come before it that you don't want. So, if
you want the third `<li>` on the page, you could do
`li:nth-child(3)`. Let's look at an example - usage of this is pretty
tricky so be careful.

    <ul class="first"><li>1 stuff!</li>
      <li>2 stuff!</li>
      <div>bad markup!</div>
      <li>3 stuff!</li>
      <li>4 stuff!</li>

    <ul class="second"><li>5 stuff!</li>
      <li>6 stuff!</li>
      <li>7 stuff!</li>
      <li>8 stuff!</li>
    </ul>

To get the `3 stuff` `<li>` element using nth-child, you'd do

    css=ul.first li:nth-child(3)

This says, "look at the `<ul>` with the class `first`, then look at
its children and pick the third `</ul></li>`. If you were to skip the
leading `ul.first`, and just did `css=li:nth-child(3)`, your selector
would actually return two elements, as there are two `<li>` that are
the third child of their parents: `3 stuff` and `7 stuff`.

Again, this one is pretty tricky so definitely get someone to double
check your stuff if you're having a hard time with it.

## Special Cases

There are some shortcuts you can take to save yourself time!

#### Links

Links are pretty important, and being able to click on them is kind of
a big deal, so WebDriver has two shortcuts for clicking on links based
on the text inside of the `<a>` tags: `link_text` and
`partial_link_text`. If you use `link_text` you need to include all of
the text in there, and not leave out anything - `partial_link_text`
should do partial matches.

    <a href="stuff.html">Cool, huh</a>

Note that if you're using these, you CANNOT combine them with the
other special css techniques that we've been looking at. To locate
that link, you could use:

* `link_text=Cool, huh`
* `partial_link_text=Cool,`
* `partial_link_text=huh`

If possible I stay away from these, but when I'm in a hurry I use them
because it's much easier to find link text compared to ids, classes,
parents, etc. I have the baseless opinion that link text will change
more frequently than _id_ or _class_, so in that sense it might be
more brittle.

#### :contains('stuff')

I wrote a small `contains` evaluator - it will go look at all the
elements that match your selector, and then it will check inside those
elements for the text you want. Contains currently can only be on the
very last part in the css selector:

    <div id="cool">hello
      <div>good bye</div>
      <div>seeya</div>
    </div>

* `css=#cool div:contains('good bye')`
* `css=#cool div:contains('seeya')`
* `css=div:contains('hello')`

## Miscellenia & Troubleshooting

Webdriver actually supports a bunch of special types of selectors, not
just CSS ones:
[their documentation is pretty helpful.](http://code.google.com/p/selenium/wiki/JsonWireProtocol#/session/:sessionId/element)

#### What to do if my locator doesn't work

There's a bunch of potential reasons why a locator might fail, but
here are some common ones:

* Typos - make sure what you're searching for matches what is on the
  page

* While IDs are supposed to be unique, nothing forces them to be. When
  devs make a mistake, there can be multiple elements with the same
  _id_ attribute.

* Iframes - WebDriver is very sensitive to iframes - they're basically
  a black box on the page that Webdriver cannot see into. In order to
  interact with elements inside an iframe, you need to 'focus' on the
  iframe first.

* Page load race - if WebDriver starts looking for an element before
  it is present, it will fail, even though the element eventually
  shows up. This 'race' between WebDriver and the browser is a
  non-trivial problem but as a stop-gap, implicit or explicit waits
  can be used sparingly, with the knowledge that each second wasted
  waiting is costly.

#### General Tips

*   _id_ is the best!

*   Depend on hierarchy as _little_ as possible - don't include the
    elements in the middle if you don't need to, because it just makes
    the selector more brittle:

        css=div#farAway div.kindaFar div.closer div.almost span

    vs

        css=div#farAway span

    It's a contrived example, but assuming they found the same span
    element, the two locators above are very different. On the left, it
    depends on 5 levels of specific hierarchy - parent div, child div,
    parent div, child div, etc - AND all of those divs need specific
    classes. On the right, it's just 2 elements - a div#farAway, and
    somewhere it should have a child/grandchild/great-grandchild/.../ span
    element.

*   Remove as much as possible from your locators while still making
    them successful. This is sort of the same thing as above, but the
    more sparse your selectors are, the less prone they will be to
    getting outdated from a minor change.

*   If something's killing you and you can't find it, don't spin your
    wheels all day on it! Go to your devs, tell 'em you want an _id_ on
    your element, or its parent element, maybe make a ticket, and do
    something else until a new build comes out. Let's be as efficient
    about this as we can :)

#### Links

* CSS Diner: Feast on CSS Selectors!
  [http://flukeout.github.io/](http://flukeout.github.io/)

* Test out `nth-child` and `nth-of-type` selectors:
  [http://nth-test.com/](http://nth-test.com/)
