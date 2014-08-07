'use strict';

angular.module('sc.hostname')
    .directive('hostnamePicker', function ( hostname ) {
        return {
            template:
            '    <div class="hostname-group">' +
                '  <div class="input-group" ng-class="{ open: Host.open}">' +
                '    <input class="form-control hostname" name="host" ng-model="Host.name.host" required placeholder="http://www.sharecare.com" id="hostname" ng-click="Host.open = false">' +
                '    <label class="sr-only" for="host">Hostname</label>' +
                '    <button type="button" class="btn btn-default" ng-click="Host.open = !Host.open">' +
                '      <span class="caret"></span>' +
                '      <span class="sr-only">Toggle Dropdown</span>' +
                '    </button>' +
                '    <ul class="dropdown-menu" role="menu">' +
                '      <button type="button" class="close" ng-click="Host.open = false">' +
                '        <span aria-hidden="true">&times;</span>' +
                '        <span class="sr-only">Close</span>' +
                '      </button>' +
                '      <li class="hostname-apps">' +
                '        <div class="btn-group">' +
                '          <button ng-repeat="app in Host.name.appOptions" type="button" class="btn btn-hdew app" ng-model="Host.name.app" btn-radio="app" ng-click="Host.emit(app, undefined)">{{ app }}</button>' +
                '        </div>' +
                '      </li>' +
                '      <li class="divider"></li>' +
                '      <li class="hostname-envs">' +
                '        <div class="btn-group">' +
                '          <button ng-repeat="env in Host.name.envOptions" type="button" class="btn btn-hdew env" ng-model="Host.name.env" btn-radio="env" ng-click="Host.emit(undefined, env)">{{ env }}</button>' +
                '        </div>' +
                '      </li>' +
                '    </ul>' +
                '  </div>' +
                '</div>',
            replace: true,
            scope: true,
            restrict: 'E',
            controller: function ( $scope, hostname ) {
                var self = this;
                self.name = hostname;

                self.emit = function (app, env) {
                    $scope.$emit('hostname:update', app, env);

                    if (env) {
                        self.open = false;
                    }
                };

            },
            controllerAs: 'Host'
        };
    });
