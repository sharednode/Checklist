"use strict";

var express = require('express'),
passport = require('passport'),
router = express.Router(),
utils = require('./utils'),
logsRepo = new (require('../../repository/logsRepository')),
usersRepo = new (require('../../repository/userRepository'));


var logsPerPage = 20,
	logLevels = ['all', 'info', 'warning', 'error'];


//Search Logs
router.get('/logs', utils.isLoggedIn, function(req, res) {
	var page = parseInt(req.query.page || 1),
	skip = (page - 1) * logsPerPage,
	level = req.query.level;

	var searchOptions = {};
	
	if(level && level != logLevels[0]){
		searchOptions.level = level;
	}

	logsRepo.filter(searchOptions, { timestamp: -1 }, logsPerPage, skip, function(err, logs){

		logsRepo.countLogs(searchOptions, function(err, count){

			var model = {			
				logs: logs,
				searchFilter: {
					currentPage: page,
					numPages: Math.ceil(count / logsPerPage),
					levels: logLevels,
					selectedLevel: level
				}
			};

			res.status(200).send(model);
		});	
	});
});


//Search Logs
router.get('/users', utils.isLoggedIn, function(req, res) {

	usersRepo.getAll(function(err, users){
		res.status(200).send(users);
	});	
	
});


module.exports = router;
