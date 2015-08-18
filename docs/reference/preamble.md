# Preamble Options


## Existing Bugs

If there is already an existing open bug ticket for the feature you
are working on, and you know that the feature will fail, you can tell
Honeydew about it by using the <samp>Existing Bug</samp> preamble
option as follows:

    Feature: an existing jira ticket bug
    Existing Bug: SC-10000

If the feature passes, nothing different will happen, but if the
feature fails, instead of being reported as a <samp>Failure</samp>,
it's status will be <samp>Bugged</samp>, which will show up black on
the Dashboard.

## Email Notifications

To have a feature email you when it fails, add the following line to
the preamble:

    Feature: an email feature
    Email: your@email.com

As long as the <samp>Email</samp> line is after <samp>Feature</samp>
and before <samp>Scenario</samp>, it will send you an email every time
the feature fails.

## Subtitles

Subtitles will show at the bottom of the browser, and you can decide
how long the test should pause to let you read the subtitle. 2 seconds
is a good amount.

    Feature: read subtitles of the rules
    Subtitles: 2

## Keep Open

If you put <samp>Keep Open</samp> in the preamble, the browser will
not close if a rule fails or if the test runs to completion.

    Feature: keep the browser open
    Keep Open

## Global Variables

Similar to how you can set variables for use in rules, you can define
your own custom variables in the preamble that will be visible to the
all of the Scenarios in the file.

    Feature: use variables
    $home = 'http://www.sharecare.com'
    $away = 'http://www.doctoroz.com'

     Scenario: go to homepage
     Given I am on the $home page

## SScenarios

During test debugging or authoring, you may want to only run only a
specific scenario instead of the entire script to save time. You can
do this by putting an extra 's' in front of the Scenario like such:

     Scenario: this will be skipped now
         Then I wait 50 years for the css=never element to be present

     sScenario: Only this scenario will run
     Given I am on the /wonderful page

In the above example, only the second scenario will be run. If multiple
scenarios have the "sScenario", they will all run, as expected.

## User Agent

You can specify a device and the browser will masquerade as that
device by doing two things: first, setting the user agent to match
that device, and second, resizing the browser window as close as
possible to match your device.

    Feature: pretend to be ipad
    Agent: ipad

By default, the device will use the portrait dimensions; you can use
the landscape dimensions by specifying `landscape`.

    Feature: pretend to be landscape ipad
    Agent: landscape ipad

Your options for devices are:

     Agent: iphone4
     Agent: iphone5
     Agent: iphone6
     Agent: iphone6plus
     Agent: ipad_mini
     Agent: ipad
     Agent: galaxy_s3
     Agent: galaxy_s4
     Agent: galaxy_s5
     Agent: galaxy_note3
     Agent: nexus4
     Agent: nexus10

( As for the naming convention: underscores are used _only_ to separate
words; when a word or letter is followed by a number or vice versa, it
is simply mashed together. At the boundary between a word and another
word, an underscore is used for readability. )

The exact resolution & user agent definitions for these devices can be
found in the [project's Github repo][sua].

[sua]: https://github.com/gempesaw/Selenium-UserAgent/blob/master/lib/Selenium/devices.json
