'use strict';

angular.module('honeydew')
    .directive('hostnamePicker', function (hostname) {
        return {
            template: [
                '<div>',
                    '<div class="btn-group">',
                        '<button ng-repeat="env in hostname.envOptions" type="button" class="btn btn-hdew env" ng-model="hostname.env" btn-radio="env">{{ env }}</button>',
                    '</div>',
                    '<div class="btn-group">',
                        '<button ng-repeat="app in hostname.appOptions" type="button" class="btn btn-hdew app" ng-model="hostname.app" btn-radio="app">{{ app }}</button>',
                    '</div>',
                    '<div class="btn-group">',
                        '<label class="sr-only" for="host">Hostname</label>',
                        '<input class="form-control hostname" name="host" ng-model="hostname.host" required placeholder="http://www.sharecare.com">',
                    '</div>',
                '</div>'
            ].join(''),
            replace: true,
            scope: true,
            restrict: 'E',
            link: function (scope, element, attrs) {
                scope.hostname = hostname;
            }
        };
    });
