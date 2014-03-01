'use strict';

angular.module('honeydew')
    .service('cmAutocomplete', function ($resource, $http) {
        var rules = [
            'Given I am on the (.*) page',
            'Given I am logged in on the (.*) page',
            'Given I am logged in to .mil on the (.*) page',
            'Given I am on the (.*) page waiting for the (.*) element',
            'When I refresh the page',
            'Then I go back to the previous page',
            'When I click on the link (.*)',
            'When I double click on the link (.*)',
            ' When I click and wait on the link (.*)',
            'When the (.*) element is present, then click on the link (.*), else click on the link (.*)',
            'When I trigger the omniture onClick event for the (.*)',
            'When I wait for the (.*) element to be visible',
            'When I pause for (.*) seconds',
            'Then I wait for the (.*) element to be present',
            'Then I wait for the text (.*) to be present',
            'Then I wait at most (\d+) seconds for the new (.*) element to be present',
            'When the (.*) element is present, continue clicking on the (.*) element',
            'When the (.*) element is not present, continue clicking on the (.*) element',
            'When I select (.*) from the (.*) dropdown',
            'When I input (.*) into the input field (.*)',
            'When I input a random e-mail address into the input field (.*)',
            'When I input random text into the input field (.*)',
            'When I input a timestamp into the input field (.*)',
            'When I input the sum of (.*) and (.*) into the input field (.*)',
            'When I reset the input field (.*)',
            'When I press the (.*) key on the (.*) element',
            'When I input (.*) into the editor (.*)',
            'Then I reset the editor (.*)',
            'When I store the inner text of the editor (.*) as $(.*)',
            'When I submit the form (.*)',
            'When I upload an image to (.*)',
            'When I upload the (.*) file to the (.*) element',
            'Then the checkbox (.*) should be checked',
            'Then the checkbox (.*) should not be checked',
            'Then (.*) should be selected in the (.*) dropdown',
            'Then the list (.*) includes the option (.*)',
            'When I choose (.*) from the (.*) datepicker',
            'When I log in as an example user',
            'When I focus on the iframe (.*)',
            'When I wait for the popup and focus it',
            'When I close the popup',
            'When I focus on the main window',
            'When I mouse over the element (.*)',
            'When I focus on the element (.*)',
            'Then I confirm the alert',
            'Then I dismiss the alert',
            'When I page up (.*) times',
            'When I page down (.*) times',
            'When I delete all of the cookies',
            'When I print out all of the cookies',
            'When I print out the body text',
            'When I print out the source',
            'When I store the (.*) attribute of the (.*) element as $(.*)',
            'When I store the inner text of the (.*) element as $(.*)',
            'When I add a cookie: { name => "(.*)", value => "(.*)", domain => "(.*)"}',
            'Then the (.*) cookie should be present',
            'When I delete the (.*) cookie',
            'When I set $(\w+) = "(.*)"',
            'When I set the browser size to (\d+x\d+)',
            'Then the page should contain (.*)',
            'Then the page should not contain (.*)',
            'Then the pattern (.*) should be in the page',
            'Then the javascript variable (.*) should contain (.*)',
            'Then the javascript variable (.*) should be the same as (.*)',
            'Then the url should be (.*)',
            'Then the url should match (.*)',
            'Then the url should not match (.*)',
            'Then the page should not reference qa, dev, or stage',
            'Then all of the links should have successful status codes',
            'When I parse the appointment data in the (.*) element',
            'Then the omniture image should be present',
            'Then the (.*) element should be visible',
            'Then the (.*) element should not be visible',
            'Then the element (.*) should have a background image with URL (.*)',
            'Then the (.*) element should have the attribute (.*)=(.*)',
            'Then the (.*) element should match the attribute pattern (.*) =~ (.*)',
            'Then the (.*) contains the text (.*)',
            'Then the (.*) attribute of the (.*) element should be the same as $(.*)',
            'Then the (.*) attribute of the (.*) element should be different from $(.*)',
            'Then the inner text of the (.*) element should be the same as $(.*)',
            'Then the inner text of the (.*) element should be different from $(.*)',
            'Then the (.*) element should have a secure (.*) attribute',
            'Then the (.*) element should have an empty (.*) attribute',
            'Then there should be exactly (\d+) of (.*)',
            'Then the (.*) element should be present',
            'Then the (.*) element should not be present',
            'Then the value of the element (.*) is (.*)',
            'Then the (.*) element should be editable',
            'Then the (.*) element should not be editable',
            'Then I hide the (.*) element',
            'Then I log out of Sharecare',
            'Then all the images should be loaded successfully'
        ];

        var autocompleteService = {
            getHints:  function (cm) {
                var cur = cm.getCursor();
                var token = cm.getTokenAt(cur);
                var line = cm.getLine(cur.line);
                var start = token.start;
                var end = token.end;
                var word = line;

                var source;

                if (token.state.allowPreamble) {
                    source = autocompleteService.getPreamble();
                    start = 0;
                }
                else {
                    source = autocompleteService.getSteps();
                    start = 1;
                }

                var result = source.filter( function (it) {
                    return it.toLowerCase().search(word.trim()) !== -1;
                });

                return {
                    list: result && result.length ? result : [],
                    from: CodeMirror.Pos(cur.line, start),
                    to: CodeMirror.Pos(cur.line, end)
                };
            },

            getPreamble: function () {
                return autocompleteService.preamble;
            },

            getSteps: function () {
                return autocompleteService.validSteps;
            },

            populateAutocompleteSources: function () {
                return $http.get('/rest.php/autocomplete').success(function (res) {
                    autocompleteService.validSteps = res.phrases.concat(rules);
                    autocompleteService.preamble = res.preamble;
                    autocompleteService.keywords = res.keywords;
                });
            }
        };

        autocompleteService.populateAutocompleteSources();

        return autocompleteService;
    });
