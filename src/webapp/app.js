"use strict";

var express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
app = express(),
config = require('../config'),
routes = config.webServer.routes,
logger = require('../logger'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
passport = require('passport'),
flash = require('connect-flash');

//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

//Parse application/json
app.use(bodyParser.json());

//Cookie parser
app.use(cookieParser());

//Login passport
app.use(session({secret: 'cheklistsecretwt1337',saveUninitialized: true, resave: true})); //Session secret
app.use(passport.initialize());
app.use(passport.session()); //Persistent login sessions
app.use(flash()); //Passport messages support

// View engine setup
app.use(express.static(path.join(__dirname, 'public')));

//Log all requests
app.use(function(req, res, next){
    logger.info('Request (processId, url, params, body)', process.pid, req.url, req.params, req.body);
    next(); 
});

//Register User Information in all views
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});

//Register Routes
for(var i = 0; i < routes.length; ++i){
    var routeFile = routes[i];
    if(routes[i].indexOf('api') != -1)
        routeFile = routes[i].substring(routes[i].lastIndexOf('/'), routes[i].length);

    app.use(routes[i], require('./routes' + routeFile));
}

//(Angular will handle the routes)
app.get('*', function(req, res) {
  res.sendfile(__dirname + '/public/views/index.html');
});

//Handle 404 Responses
app.use(function(req, res) {
    logger.info('404: Page not Found (url)', req.url);
    res.render('errors/notFound');
});
  
//Handle 500 Responses
app.use(function(error, req, res, next) {
    logger.error('500: Internal Server Error (url, params, body, error)', req.url, req.params, req.body, error.message);
    res.send(error);
});

module.exports = app;
