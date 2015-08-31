'use strict';

// Datareports controller
angular.module('datareports').controller('DatareportsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Datareports',
	function($scope, $stateParams, $location, Authentication, Datareports) {
		$scope.authentication = Authentication;

		// Create new Datareport
		$scope.create = function() {
			// Create new Datareport object
			var datareport = new Datareports ({
				name: this.name
			});

			// Redirect after save
			datareport.$save(function(response) {
				$location.path('datareports/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Datareport
		$scope.remove = function(datareport) {
			if ( datareport ) { 
				datareport.$remove();

				for (var i in $scope.datareports) {
					if ($scope.datareports [i] === datareport) {
						$scope.datareports.splice(i, 1);
					}
				}
			} else {
				$scope.datareport.$remove(function() {
					$location.path('datareports');
				});
			}
		};

		// Update existing Datareport
		$scope.update = function() {
			var datareport = $scope.datareport;

			datareport.$update(function() {
				$location.path('datareports/' + datareport._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
        
        // Update existing Datareport
        $scope.update = function() {
            var datareport = $scope.datareport;

            datareport.$update(function() {
                $location.path('datareports/' + datareport._id + "/addprop/");
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

		// Find a list of Datareports
		$scope.find = function() {
			$scope.datareports = Datareports.query();
		};

		// Find existing Datareport
		$scope.findOne = function() {
			$scope.datareport = Datareports.get({ 
				datareportId: $stateParams.datareportId
			});
		};
	}
]);