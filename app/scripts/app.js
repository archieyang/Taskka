'use strict';

/**
 * @ngdoc overview
 * @name taskkaApp
 * @description
 * # taskkaApp
 *
 * Main module of the application.
 */
angular
  .module('taskkaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .constant('FIREBASE_URL', 'https://taskka.firebaseio.com/')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
      .when('/post', {
        templateUrl: 'views/post.html',
        controller: 'TaskCtrl'
      })
      .when('/edit', {
        templateUrl: 'views/edit.html'
      })
      .when('/browse', {
        templateUrl: 'views/browse.html',
        controller: 'TaskCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
