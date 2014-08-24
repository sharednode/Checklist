"use strict";

var PASSWORD_MIN_LENGTH = 5;

var User = (function(){

	function User(user){
		this._id = user._id;
		this.created = user.created;
		this.updated = user.updated;
		this.email = user.email;
		this.password = user.password;			
	}
	
	/**
	 * [Validate - Validate the User Model]
	 */
	User.prototype.validate = function(){
		if(!this._id){
			return "Does not contain user _id.";
		}else if(!this.email){
			return "Does not contain user email.";
		}else if(!this.password || this.password < PASSWORD_MIN_LENGTH){
			return "Invalid Password. Require length " + PASSWORD_MIN_LENGTH;
		}

		return undefined;
	}

	return User;
})();


module.exports = User;