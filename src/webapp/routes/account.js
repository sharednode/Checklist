"use strict";
var express = require('express'),
passport = require('passport'),
router = express.Router(),
utils = require('./utils');

require('../../passport/localPassport')(passport);


//Render the unauthorize page
router.get('/unauthorize', function(req, res) {
	res.render('errors/unauthorize.ejs'); 
});

//Render the account
router.get('/', utils.isLoggedIn, function(req, res) {
	res.render('account.ejs'); 
});


//Render the login page
router.get('/login', function(req, res) {
	res.render('login.ejs', { message: req.flash('loginMessage') }); 
});

//Check if the credentials are valid
router.post('/login', passport.authenticate('local-login', {
		successRedirect : '/account',
		failureRedirect : '/account/login',
		failureFlash : true
}));

//Register a new user
router.get('/signup', function(req, res) {
	res.render('account.ejs', { message: req.flash('signupMessage') });
});

//Register the user
router.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/',
	failureRedirect : '/account/signup',
	failureFlash : true
}));

//Logout
router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});


/* Profile View. */
 router.get('/profile', utils.isLoggedIn, function(req, res) {
 	res.render('admin/profile');
 });

module.exports = router;
