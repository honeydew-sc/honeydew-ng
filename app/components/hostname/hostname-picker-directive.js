'use strict';

angular.module('honeydew')
    .directive('hostnamePicker', function (hostname) {
        return {
            template: [
                '<div>',
                '<div class="btn-group">',
                '<button ng-repeat="env in hostname.envOptions" type="button" class="btn btn-primary env" ng-model="env" btn-radio="{{ env }}">{{ env }}</button>',
                '</div>',
                '<label class="sr-only" for="host">Hostname</label>',
                '<input class="form-control hostname" name="host" ng-model="hostname.host" required placeholder="http://www.sharecare.com">',
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
