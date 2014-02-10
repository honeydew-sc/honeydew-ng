Feature: editor

$editor = 'http://localhost/editor/#/features/e2e/delete-me.feature'

 Scenario: nothing to see here
 Given I am on the $editor page

 Scenario: auto-save changes
 Given I am on the $editor page
   When I input random text into the editor cm
     Then the page should contain $input
   When I pause for 2 seconds
   When I refresh the page
   Then the page should contain $input

 Scenario: preserve choices
 Given I am on the $editor page
   When I input random text into the input field css=[type='url']
   When I select IE 10 Local from the css=[ng-options] dropdown
   When I pause for 1 second
   When I refresh the page
     Then the css=[type='url']:contains('$input') element should be present
     Then IE 10 Local should be selected in the css=[ng-options] dropdown

 only Scenario: execute a job
 Given I am on the $editor page
   When I click on the link id=execute
     Then the page should contain Executing...