'use strict';

angular.module('honeydew', [
    'ngResource',
    'ngSanitize',
    'ngStorage',
    'ngGrid',
    'ui.codemirror',
    'ui.bootstrap',
    'ui.router',
    'doowb.angular-pusher',
    'treeControl',
    'ui.select',
    'ngAria',
    'ngMaterial',


    // internal modules
    'config',
    'sc.constants',
    'sc.hostname',
    'sc.cmmodes',
    'sc.settings'
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

        var defaultPath = '/';
        $urlRouterProvider.otherwise(defaultPath);

        var setTitleAndHistory = [
            '$rootScope', '$location', '$stateParams',
            function ($rootScope, $location, $stateParams) {
                if ($stateParams.path || $stateParams.set) {
                    $rootScope.title = $location.path().split('/').pop();
                }
                else {
                    $rootScope.title = 'Honeydew: Home';
                }
            }];

        function setTitle(title) {
            return ['$rootScope', function ($rootScope) {
                $rootScope.title = 'HD ' + title;
            }];
        }

        $stateProvider
            .state('editor', {
                abstract: true,
                templateUrl: 'components/filetree/filetree.html',
                controller: 'FileTreeCtrl'
            })
            .state('editor.landing', {
                url: '/',
                templateUrl: 'landing/landing.html',
                controller: 'LandingCtrl',
                onEnter: setTitleAndHistory
            })
            .state('editor.features', {
                url: '^/{path:.*\.(?:feature|phrase)}',
                templateUrl: 'editor/editor.html',
                controller: 'EditorCtrl',
                onEnter: setTitleAndHistory
            })
            .state('editor.sets', {
                url: '/sets/:set',
                templateUrl: 'set/set.html',
                onEnter: setTitleAndHistory
            })
            .state('editor.setId', {
                url: '/sets/:set/run/:run',
                templateUrl: 'set/set.html',
                onEnter: setTitleAndHistory
            })
            .state('monitor', {
                url: '/monitor',
                templateUrl: 'monitor/monitor.html',
                onEnter: setTitle('Monitors')
            })
            .state('report', {
                url: '/report/:report',
                templateUrl: 'report/report.html',
                onEnter: setTitle('Report')
            })
            .state('screenshot', {
                url: '/screenshot/:screenshot',
                templateUrl: 'screenshot/screenshot.html',
                controller: 'ScreenshotCtrl',
                onEnter: setTitle('Screenshots')
            })
            .state('status', {
                url: '/status?app',
                templateUrl: 'status/status.html',
                onEnter: setTitle('Environment Statuses')
            });
    })
    .config(function(pusherConfig, PusherServiceProvider) {
        // pusherToken is globally defined in app/config.js
        PusherServiceProvider
            .setToken(pusherConfig.pusher_auth_key)
            .setOptions({
                authEndpoint: '/rest.php/pusher/auth'
            });
    });
