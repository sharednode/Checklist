"use strict";

var bcrypt   = require('bcrypt-nodejs'),
LocalStrategy   = require('passport-local').Strategy,
userRepository = new (require('../repository/userRepository')),
logger = require('../logger'),
configs = require('../config');


/*Insert the super user*/
userRepository.getById('admin', function(err, user){
    if(!err && !user){
		var superUser = configs.authentication.superUser;
		superUser.password = generateHash(superUser.password);
        userRepository.insert(superUser);     
    }    
});


/**
* [generateHash - generate a hashed string]
* @param  {[string]} Password [user password]
* @return {[string]} Hashed Password [hashed password]
*/
function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
* [validPassword - check if the passord is correct]
* @param  {[string]} userPassword [User password]
* @param  {[string]} password [Input User password]
* @return {[boolean]}       [Password Validation]
*/
function validatePassword(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
};

//Configure the passport strategy to register
module.exports = function(passport){

passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, function(req, email, password, callback){

        var user = req.body;
        logger.info('Register user (email)', user.email); 

        userRepository.getUserById(user._id, function(error, doc){

            if(doc){
                return callback(null, false, req.flash('signupMessage', 'Username already exists!'));
            }

            userRepository.getUserByEmail( email, function(err, doc){
                if(doc){
                    return callback(null, false, req.flash('signupMessage', 'Email already registered!'));
                }

                user.password = generateHash(user.password);

                userRepository.insert(user, function(){
                    return callback(null, user);
                });
            });
        });

    }));

    //Configure the passport strategy to login
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, function(req, email, password, callback){

        logger.info('Login user (email) ', email);

        userRepository.getUserByEmail( email, function(err, user){

            if(!user){
             return callback(null, false, req.flash('loginMessage', 'User does not exists!'));
         }

         if(!validatePassword(password, user.password))
             return callback(null, false, req.flash('loginMessage', 'Invalid password!'));

         return callback(null, user);
     });

    }));


    //Serialize the user
    passport.serializeUser(function(user, callback) {
        callback(null, user._id);
    });

    //Deserialize the user
    passport.deserializeUser(function(id, callback) {   
        userRepository.getById(id, function(err, user) {
            callback(err, user);
        });
    });
}


