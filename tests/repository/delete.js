var GenericMongoRepository = require('../../src/repository'),
assert = require('assert'),
utils = require('./utils'),
collectionName = "products";


describe('Generic Repository Delete Operation', function(){

	describe('#delete(document, callback)', function(){

		it('should delete a product', function(done){

			var repository = new GenericMongoRepository(collectionName);
			var newProduct = utils.createProduct("Ball", "Sports");

			repository.insert(newProduct, function(err, result){

				repository.getById(newProduct._id, function(err, product){
					
					assert.deepEqual(product, newProduct);

					repository.delete({ _id: product._id }, function(err, result){
						
						assert.ok(result.n === 1);

						repository.getById(newProduct._id, function(err, product){
							assert.ok(product === null);
							done();
						});
					});					
				});			
			});				
		});		

		it('delete a invalid product', function(done){

			var repository = new GenericMongoRepository(collectionName);
			
			repository.delete({ _id: "invalidId" }, function(err, result){
				assert.ok(result.n === 0);
				done();
			});									
		});		
	});
});