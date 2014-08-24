var GenericMongoRepository = require('../../src/repository'),
assert = require('assert'),
utils = require('./utils'),
collectionName = "products";


describe('Generic Repository GetAll Operation', function(){

	describe('#getAll(callback)', function(){

		it('should get all documents', function(done){

			var repository = new GenericMongoRepository(collectionName);
			var newProduct = utils.createProduct("Ball", "Sports");
			var newProduct2 = utils.createProduct("LOTRO", "Book");
			var countProds = 0;

			repository.getAll(function(error, results){
				countProds = results.length;

				repository.insert(newProduct, function(err, result){

					repository.insert(newProduct2, function(err, result){

						repository.getAll(function(error, results){
							assert.ok( (countProds + 2) === results.length);
							done();
						});
					});		
				});		
			});
		});		
	});
});