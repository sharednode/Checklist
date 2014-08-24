var uuid = require('node-uuid');

function createProduct(name, category){
	
	var product = {
		_id: uuid.v4(),
		name: name,
		category: category,
		created: new Date(),
		updated: new Date()
	};

	return product;
}

exports.createProduct = createProduct;
