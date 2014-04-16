'use strict';

angular.module('honeydew')
    .directive('hostnamePicker', function (hostname) {
        return {
            template:
            '    <div class="hostname-group">' +
                '  <div class="input-group" ng-class="{ open: open}">' +
                '    <button type="button" class="btn btn-default" ng-click="open = !open">' +
                '      <span class="caret"></span>' +
                '      <span class="sr-only">Toggle Dropdown</span>' +
                '    </button>' +
                '    <ul class="dropdown-menu" role="menu">' +
                '      <button type="button" class="close" ng-click="open = false">' +
                '        <span aria-hidden="true">&times;</span>' +
                '        <span class="sr-only">Close</span>' +
                '      </button>' +
                '      <li>' +
                '        <div class="btn-group">' +
                '          <button ng-repeat="app in hostname.appOptions" type="button" class="btn btn-hdew app" ng-model="hostname.app" btn-radio="app">{{ app }}</button>' +
                '        </div></li>' +
                '      <li class="divider"></li>' +
                '      <li>' +
                '        <div class="btn-group">' +
                '          <button ng-repeat="env in hostname.envOptions" type="button" class="btn btn-hdew env" ng-model="hostname.env" btn-radio="env">{{ env }}</button>' +
                '        </div>' +
                '      </li>' +
                '    </ul>' +
                '    <label class="sr-only" for="host">Hostname</label>' +
                '    <input class="form-control hostname" name="host" ng-model="hostname.host" required placeholder="http://www.sharecare.com" ng-click="open = false">' +
                '  </div>' +
                '</div>',
            replace: true,
            scope: true,
            restrict: 'E',
            link: function ( scope, element, attrs ) {
                scope.hostname = hostname;
            }
        };
    });
