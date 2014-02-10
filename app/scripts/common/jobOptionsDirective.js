'use strict';

angular.module('honeydew')
    .directive('jobOptions', ['browserOptions', function (browserOptions) {
        return {
            templateUrl: 'views/jobOptions.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                scope.browserList = browserOptions.allBrowsers;

                console.log(scope.browserList);
            }
        };
    }]);


angular.module('honeydew')
    .service('browserOptions', function () {

        var localBrowsers = [
            { name: "IE 10 Local", group: "Current Local" },
            { name: "Chrome Local", group: "Current Local" },
            { name: "FF Local", group: "Current Local" }
        ];

        var grandPoobahBrowsers = [
            { name: "GP IE 10 Local", group: "GP: 10.10.0.83" },
            { name: "GP Chrome Local", group: "GP: 10.10.0.83" },
            { name: "GP FF Local", group: "GP: 10.10.0.83" }
        ];

        var sauceBrowsers = [
            { name: "Windows 2012 - IE 10", group: "SauceLabs OnDemand" },
            { name: "Windows 2012 - IE 11", group: "SauceLabs OnDemand" },
            { name: "Windows 2003 - FF", group: "SauceLabs OnDemand" },
            { name: "Windows 2003 - Chrome", group: "SauceLabs OnDemand" }
        ];

        this.allBrowsers = localBrowsers.concat(grandPoobahBrowsers).concat(sauceBrowsers);
        this.setBrowsers = grandPoobahBrowsers.concat(sauceBrowsers);
    });
