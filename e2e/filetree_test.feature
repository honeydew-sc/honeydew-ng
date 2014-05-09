Feature: FileTree

$test = '/#/features/e2e/filetree_test.feature'
$search = 'class=Features-search'
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

 Scenario: can search the trees
 Given I am on the $test page
   When I input filetree_test into the input field $search
   When I pause for 1 second
   When I click on the link css=.tree-label span:visible
     Then the css=.tree-label span:contains('filetree') element should be visible

 Scenario: should display another tree for grep searches
 Given I am on the $test page
   When I input $branch into the input field $search
     Then the class=search-results-tree element should be present
     Then the css=.search-results-tree .tree-label span element should contain the text e2e