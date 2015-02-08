'use strict';

angular.module('taskkaApp').controller('NavCtrl', function($scope, $location, Auth, toaster){
    $scope.signedIn = Auth.signedIn;
    $scope.currentUser = Auth.user;
    $scope.logout = function() {
        Auth.logout();
        console.log("Logged out");
        toaster.pop('success', 'Logged out successfully');
        $location.path("/");
    }
});