Feature: Monitor Tests

$monitor = '/monitor'

 Scenario: create a new monitor
 Given I am on the $monitor page
   When I click on the link id=set
   When I input CORE into the input field class=ui-select-search
   When I wait for the css=#set span:contains('CORE') element to be present

   When I click on the link css=#set span:contains('CORE')
   When I reset the input field id=filter
   When I input random text into the input field class=hostname
   When I select IE 11 from the id=browser dropdown
   When I select Saucelabs from the id=server dropdown
   When I click on the link id=add-set

   When I input $input into the input field id=filter
     Then the css=.col2.colt2.ngCellText should contain the text $input
     Then the css=.col3.colt3.ngCellText should contain the text IE 11

   When I refresh the page
   When I input $input into the input field id=filter
     Then the css=.col2.colt2.ngCellText should contain the text $input
     Then the css=.col3.colt3.ngCellText should contain the text IE 11

 Scenario: delete that monitor
 Given I am on the $monitor page
   When I input $input into the input field id=filter
   When I click and wait on the link class=btn-danger
     Then the page should not contain .com$input

   When I refresh the page
     Then the page should not contain .com$input