angular.module('honeydew')
    .directive('cmClickableLink', function ($window) {
        return {
            restrict: 'C',
            link: function (scope, element, attrs) {
                var url,
                    text = element.text();

                element.bind('click', event => {
                    if (text.match(/^\w+\-\d+$/)) {
                        url = 'https://arnoldmedia.jira.com/browse/' + text;
                    }
                    else if (text.match(/\.feature$/)) {
                        url = '/#/features/' + text;
                    }
                    else if (text.match(/^@[\w\d_\-\.]+/)) {
                        url = '/#/sets/' + text.substring(1) + '.set';
                    }
                    else if (text.indexOf('http') !== 0) {
                        url = 'http://' + text;
                    }
                    else {
                        url = text;
                    }

                    $window.open(url, '_blank');
                });
            }
        };
    });
