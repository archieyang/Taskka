'use strict';

angular.module('taskkaApp').controller('AuthCtrl', function($scope, $location, Auth, toaster){
    if(Auth.signedIn()) {
        $location.path('/');
    }

    $scope.register = function(user) {
        Auth.register(user).then(function() {
            console.log("Register successfully!");
            toaster.pop('success', 'Register successfully');
            $location.path("/");
        }, function(err) {
            console.log("Error...");
            toaster.pop('error', 'Something went wrong');
        });
    };

    $scope.login = function(user) {
        Auth.login(user).then(function(){
                console.log("Loggedd in succefully!");
                toaster.pop('success', 'Logged in successfully');

                $location.path("/");
            }, function(err) {
                console.log("Error...");
                toaster.pop('error', 'Something went wrong');
            }
        );
    };

    $scope.changePassword = function(user) {
        Auth.changePassword(user).then(function(){
                $scope.user.email = "";
                $scope.user.oldPwd = "";
                $scope.user.newPwd = "";
                console.log("Password changed succefully!");
                toaster.pop('success', 'Password changed succefully!');

            }, function(err) {
                console.log("Error...");
                toaster.pop('error', 'Something went wrong');
            }
        );
    };
});