"use strict";

var Category = (function(){

	function Category(category){
		this._id = category._id;
		this.created = category.created;
		this.updated = category.updated;
		this.description = category.description;
		this.topics = category.topics || [];			
	}
	
	/**
	 * [Validate - Validate the Category Model]
	 */
	Category.prototype.validate = function(){
		//Check if model has _id
		if(!this._id){
			return "Does not contain category _id.";
		}

		return undefined;
	}

	return Category;
})();


module.exports = Category;