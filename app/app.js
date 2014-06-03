'use strict';

angular.module('honeydew', [
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

            if (url.search(/\?\/.*\.set$/) != -1) {
                var setName = url.slice(2);
                window.location.href = '/#/sets/' + setName;
            }
        })();

        // we used to store an unnecessarily large amount of data in
        // the setsAsJSON cookie, and it would be sent with every
        // single request, even backend ones. Let's stop doing that.
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
                controller: 'EditorCtrl',
                onEnter: ['$rootScope', '$location', function ($rootScope, $location) {
                    $rootScope.title = $location.path().split('/').pop();
                }]
            })
            .state('monitor', {
                url: '/monitor',
                templateUrl: 'monitor/monitor.html',
                controller: 'MonitorCtrl',
                onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.title = 'HD Monitors';
                }]
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
