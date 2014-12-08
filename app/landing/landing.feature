Feature: Landing page

 Scenario: modals open
 Given I am on the / page
   When I click on the link=New Feature File
   When I wait for the class=modal-dialog element to be visible

 Given I am on the / page
   When I click on the link=temporary file
     Then the url should match \d+\.feature

 Scenario: history works
 Given I am on the / page
   Then the partial_link_text=test/tmp element should be present
