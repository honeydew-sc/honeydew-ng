Feature: test behavior of right panels

$editor = "/editor2/#/features/e2e/delete-me.feature"
$font = "Carl"
$theme = "xq-dark"

 Scenario: set up
   When I set the browser size to 1600x1200

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
 | class=settings-pane      | Styles                  |
 | class=help-pane          | toggleComment           |

 Scenario: Help Panel has keyboard shortcuts
 Given I am on the $editor page
   When I click and wait on the link class=help-pane
     Then I wait for the text Ctrl-/ to be present
     
 only Scenario: Settings changes classes
 Given I am on the $editor page
   When I click and wait on the link class=settings-pane
   When I select $font from the id=font dropdown
     Then the class=$font element should be visible
   When I select $theme from the id=theme dropdown
     Then the class=cm-s-$theme element should be visible
   When I pause for 1 second
   When I refresh the page
     Then the class=$font element should be visible
     Then the class=cm-s-$theme element should be visible

