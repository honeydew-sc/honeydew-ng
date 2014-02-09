'use strict';

angular.module('honeydew', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.codemirror',
    'ui.bootstrap',
    'ui.router'
])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/features/test/dan.feature');

        $stateProvider
            .state('editor', {
                url: '/{path:.*\.(?:feature|phrase|set)}',
                templateUrl: 'views/editor.html',
                controller: 'EditorCtrl'
            });
    });
