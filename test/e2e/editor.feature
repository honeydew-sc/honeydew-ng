Feature: editor

$editor = 'http://localhost/editor/#/features/e2e/editor.feature'

 Scenario: auto-save changes
 Given I am on the $editor page
   When I input random text into the editor cm
     Then the page should contain $input
   When I pause for 2 seconds
   When I refresh the page
     Then the page should contain $input

 only Scenario: execute a job
 Given I am on the $editor page
   When I click on the link link_text=execute!
     Then the page should contain Executing...