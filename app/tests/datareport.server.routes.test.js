'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Datareport = mongoose.model('Datareport'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, datareport;

/**
 * Datareport routes tests
 */
describe('Datareport CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Datareport
		user.save(function() {
			datareport = {
				name: 'Datareport Name'
			};

			done();
		});
	});

	it('should be able to save Datareport instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Datareport
				agent.post('/datareports')
					.send(datareport)
					.expect(200)
					.end(function(datareportSaveErr, datareportSaveRes) {
						// Handle Datareport save error
						if (datareportSaveErr) done(datareportSaveErr);

						// Get a list of Datareports
						agent.get('/datareports')
							.end(function(datareportsGetErr, datareportsGetRes) {
								// Handle Datareport save error
								if (datareportsGetErr) done(datareportsGetErr);

								// Get Datareports list
								var datareports = datareportsGetRes.body;

								// Set assertions
								(datareports[0].user._id).should.equal(userId);
								(datareports[0].name).should.match('Datareport Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Datareport instance if not logged in', function(done) {
		agent.post('/datareports')
			.send(datareport)
			.expect(401)
			.end(function(datareportSaveErr, datareportSaveRes) {
				// Call the assertion callback
				done(datareportSaveErr);
			});
	});

	it('should not be able to save Datareport instance if no name is provided', function(done) {
		// Invalidate name field
		datareport.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Datareport
				agent.post('/datareports')
					.send(datareport)
					.expect(400)
					.end(function(datareportSaveErr, datareportSaveRes) {
						// Set message assertion
						(datareportSaveRes.body.message).should.match('Please fill Datareport name');
						
						// Handle Datareport save error
						done(datareportSaveErr);
					});
			});
	});

	it('should be able to update Datareport instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Datareport
				agent.post('/datareports')
					.send(datareport)
					.expect(200)
					.end(function(datareportSaveErr, datareportSaveRes) {
						// Handle Datareport save error
						if (datareportSaveErr) done(datareportSaveErr);

						// Update Datareport name
						datareport.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Datareport
						agent.put('/datareports/' + datareportSaveRes.body._id)
							.send(datareport)
							.expect(200)
							.end(function(datareportUpdateErr, datareportUpdateRes) {
								// Handle Datareport update error
								if (datareportUpdateErr) done(datareportUpdateErr);

								// Set assertions
								(datareportUpdateRes.body._id).should.equal(datareportSaveRes.body._id);
								(datareportUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Datareports if not signed in', function(done) {
		// Create new Datareport model instance
		var datareportObj = new Datareport(datareport);

		// Save the Datareport
		datareportObj.save(function() {
			// Request Datareports
			request(app).get('/datareports')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Datareport if not signed in', function(done) {
		// Create new Datareport model instance
		var datareportObj = new Datareport(datareport);

		// Save the Datareport
		datareportObj.save(function() {
			request(app).get('/datareports/' + datareportObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', datareport.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Datareport instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Datareport
				agent.post('/datareports')
					.send(datareport)
					.expect(200)
					.end(function(datareportSaveErr, datareportSaveRes) {
						// Handle Datareport save error
						if (datareportSaveErr) done(datareportSaveErr);

						// Delete existing Datareport
						agent.delete('/datareports/' + datareportSaveRes.body._id)
							.send(datareport)
							.expect(200)
							.end(function(datareportDeleteErr, datareportDeleteRes) {
								// Handle Datareport error error
								if (datareportDeleteErr) done(datareportDeleteErr);

								// Set assertions
								(datareportDeleteRes.body._id).should.equal(datareportSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Datareport instance if not signed in', function(done) {
		// Set Datareport user 
		datareport.user = user;

		// Create new Datareport model instance
		var datareportObj = new Datareport(datareport);

		// Save the Datareport
		datareportObj.save(function() {
			// Try deleting Datareport
			request(app).delete('/datareports/' + datareportObj._id)
			.expect(401)
			.end(function(datareportDeleteErr, datareportDeleteRes) {
				// Set message assertion
				(datareportDeleteRes.body.message).should.match('User is not logged in');

				// Handle Datareport error error
				done(datareportDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Datareport.remove().exec();
		done();
	});
});