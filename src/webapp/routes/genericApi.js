"use strict";

var logger = require('../../logger');

/**
 * [GenericApi - Add all CRUD methods to a router]
 * @param {[object]} router   [Router]
 * @param {[object]} repository [Repository for data access]
 * @param {[object]} model [Model for database]
 */
 function GenericApi(router, repository, model){
 	var Model = require('../models/' + model);

 	/* Get All. */
 	router.get('/', function(req, res) {
 		repository.getAll( function(err, items){
 			res.status(200).send(items);
 		});
 	});

 	/* Get by id. */
 	router.get('/:id', function(req, res) {
 		var id = req.params.id;

 		repository.getById(id, function(err, item){
 			if(item){
 				res.status(200).send(item);
 			}else{
 				res.send(404);
 			}		
 		});
 	});

 	/*Update*/
 	router.put('/:id', function(req, res) {	
 		var model = new Model(req.body),
 		id = req.params.id,
 		validate = model.validate();

 		if(validate){
 			res.send(validate);
 		}else{
	 		repository.getById(id, function(err, category){	
	 			if(category){
	 				repository.update(model, function(error, item){
	 					if(item){
	 						res.status(200).send(model);
	 					}else{
	 						res.send(error.err);
	 					}	
	 				});
	 			}else{
	 				res.send(404);
	 			}
	 		});
 		}
 	});

 	/*Delete*/
 	router.delete('/:id', function(req, res) {
 		var id = req.params.id;

 		repository.getById(id, function(err, category){	
 			if(category){
 				repository.delete({_id: id}, function(error, item){
 					if(!error)
 						res.status(200).send(category);		
 				});
 			}else{
 				res.send(404);
 			}
 		});

 		
 	});

 	/*Insert*/
 	router.post('/', function(req, res) {
 		var model = new Model(req.body),
 			validate = model.validate(); 
 		
 		if(validate){
 			res.send(validate);
 		}else{		
	 		repository.insert(model, function(error, item){
	 			if(item){
	 				res.status(201).send(item);
	 			}else{
	 				res.send(error.err);
	 			}	
	 		});
 		}
 	});

 }

 module.exports = GenericApi;