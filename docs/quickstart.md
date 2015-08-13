## Quickstart

Honeydew is most effective when it's used to verify actions on a
page. We can compose a simple test that validates the Sharecare search
functionality.

#### Install Webdriver

First things first - you'll need to have a webdriver server running
locally on your computer. Here are some [detailed instructions][]
available on how to download and start up the server.

[detailed instructions]: faq/install-webdriver.md

#### Create a feature

Open up the [Honeydew website][honeydew] and create a new temporary file. Copy
and paste the following feature in to the editor:

```gherkin
Feature: Sitewide search

$search_bar = "id=ask-query"
$search_button = "id=ask-submit"

 Scenario: Should us take to the RealAge Test
 Given I am on the https://www.sharecare.com/search page
   When I input RealAge into the input field $search_bar
   When I click on the link $search_button
     Then the partial_link_text=RealAge Test element should be present
     Then the url should match /static/realage-test
```

Make sure your webdriver server is running (if you can't tell, it's
okay - Honeydew will double check for you!). Choose an environment
from the dropdown at the top of the page, or simply type
`https://www.stage.sharecare.com` into the input field. The options
should look something like this when you're ready:

![feature options](quickstart/feature-options.png)

Choose a browser, and hit the <button>execute</button> button over
there. You should be rewarded with some sweet automation testing
whether our sitewide search automatically takes us to the real age
test!

[honeydew]: https://honeydew.be.jamconsultg.com
