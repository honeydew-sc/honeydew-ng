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
        $urlRouterProvider.otherwise('/report/live/qwerqwer');

        $stateProvider
            .state('editor', {
                url: '/{path:.*\.(?:feature|phrase|set)}',
                templateUrl: 'editor/editor.html',
                controller: 'EditorCtrl'
            })
            .state('report', {
                url: '/report/live/:channel',
                templateUrl: 'report/report.html',
                controller: 'ReportLiveCtrl'
            });
    })
    .config(['PusherServiceProvider', function(PusherServiceProvider) {
        PusherServiceProvider.setToken('68985');
    }]);
