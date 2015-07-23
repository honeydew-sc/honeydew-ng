# Honeydew

Honeydew is a feature-based browser automation suite based on the
[Selenium](http://www.seleniumhq.org) project. It accepts as input a
feature file written in structured English and parses that file for
instructions for actions to perform on a browser. Honeydew can drive
browsers wherever there is a Selenium Webdriver jar running: your
desktop, someone else's desktop, and SauceLabs are all potential
candidates for this.
## Kabocha

[Kabocha] is our micro-service testing framework, led by Jay
Heinlein. Kabocha verifies our micro-services, and it gives us
reliable feedback within seconds about a new build's validity. This
way, we can push back on a build immediately, instead of waiting for
it to come up in a manual test later.

Kabocha also has an excellent test
[harness for the new RAT microservices][krat]. The harness enables us
to record a traversal of any RAT assessment and then re-run that
traversal, asserting that the exact same question path is fulfilled
and that the RealAge does not deviate outside of expected bounds.

[<img src="kabocha-rat-home.png" width="49%"> <img src="kabocha-rat-success.png" width="49%">][krat]

