"use strict";

var app = require('./webapp'),
logger = require('./logger'),
config = require('./config'),
cluster = require('./cluster');

function serverWork(){
	logger.info('Server is preparing to run on process (id)', process.pid);

	process.on("uncaughtException", function(err) {
		logger.error('Uncaught Exception (error)', err.message);
	});

	app.set('port', process.env.PORT || config.webServer.port);

	var server = app.listen(app.get('port'), function() {
		logger.info('Server listening on port: ' + config.webServer.port);
	});	
}

//cluster(serverWork);

serverWork();