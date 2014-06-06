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

        var defaultPath = '/';
        $urlRouterProvider.otherwise(defaultPath);

        var setTitleAndHistory = [
            '$rootScope', '$location', '$localStorage', '$stateParams',
            function ($rootScope, $location, $localStorage, $stateParams) {
                if ($stateParams.path) {
                    $rootScope.title = $location.path().split('/').pop();

                    var history;

                    if (!$localStorage.history) {
                        history = $localStorage.history = [];
                    }
                    else {
                        history = $localStorage.history;
                    }

                    history.unshift($location.path());
                    history = history.filter(function ( item, index, self ) {
                        return self.indexOf(item) === index;
                    });

                    if (history.length > 10) {
                        history.pop();
                    }
                }
                else {
                    $rootScope.title = 'Honeydew: Home';
                }
            }];

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
                controller: 'SetCtrl',
                onEnter: setTitleAndHistory
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
