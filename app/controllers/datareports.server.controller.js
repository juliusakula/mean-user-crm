'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Datareport = mongoose.model('Datareport'),
	_ = require('lodash');

/**
 * Create a Datareport
 */
exports.create = function(req, res) {
	var datareport = new Datareport(req.body);
	datareport.user = req.user;

	datareport.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(datareport);
		}
	});
};

/**
 * Show the current Datareport
 */
exports.read = function(req, res) {
	res.jsonp(req.datareport);
};

/**
 * Update a Datareport
 */
exports.update = function(req, res) {
	var datareport = req.datareport ;

	datareport = _.extend(datareport , req.body);

	datareport.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(datareport);
		}
	});
};

/**
 * Delete an Datareport
 */
exports.delete = function(req, res) {
	var datareport = req.datareport ;

	datareport.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(datareport);
		}
	});
};

/**
 * List of Datareports
 */
exports.list = function(req, res) { 
	Datareport.find().sort('-created').populate('user', 'displayName').exec(function(err, datareports) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(datareports);
		}
	});
};

/**
 * Datareport middleware
 */
exports.datareportByID = function(req, res, next, id) { 
	Datareport.findById(id).populate('user', 'displayName').exec(function(err, datareport) {
		if (err) return next(err);
		if (! datareport) return next(new Error('Failed to load Datareport ' + id));
		req.datareport = datareport ;
		next();
	});
};

/**
 * Datareport authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.datareport.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
