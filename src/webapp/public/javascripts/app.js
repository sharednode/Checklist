/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
    'toastr',
    'moment',
    'angular',
    'angular-route',
    './controllers/index',
    './services/index',
], function (toastr, moment, angular) {
    'use strict';

    var myApp = angular.module('app', ['app.controllers','app.services', 'ngRoute']);

    myApp.run(function($rootScope) {
        //Inject global functions before app start!
    });

    /*Config the toastr - http://codeseven.github.io/toastr/demo.html*/
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "positionClass": "toast-top-full-width",
    }

    return myApp;
});
