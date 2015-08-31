'use strict';

// Configuring the Articles module
angular.module('datareports').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Datareports', 'datareports', 'dropdown', '/datareports(/create)?');
		Menus.addSubMenuItem('topbar', 'datareports', 'List Datareports', 'datareports');
		Menus.addSubMenuItem('topbar', 'datareports', 'New Datareport', 'datareports/create');
	}
]);