angular.module('taskkaApp').controller('BrowseCtrl', function ($scope, $routeParams, toaster, Task, Auth) {
    $scope.searchTask = '';
    $scope.tasks = Task.all;
    $scope.signedIn = Auth.signedIn;
    $scope.listMode = true;

    if($routeParams.taskId) {
        var task = Task.getTask($routeParams.taskId).$asObject();
        $scope.listMode = false;
        setSelectedTask(task);
    }

    function setSelectedTask(task) {
        $scope.selectedTask = task;
        if($scope.signedIn()) {
            $scope.isTaskCreator = Task.isCreator;
            $scope.isOpen = Task.isOpen;
            console.log(Task.isCreator(task));
            console.log(task.name);
            console.log(task.status + "");
        }
    }

    $scope.cancelTask = function(taskId) {
        Task.cancelTask(taskId).then(function() {
            toaster.pop('success', 'This task is cancelled successfully.');
        });
    }
});