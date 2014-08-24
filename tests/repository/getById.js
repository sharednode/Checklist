var GenericMongoRepository = require('../../src/repository'),
assert = require('assert'),
utils = require('./utils'),
collectionName = "products";


describe('Generic Repository getById Operation', function(){

	describe('#getById(id, callback(error))', function(){

		it('get a product by a valid id', function(done){

			var repository = new GenericMongoRepository(collectionName);
			var newProduct = utils.createProduct("Ball", "Sports");

			repository.getById(newProduct._id, function(err, product){
				assert.ok(product === null);

				repository.insert(newProduct, function(err, result){
				
					repository.getById(newProduct._id, function(err, product){
						assert.deepEqual(product, newProduct);
						done();
					});			
				});				
			});
		});

		it('get a product by a invalid id', function(done){

			var repository = new GenericMongoRepository(collectionName);
			
			repository.getById('invalidId', function(err, product){
				assert.ok(product === null);
				done();
			});
		});

	});
});
