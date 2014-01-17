'use strict';

angular.module('honeydewApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/feature', {
        templateUrl: 'views/feature.html',
        controller: 'FeatureCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
