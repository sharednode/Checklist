"use strict";

var GenericRepository = require('./genericMongoRepository'),
logger = require('../logger'),
CollectionName = "categories";


var CategoryRepository = (function(){

	var _super = GenericRepository;
	CategoryRepository.prototype = new _super();

	/**
	 * [CategoryRepository Constructor]
	 * @param {[type]} collectionName   [Collection Name]
	 */
	 function CategoryRepository(){
	 	_super.call(this, CollectionName);
	 }


	 /**
	  * [getCategoriesInfo - Return just the information about categories]
	  * @param  {Function} callback      [Callback]
	  */
	 CategoryRepository.prototype.getCategoriesInfo = function(callback){
	 	var self = this;

	 	this.collection.find({},{_id: 1, description: 1}).toArray(function (error, docs) {
	  		
	  		if(error){
	  			logger.error('Error getting categories information (collection, error)', self.collectionName, error.message);
	  		}else{
	  			logger.info('Get categories information (collection, count) ', self.collectionName, docs.length);
	  		}

	  		callback(error, docs);
	  	});

	 }

	return CategoryRepository;
})();


module.exports = CategoryRepository;