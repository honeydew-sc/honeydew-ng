Feature: Jobs

$test = '/#/features/test.feature'

 Scenario: Smart browser switching
 Given I am on the $test page
   When I click on the link css=.hostname-group button
   When I click on the link css=.hostname-apps button:contains('<app>')
   When I click on the link css=.hostname-envs button:contains('<env>')
     Then <host> should be selected in the id=browser-choice dropdown

 Examples:
 | app    | env  | host                  |
 | Mobile | iOS  | Local Mobile Emulator |
 | SC     | prod | Chrome Local          |