'use strict';

angular.module('taskkaApp').controller('TaskCtrl', function($scope, FIREBASE_URL, $firebase, $location, $routeParams){
    var ref = new Firebase(FIREBASE_URL);
    var fbTask = $firebase(ref.child('tasks')).$asArray();
    var taskId = $routeParams.taskId;

    $scope.tasks = fbTask;
    console.log("route" + $routeParams);
    console.log("taskId -> " + taskId);

	$scope.postTask = function(task) {
        fbTask.$add(task);
        $location.path('/browse');
    }

    if(taskId) {
        $scope.selectedTask = getTask(taskId);
    }

    function getTask(taskId) {
        return $firebase(ref.child('tasks').child(taskId)).$asObject();
    }
    $scope.updateTask = function(task) {
        $scope.selectedTask.$save(task);
        $location.path('/browse');
    }
});