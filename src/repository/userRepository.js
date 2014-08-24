"use strict";

var GenericRepository = require('./genericMongoRepository'),
logger = require('../logger'),
CollectionName = "users";


var UserRepository = (function(){

	var _super = GenericRepository;
	UserRepository.prototype = new _super();

	/**
	 * [UserRepository Constructor]
	 * @param {[type]} collectionName   [Collection Name]
	 */
	 function UserRepository(){
	 	_super.call(this, CollectionName);
	 	this.createIndexes({ email : 1 });
	 }


	 UserRepository.prototype.getUserByEmail = function(email, callback){
	 	var self = this;

	 	this.collection.findOne({ email: email }, function(error, doc) {
	 		if(error){
	 			logger.error('Error finding the element with (email, error) ', email, error.message);
	 		}else{
	 			logger.info('Get document by email (collection, email, document) ', self.collectionName, email, doc);
	 		}	 		

	 		callback(error, doc);
	 	});
	 }


	return UserRepository;
})();


module.exports = UserRepository;