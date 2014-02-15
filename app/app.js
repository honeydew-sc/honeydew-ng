'use strict';

angular.module('honeydew', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngStorage',
    'ui.codemirror',
    'ui.bootstrap',
    'ui.router'
])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/features/test/dan.feature');

        $stateProvider
            .state('editor', {
                url: '/{path:.*\.(?:feature|phrase|set)}',
                templateUrl: 'editor/editor.html',
                controller: 'EditorCtrl'
            });
    });
