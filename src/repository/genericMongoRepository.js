"use strict";

var mongojs = require('mongojs'),
logger = require('../logger'),
dbConfigs = require('../config').database,
database = mongojs(dbConfigs.connectionString, dbConfigs.collections);

var GenericRepository = (function(){

	/**
	 * [GenericRepository - Constructor]
	 * @param {[string]} collectionName   [Collection Name]
	 */
	 function GenericRepository(collectionName){
	 	this.collectionName = collectionName;
	 	this.collection = database.collection(collectionName);
	 }

	 /**
	  * [createIndexes - Create Collection Indexes]
	  * @param  {[object]} keys [Collection indexes]
	  */
	  GenericRepository.prototype.createIndexes = function(keys){
	  	if(keys){
	  		this.collection.ensureIndex(keys);
	  	}
	  }

	 /**
	  * [getAll - Get all documents from a collection]
	  * @param  {Function} callback [Callback]
	  */
	  GenericRepository.prototype.getAll = function(callback){
	  	var self = this;

	  	this.collection.find().toArray(function (error, docs) {
	  		
	  		if(error){
	  			logger.error('Error getting all elements (collection, error)', self.collectionName, error.message);
	  		}else{
	  			logger.info('Get all documents (collection, count) ', self.collectionName, docs.length);
	  		}

	  		callback(error, docs);
	  	});
	  }

	 /**
	  * [getById - Get document by Id]
	  * @param  {[type]}   id       [Document Id]
	  * @param  {Function} callback [Callback]
	  */
	  GenericRepository.prototype.getById = function(id, callback){
	  	var self = this;

	  	this.collection.findOne({_id: id}, function(error, doc) {
	  		if(error){
	  			logger.error('Error finding the element with (id, error) ', id, error.message);
	  		}else{
	  			logger.info('Get document by Id (collection, id, document) ', self.collectionName, id, doc);
	  		}	 		

	  		callback(error, doc);
	  	});
	  }

	 /**
	  * [insert - Insert a new Document]
	  * @param  {[object]} document [Document to insert]
	  * @param  {Function} callback [description]
	  */
	  GenericRepository.prototype.insert = function(document, callback){
	  	var self = this;

	  	document.created = new Date();
	  	
	  	this.collection.insert(document, {w:1}, function(error, result) {

	  		if(error){
	  			logger.error('Error inserting the document (collection, document, error) ', self.collectionName, document, error.message);
	  		}else{
	  			logger.info('Inserted the document (collection, document) ', self.collectionName, document);
	  		}	 		

	  		if(callback){
	  			callback(error, result);
	  		}
	  	});
	  }

	 /**
	  * [update - Update a document]
	  * @param  {[object]} document [Document to update]
	  * @param  {Function} callback [Callback]
	  */
	  GenericRepository.prototype.update = function(document, callback){
	  	var self = this;
	  	
	  	document.updated = new Date();
	  	
	  	this.collection.update({_id: document._id}, document, function(error, result){
	  	
	  		if(error){
	  			logger.error('Error updating the document (collection, result, error) ', self.collectionName, result, error.message);
	  		}else{
	  			logger.info('Document updated (collection, result) ', self.collectionName, result);
	  		}	 		

	  		if(callback){
	  			callback(error, result);
	  		}
	  	});
	  }

	 /**
	  * [delete - Delete documents]
	  * @param  {[object]} query [Delete documents by query]
	  * @param  {[function]} callback [Callback]
	  */
	  GenericRepository.prototype.delete = function(query, callback){
	  	var self = this;

	  	this.collection.remove(query, function(error, result){
	  		if(error){
	  			logger.error('Error deleting the documents (collection, query, error) ', self.collectionName, query, error.message);
	  		}else{
	  			logger.info('Deleted documents (collection, query, result) ', self.collectionName, query, result);
	  		}

	  		callback(error, result);
	  	});			
	  }

	 /**
	  * [filter - Get all Documents with a filter]
	  * @param  {[Object]}   filter   [Document filter]
	  * @param  {[Integer]}   limit    [Document limit]
	  * @param  {[Integer]}   skip     [Documents to skip]
	  * @param  {Function} callback [Callback]
	  */
	  GenericRepository.prototype.filter = function(filter, sort, limit, skip, callback){
	  	var self = this;
	  	
	  	this.collection.find(filter).sort(sort).limit(limit).skip(skip).toArray(function(error, docs) {
	  	
	  		if(error){
	  			logger.error('Error getting elements (collection, sort, limit, skip, error) ', self.collectionName, sort, limit, skip, error.message);
	  		}else{
	  			logger.info('Get documents (collection, count) ', self.collectionName, docs.length);
	  		}

	  		callback(error, docs);
	  	});
	  }

	  return GenericRepository;
	})();

	module.exports = GenericRepository;