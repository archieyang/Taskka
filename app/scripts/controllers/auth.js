'use strict';

angular.module('taskkaApp').controller('AuthCtrl', function($scope, $location, Auth){
    $scope.register = function(user) {
        Auth.register(user).then(function() {
            console.log("Register successfully!");
            $location.path("/");
        }, function(err) {
            console.log("Error...");
        });
    };

    $scope.login = function(user) {
        Auth.login(user).then(function(){
                console.log("Loggedd in succefully!");
                $location.path("/");
            }, function(err) {
                console.log("Error...");
            }
        );
    };

    $scope.changePassword = function(user) {
        Auth.changePassword(user).then(function(){
                $scope.user.email = "";
                $scope.user.oldPwd = "";
                $scope.user.newPwd = "";
                console.log("Password changed succefully!");
            }, function(err) {
                console.log("Error...");
            }
        );
    };
});