Feature: FileTree

$test = '/editor/#/features/e2e/filetree_test.feature'

$filetree = 'class=sidebar-wrapper'

$branch = 'css=.tree-label span'
$leaf = 'css=.tree-label span:contains("feature")'

 Scenario: should be open by default
 Given I am on the $test page
     Then the $filetree element should be visible
     
 Scenario: should collapse when required
 Given I am on the $test page
   When I click on the link class=fa-chevron-left
   When I pause for 1 second
   When I click on the link class=fa-chevron-right
     Then the $filetree element should be visible
     
 Scenario: can switch to a new file
 Given I am on the $test page
   When I click on the link $branch
   When I click on the link $leaf
     Then the url should not match filetree_test