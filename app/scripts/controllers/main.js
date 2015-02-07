'use strict';

/**
 * @ngdoc function
 * @name taskkaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the taskkaApp
 */
angular.module('taskkaApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
