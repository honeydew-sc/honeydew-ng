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
        $urlRouterProvider.otherwise('/features/test/FAQ.feature');

        $stateProvider
            .state('editor', {
                url: '/{path:.*\.(?:feature|phrase|set)}',
                templateUrl: 'editor/editor.html',
                controller: 'EditorCtrl'
            });
    })
    .config(function(PusherServiceProvider) {
        // pusherToken is globally defined in app/config.js
        PusherServiceProvider
            .setToken(pusherToken)
            .setOptions({
                authEndpoint: '/rest.php/pusher/auth'
            });
    });
