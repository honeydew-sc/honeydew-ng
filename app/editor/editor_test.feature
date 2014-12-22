Feature: editor

$url = 'http://www.google.com'
$noPermissions = '/#/features/e2e/no-permissions.feature'
$new = '/#/features/Anew.feature'
$fileMenu = 'partial_link_text=File'

$hostname = 'class=hostname'
$executeButton = 'id=execute'
$reportsPanel = 'class=center-panel element'
$modal = 'class=hdew-modal'
$alert = 'css=.alert div element'

 Scenario: set up

 # chmod 0777 .
 Scenario: new file
 Given I am on the / page
   When I click on the link link_text=New Feature File
   When I reset the input field id=input-file
   When I input features/Anew.feature into the input field id=input-file
   When I input random text into the input field id=input-jira
   When I store the inner text of the css=.tree-label span element as $firstLeaf
   When I click on the link class=btn-submit
     Then the url should match \/Anew.feature
     Then the page should contain $input
     Then the css=.tree-label span element should contain the text Anew.feature

 Scenario: auto-save changes
 Given I am on the $new page
   When I input random text into the editor cm
     Then the page should contain $input
   When I pause for 2 seconds
   When I refresh the page
   When I pause for 1 second
   Then the page should contain $input

 Scenario: preserve choices
 When I set the browser size to 1440x1024
 Given I am on the $new page
   When I select IE 11 from the id=browser dropdown
   When I select Localhost from the id=server dropdown
   When I reset the input field $hostname
   When I input $url into the input field $hostname
 Given I am on the $noPermissions page
     Then the $hostname:contains('$url') element should be present
     Then IE 11 should be selected in the id=browser dropdown

 Scenario: execute a job
 Given I am on the $new page
   When I reset the input field $hostname
   When I input $url into the input field $hostname
   When I click on the link $executeButton
     Then the $reportsPanel element should be visible

 # ln -s $(pwd) /opt/honeydew/features/e2e
 Scenario: no permissions
 Given I am on the $noPermissions page
   When I input random text into the editor cm
     Then I wait for the text permission denied to be present

 Scenario: permalink
 Given I am on the $new page
   When I click on the link $fileMenu
   When I click on the link partial_link_text=Permalink
   When I wait for the $modal element to be visible
     Then the id=input-permalink element should be visible

 Scenario: delete file
 Given I am on the $new page
   When I click on the link $fileMenu
   When I click on the link partial_link_text=Delete
     Then the url should match #\/$
     Then the page should not contain $input

 # undo delete
 Given I am on the $new page
   When I click on the link $fileMenu
   When I click on the link partial_link_text=Undo
     Then the url should match new.feature

 # cleanup
   When I click on the link $fileMenu
   When I click on the link partial_link_text=Delete