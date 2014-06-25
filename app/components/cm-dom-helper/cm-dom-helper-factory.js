'use strict';

angular.module('honeydew')
    .factory('CmDomHelpers', function ($location) {
        var factory = this;

        factory.focus = function (cm, $scope) {
            // sorry. for whatever reason, the dropdown
            // retains the open class when clicking into the
            // codemirror. Seems like CM swallows the click or
            // something; clicking on not CM parts of the page
            // hide the dropdown just fine.
            cm.on('focus', function (cm) {
                $scope.$apply( function () {
                    document.querySelectorAll('.file-nav-dropdown')[0]
                        .classList.remove('open');
                });
            });

        };

        factory.clickableLinks = function ($) {
            // :( I don't know why, but a directive
            // with restrict: 'C' wasn't picking up on these spans
            // when added by the mode highlighter. Manually
            // $apply()ing and $digest()ing didn't seem to make a
            // difference
            $('.CodeMirror').on('click', '.cm-clickable-link', function(event) {
                var url = $(event.target).text();

                // link to sets from the features page
                if (url.match(/^@[\w\d_\-\.]+/)) {
                    url = '/#/sets/' + url.substring(1) + '.set';
                }
                // JIRA tickets
                else if (url.match(/\w+\-\d+/)) {
                    url = 'https://arnoldmedia.jira.com/browse/' + url;
                }
                // from the set page, link to its features
                else if (url.match(/.feature$/)) {
                    url = '/#/features/' + url;
                }
                // normal/boring links
                else if (url.indexOf('http') !== 0) {
                    url = 'http://' + url;
                }

                return window.open(url, '_blank');
            });
        };

        return factory;
    });
