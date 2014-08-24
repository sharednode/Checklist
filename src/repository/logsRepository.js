"use strict";

var GenericRepository = require('./genericMongoRepository'),
logger = require('../logger'),
CollectionName = "logs";


var LogRepository = (function(){

	var _super = GenericRepository;
	LogRepository.prototype = new _super();

	/**
	 * [LogRepository Constructor]
	 * @param {[type]} collectionName   [Collection Name]
	 */
	 function LogRepository(){
	 	_super.call(this, CollectionName);
	 	this.createIndexes({ timestamp : -1 });
	 }

	 LogRepository.prototype.countLogs = function(query, callback){
	 	var self = this;
	 	return this.collection.count(query, function(error, count){
	 		if(error){
				logger.error('Error counting (collection, error)', self.collectionName, error.message);
	 		}else{
	 			logger.info('Counting (collection, count)', self.collectionName, count);
	 		}

	 		callback(error, count);
	 	});
	 }

	return LogRepository;
})();


module.exports = LogRepository;