define(['./app'], function (app) {
    'use strict';
    return app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        
        $routeProvider.when('/account', {
            templateUrl: '/partials/profile.ejs',
            controller: 'adminController'
        });

        $routeProvider.when('/admin/logs', {
            templateUrl: '/partials/logs.ejs',
            controller: 'adminController'
        });

        $routeProvider.when('/admin/users', {
            templateUrl: '/partials/users.ejs',
            controller: 'adminController'
        });

        $routeProvider.otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);

    }]);
});