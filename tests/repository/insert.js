var GenericMongoRepository = require('../../src/repository'),
assert = require('assert'),
utils = require('./utils'),
collectionName = "products";


describe('Generic Repository Insert Operation', function(){

	describe('#insert(document, callback)', function(){

		it('should insert a new product', function(done){

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
	});
});