Feature: Validate Hostname Service

$test = '/#/monitor'

 Scenario: Environments show initially
 NB: This must be the first scenario! The whole point of this test is
 to check with an empty localStorage cache

 Given I am on the <test> page
   When I click on the link css=.hostname-group button
     Then there should be more than 2 of css=.hostname-envs button

 Examples:
 | test                         |
 | /#/features/test/dan.feature |
 | $test                        |
 | /dashboard                   |

 Scenario: Choosing an app changes the environments
 Given I am on the $test page
   When I click on the link css=.hostname-group button
   When I click on the link css=.hostname-apps button:contains('DROZ')
     Then there should be exactly 3 of css=.hostname-envs button
   When I click on the link css=.hostname-apps button:contains('Mobile')
     Then there should be exactly 2 of css=.hostname-envs button

 Scenario: Choosing an app and an environment
 Given I am on the $test page
   When I store the inner text of the id=hostname element as $oldHost
   When I click on the link css=.hostname-group button
   When I click on the link css=.hostname-apps button
   When I click on the link css=.hostname-envs button
     Then the inner text of the id=hostname element should be different from $oldHost