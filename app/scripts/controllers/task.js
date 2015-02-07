'use strict';

angular.module('taskkaApp').controller('TaskCtrl', function($scope, FIREBASE_URL, $firebase, $location){
    var ref = new Firebase(FIREBASE_URL);
    var fbTask = $firebase(ref.child('tasks')).$asArray();

    $scope.tasks = fbTask;

	$scope.postTask = function(task) {
        fbTask.$add(task);
        $location.path('/browse');
    }
});