'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Datareport Schema
 */
var DatareportSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Datareport name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Datareport', DatareportSchema);