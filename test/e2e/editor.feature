Feature: editor

$base = 'http://localhost/editor/#/features/'
$editor = 'http://localhost/editor/#/features/e2e.feature'

 Scenario: auto-save changes
 Given I am on the $editor page
   When I input random text into the editor cm
     Then the page should contain $input
   When I pause for 2 seconds
   When I refresh the page
     Then the page should contain $input

 Scenario: copy to a new file
 Given I am on the $editor page
   When I click on the link link_text=File
   When I click on the link link_text=Copy
   When I input e2e2.feature into the input field id=destination

 Given I am on the $base/e2e2.feature page
     Then the page should contain $input