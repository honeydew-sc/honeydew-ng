Feature: file actions

$file = '/#/features/e2e/files_test.feature'
$fileMenu = 'partial_link_text=File'
$modal_input = 'id=input-file'

 Scenario: copy a file
 Given I am on the $file page
   When I click on the link $fileMenu
   When I click on the link id=copy
   When I reset the input field $modal_input
   When I input features/Acopy.feature into the input field $modal_input
   When I click on the link class=btn-submit
     Then the url should match Acopy.feature
     Then the page should contain files_test.feature

 Scenario: temporarily copy
  Given I am on the $file page
   When I click on the link $fileMenu
   When I click on the link id=copy-temp
     Then the url should match \d+.feature
     Then the page should contain files_test.feature

 # cleanup
   When I click on the link $fileMenu
   When I click on the link partial_link_text=Delete

 Scenario: move a file
 Given I am on the $file page
   When I click on the link $fileMenu
   When I click on the link id=copy-temp

   When I pause for 1 second
   When I refresh the page
     Then the url should not match files_test.feature

   When I click on the link $fileMenu
   When I click on the link id=move
   When I input moved.feature into the input field $modal_input
   When I click on the link class=btn-submit

     Then the url should match moved.feature
     Then the url should not match \d+.feature

     Then I go back to the previous page
     Then the page should contain No such file or directory

 # cleanup
   When I click on the link $fileMenu
   When I click on the link partial_link_text=Delete