'use strict';

angular
  .module('netflixinterviewApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'ui.utils'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
