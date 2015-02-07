'use strict';

/**
 * @ngdoc function
 * @name taskkaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the taskkaApp
 */
angular.module('taskkaApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
