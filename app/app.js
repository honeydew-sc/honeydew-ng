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
        (function setLocationFromURL() {
            var url = window.location.search;

            if (url.search(/\?\/.*\.feature$/) != -1) {
                var featureName = url.slice(2);
                window.location.href = '/#/features/' + featureName;
            }
        })();

        document.cookie = 'setsAsJSON=; expires=Thu, 01-Jan-70 00:00:01 GMT;';

        var defaultPath = '/features/test/FAQ.feature';
        $urlRouterProvider.otherwise(defaultPath);

        $stateProvider
            .state('editor', {
                abstract: true,
                templateUrl: 'components/filetree/filetree.html',
                controller: 'FileTreeCtrl'
            })
            .state('editor.features', {
                url: '^/{path:.*\.(?:feature|phrase|set)}',
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
    })
    .run(function ($rootScope, $location, $stateParams) {
        $rootScope.title = $location.path().split('/').pop();
    });
