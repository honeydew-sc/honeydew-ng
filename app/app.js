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
    'doowb.angular-pusher',
    'treeControl'
])
    .config(function ($stateProvider, $urlRouterProvider) {
        // $urlRouterProvider.otherwise('/editor/features/test/FAQ.feature');

        $stateProvider
            .state('editor', {
                url: '/editor',
                templateUrl: 'components/filetree/filetree.html',
                controller: 'FileTreeCtrl'
            })
            .state('editor.features', {
                url: '/{path:.*\.(?:feature|phrase|set)}',
                templateUrl: 'editor/editor.html',
                controller: 'EditorCtrl'
            });
    })
    .config(function(PusherServiceProvider) {
        // pusherToken is globally defined in app/config.js
        var token = typeof(pusherToken) === 'undefined' ? '' : pusherToken;
        PusherServiceProvider
            .setToken(token)
            .setOptions({
                authEndpoint: '/rest.php/pusher/auth'
            });
    });
