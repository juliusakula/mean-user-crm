'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var datareports = require('../../app/controllers/datareports.server.controller');

	// Datareports Routes
	app.route('/datareports')
		.get(datareports.list)
		.post(users.requiresLogin, datareports.create);

	app.route('/datareports/:datareportId')
		.get(datareports.read)
		.put(users.requiresLogin, datareports.hasAuthorization, datareports.update)
		.delete(users.requiresLogin, datareports.hasAuthorization, datareports.delete);

	// Finish by binding the Datareport middleware
	app.param('datareportId', datareports.datareportByID);
};
