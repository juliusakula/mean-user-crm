'use strict';

angular.module('users').controller('ProfileController',  ['$scope', '$http', '$location', 'Users', 'Authentication',
    function($scope, $http, $location, Users, Authentication) {
        $scope.user = Authentication.user;

        // If user is not signed in then redirect back home
        if (!$scope.user) $location.path('/');
        
        
		// Profile controller logic
		// ...
        $scope.findMyProfile = function(){
            
        };
	}
]);