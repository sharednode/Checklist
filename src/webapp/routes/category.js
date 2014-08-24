"use strict";

var express = require('express'),
router = express.Router(),
categoryRepo = new (require('../../repository/categoryRepository')),
genericApi = require('./genericApi'),
logger = require('../../logger'),
categoryModel = "category";


 /* Get All. */
 router.get('/info', function(req, res) {
 	categoryRepo.getCategoriesInfo(function(err, categories){
 		res.status(200).send(categories);	
 	});
 });

/**
 * Add all CRUD methods to category route
 */
 genericApi(router, categoryRepo, categoryModel);	



 module.exports = router;
