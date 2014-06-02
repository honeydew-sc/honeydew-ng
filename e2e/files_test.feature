Feature: file actions

$file = '/#/features/e2e/files_test.feature'
$fileMenu = 'partial_link_text=File'
$input = 'id=input-file'

 Scenario: copy a file 
 Given I am on the $file page
   When I click on the link $fileMenu
   When I click on the link id=copy
   When I reset the input field $input
   When I input features/Acopy.feature into the input field $input
   When I click on the link class=btn-submit
     Then the url should match Acopy.feature
     Then the page should contain files_test.feature
     
 Scenario: temporary copy
  Given I am on the $file page
   When I click on the link $fileMenu
   When I click on the link id=copy-temp
     Then the url should match \d+.feature
     Then the page should contain files_test.feature
 