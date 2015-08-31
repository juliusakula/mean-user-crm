'use strict';

//Datareports service used to communicate Datareports REST endpoints
angular.module('datareports').factory('Datareports', ['$resource',
	function($resource) {
		return $resource('datareports/:datareportId', { datareportId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);