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
    'firebase',
    'toaster',
    'angularMoment'
  ])
  .constant('FIREBASE_URL', 'https://taskka.firebaseio.com/')
  .run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
        if(error === "AUTH_REQUIRED") {
          $location.path("/login");
        }
      }
    );
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseCtrl'
      })
//            .when('/post', {
//                templateUrl: 'views/post.html',
//                controller: 'TaskCtrl'
//            })
//            .when('/edit/:taskId', {
//                templateUrl: 'views/edit.html',
//                controller: 'TaskCtrl'
//            })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          }
        }
      })
      .when('/browse/:taskId', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
