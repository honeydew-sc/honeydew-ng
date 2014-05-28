Feature: Monitor Tests

$monitor = '/monitor'

 Scenario: create a new monitor
 Given I am on the $monitor page
   When I input random text into the input field class=hostname
   When I click on the link id=add-set
   When I input $input into the input field id=filter
     Then the css=.col1.colt1.ngCellText should contain the text AskMD.set
     Then the css=.col2.colt2.ngCellText should contain the text $input
     Then the css=.col3.colt3.ngCellText should contain the text Chrome Local
     
   When I refresh the page
   When I input $input into the input field id=filter
	 Then the css=.col1.colt1.ngCellText should contain the text AskMD.set
     Then the css=.col2.colt2.ngCellText should contain the text $input
     Then the css=.col3.colt3.ngCellText should contain the text Chrome Local
   
 Scenario: delete that monitor
 Given I am on the $monitor page 
   When I input $input into the input field id=filter
   When I click on the link class=btn-danger
     Then the page should not contain .com$input

   When I refresh the page
     Then the page should not contain .com$input