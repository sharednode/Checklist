var GenericMongoRepository = require('../../src/repository'),
assert = require('assert'),
utils = require('./utils'),
collectionName = "products";


describe('Generic Repository Update Operation', function(){

	describe('#update(document, callback)', function(){

		it('should update a product', function(done){

			var repository = new GenericMongoRepository(collectionName);
			var newProduct = utils.createProduct("Ball", "Sports");

			repository.insert(newProduct, function(err, result){

				repository.getById(newProduct._id, function(err, product){
					
					assert.deepEqual(product, newProduct);
					product.name = "Teste";

					repository.update(product, function(err, result){
						assert.ok(result.n === 1);
						repository.getById(newProduct._id, function(err, product){
							assert.ok(product.name === "Teste");
							done();
						});

					});					
				});			
			});				
		});		

		it('update a invalid product', function(done){

			var repository = new GenericMongoRepository(collectionName);
			
			repository.update({ invalid: "invalid" }, function(err, result){
				assert.ok(result.n === 0);
				done();
			});									
		});		
	});
});