angular.module('taskkaApp').controller('BrowseCtrl', function ($scope, $routeParams, toaster, Task, Auth, Comment) {
    $scope.searchTask = '';
    $scope.tasks = Task.all;
    $scope.signedIn = Auth.signedIn;
    $scope.listMode = true;

    $scope.user = Auth.user;

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

        $scope.comments = Comment.getAllComments(task.$id);
    }

    $scope.cancelTask = function(taskId) {
        Task.cancelTask(taskId).then(function() {
            toaster.pop('success', 'This task is cancelled successfully.');
        });
    }

    $scope.addComment = function() {
        var comment = {
            content:$scope.content,
            name: $scope.user.profile.name,
            gravatar: $scope.user.profile.gravatar
        };
        Comment.addComment($scope.selectedTask.$id, comment).then(
            function() {
                $scope.content = '';
            }
        );
    };
});