'use strict';

angular.module('honeydew', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngStorage',
    'ngGrid',
    'ui.codemirror',
    'ui.bootstrap',
    'ui.router',
    'btford.markdown',
    'doowb.angular-pusher'
])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/features/e2e/highlight.feature');

        $stateProvider
            .state('editor', {
                url: '/{path:.*\.(?:feature|phrase|set)}',
                templateUrl: 'editor/editor.html',
                controller: 'EditorCtrl'
            });
    });
