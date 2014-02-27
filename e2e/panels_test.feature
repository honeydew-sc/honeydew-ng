Feature: test behavior of right panels

$editor = '/editor/#/features/e2e/delete-me.feature'

 Scenario: panels open
 Given I am on the $editor page
   When I click and wait on the link <sidebar-panel-button>
     Then I wait for the text <panel-text> to be present
   When I click and wait on the link <sidebar-panel-button>
     Then the page should not contain <panel-text>

 Examples:
 | sidebar-panel-button     | panel-text              |
 | class=report-pane        | Loading...              |
 | class=samples-pane       | Logging in to Sharecare |
 | class=rules-pane         | Pages                   |
 | class=settings-pane      | Coming soon...          |
 | class=help-pane          | toggleComment           |

 Scenario: Help Panel has keyboard shortcuts
 Given I am on the $editor page
   When I click and wait on the link class=help-pane
     Then I wait for the text Ctrl-/ to be present