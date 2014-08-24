var GenericMongoRepository = require('../../src/repository'),
assert = require('assert'),
utils = require('./utils'),
collectionName = "products";


describe('Generic Repository Filter Operation', function(){

	describe('#filter(filter, limit, skip, callback)', function(){

		it('should get all documents filtered', function(done){

			var repository = new GenericMongoRepository(collectionName),
			newProduct1 = utils.createProduct("Ball1", "Sports"),
			newProduct2 = utils.createProduct("Ball2", "Sports"),
			newProduct3 = utils.createProduct("Ball3", "Sports"),
			countProds = 0,
			numberOfProds = 2;

			repository.insert(newProduct1);
			repository.insert(newProduct2);
			repository.insert(newProduct3);

			repository.getAll(function(error, results){
				countProds = results.length;

				repository.filter({}, {}, numberOfProds, 0 , function(err, docs){
					assert.ok(numberOfProds === docs.length);
					done();	
				});		
			});
		});		
	});
});