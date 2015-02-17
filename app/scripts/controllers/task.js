'use strict';

angular.module('taskkaApp').controller('TaskCtrl', function ($scope, $location, toaster, Task, Auth) {
    $scope.createTask = function () {
        $scope.task.status = 'open';
        $scope.task.gravatar = Auth.user.profile.gravatar;
        $scope.task.name = Auth.user.profile.name;
        $scope.task.poster = Auth.user.uid;

        Task.createTask($scope.task).then(function (ref) {
            toaster.pop('success', 'Task created successfully. ');
            $scope.task = {title: '', description: '', price: '', status: 'open', gravatar: '', name:'', poster: ''};
            $location.path('/browse/' + ref.key())
        })
    }

    $scope.editTask = function(task) {
        Task.editTask(task).then(function() {
            toaster.pop('success', 'Task is updated.');
        })
    }
});
