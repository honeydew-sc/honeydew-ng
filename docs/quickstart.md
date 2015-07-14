## Quickstart

Honeydew is most effective when it's used to verify actions on a
page. We can compose a simple test that validates the Sharecare search
functionality.

#### Install Webdriver

First things first - you'll need to have a webdriver server running
locally on your computer. Here are some [detailed instructions][]
available on how to download and start up the server.

[detailed instructions]: install-webdriver.md

#### Create a feature

Open up the [Honeydew website][honeydew] and create a new temporary file. Copy
and paste the following feature in to the editor:

```gherkin
Feature: Sitewide search

$search_bar = "id=ask-query"
$search_button = "id=ask-submit"

 Scenario: Should help us take the RealAge Test
 Given I am on the https://www.sharecare.com/search page
   When I input RealAge into the input field $search_bar
   When I click on the link $search_button
     Then the link_text=Take the RealAge Test element should be present
     Then the url should match /static/realage-test
```

We've got a [line-by-line breakdown][] of this feature available as well!

[honeydew]: https://honeydew.be.jamconsultg.com
[breakdown]: quickstart/breakdown.md
