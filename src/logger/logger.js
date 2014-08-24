"use strict";

var winston = require('winston'),
	winstonMongo = require('winston-mongodb').MongoDB,
	configurations = require('../config');



var logger = new (winston.Logger)({	
			transports: [
			new (winston.transports.Console)(configurations.logger.console),
			new (winston.transports.MongoDB)(configurations.logger.mongo)
			//new (winston.transports.File)({ filename: configurations.logger.file })
			]
		});	
	
module.exports = logger;