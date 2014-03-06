Feature: editor

$url = 'http://www.google.com'
$editor = '/editor/#/features/e2e/delete-me2.feature'
$noPermissions = '/editor/#/features/e2e/no-permissions.feature'
$new = '/editor/#/features/e2e/new.feature'

$hostname = 'css=[type="url"]'
$executeButton = 'id=execute'
$reportsPanel = 'class=center-panel element'
$modal = 'class=hdew-modal'
$alert = 'css=.alert div element'

 Scenario: set up
 When I set the browser size to 1600x1200

 Scenario: auto-save changes
 Given I am on the $editor page
   When I input random text into the editor cm
     Then the page should contain $input
   When I pause for 2 seconds
   When I refresh the page
   When I pause for 1 second
   Then the page should contain $input

 Scenario: preserve choices
 Given I am on the $editor page
   When I select IE 10 Local from the css=[ng-options] dropdown
   When I input $url into the input field $hostname
 Given I am on the $noPermissions page
     Then the css=[type='url']:contains('$url') element should be present
     Then IE 10 Local should be selected in the css=[ng-options] dropdown

 Scenario: execute a job
 Given I am on the $editor page
   When I reset the input field $hostname
   When I input $url into the input field $hostname
   When I click on the link $executeButton
     Then the $reportsPanel element should be visible

 Scenario: no permissions
 Given I am on the $noPermissions page
   When I input random text into the editor cm
     Then I wait for the text permission denied to be present

 Scenario: new file
 Given I am on the $editor page
   When I click on the link link_text=File
   When I click on the link partial_link_text=New
   When I input new.feature into the input field id=input-file
   When I input random text into the input field id=input-jira
   When I click on the link class=btn-submit
     Then the url should match \/new.feature
     Then the page should contain $input

 Scenario: delete file
 Given I am on the $new page
   When I click on the link link_text=File
   When I click on the link partial_link_text=Delete
     Then the url should match FAQ.feature
     Then the page should not contain $input

   When I click on the link link_text=File
   When I click on the link partial_link_text=Undo
     Then the url should match new

 Scenario: permalink
 Given I am on the $editor page
   When I click on the link link_text=File
   When I click on the link partial_link_text=Copy URL
   When I wait for the $modal element to be visible
     Then the id=input-permalink element should be visible