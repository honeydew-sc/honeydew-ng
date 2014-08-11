Feature: Auto Collapse

$test = '#/features/test.feature'
$branch = 'css=.tree-label span'
$leaf = 'css=.tree-label span:contains("feature")'

 Scenario: default settings is no collapse
 Given I am on the $test page
   When I reset the input field id=hostname
   When I click on the link id=execute
     Then the class=fa-chevron-left element should be visible

   When I click on the link $branch
   When I click on the link $leaf
     Then the class=fa-chevron-left element should be visible

 Scenario: show feature auto collapse
 Given I am on the $test page
   When I click on the link class=settings-pane
   When I click on the link css=label[btn-radio]

   When I click on the link $leaf
     Then the class=fa-chevron-right element should be visible

 Scenario: execute feature auto collapse
 Given I am on the $test page
   When I click on the link class=fa-chevron-right
   When I click on the link class=settings-pane
   When I click on the link css=label[btn-radio][ng-model*=execute]
   When I click on the link id=execute
     Then the class=fa-chevron-right element should be visible

 Scenario: turn off both
 Given I am on the $test page
   When I click on the link class=fa-chevron-right
   When I click on the link class=settings-pane
   When I click on the link css=label[btn-radio="0"]
   When I click on the link css=label[btn-radio="0"][ng-model*=execute]

 Scenario: check that the off setting still works
 Given I am on the $test page
   When I click on the link id=execute
     Then the class=fa-chevron-left element should be visible

   When I click on the link $branch
   When I click on the link $leaf
     Then the class=fa-chevron-left element should be visible
