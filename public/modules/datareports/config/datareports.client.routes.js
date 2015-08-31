'use strict';

//Setting up route
angular.module('datareports').config(['$stateProvider',
	function($stateProvider) {
		// Datareports state routing
		$stateProvider.
		state('listDatareports', {
			url: '/datareports',
			templateUrl: 'modules/datareports/views/list-datareports.client.view.html'
		}).
		state('createDatareport', {
			url: '/datareports/create',
			templateUrl: 'modules/datareports/views/create-datareport.client.view.html'
		}).
		state('viewDatareport', {
			url: '/datareports/:datareportId',
			templateUrl: 'modules/datareports/views/view-datareport.client.view.html'
		}).
		state('editDatareport', {
			url: '/datareports/:datareportId/edit',
			templateUrl: 'modules/datareports/views/edit-datareport.client.view.html'
		});
	}
]);