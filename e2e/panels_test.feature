Feature: test behavior of right panels

$editor = 'http://localhost/editor/#/features/e2e/delete-me.feature'

 Scenario: panels open
 Given I am on the $editor page
   When I click on the link <sidebar-panel-button>
     Then I wait for the text <panel-text> to be present
   When I click on the link <sidebar-panel-button>
     Then the page should not contain <panel-text>

 Examples:
 | sidebar-panel-button                        | panel-text              |
 | css=.east-panel li:nth-child(1) a.pane-icon | Loading...              |
 | css=.east-panel li:nth-child(2) a.pane-icon | Logging in to Sharecare |
 | css=.east-panel li:nth-child(3) a.pane-icon | Pages                   |