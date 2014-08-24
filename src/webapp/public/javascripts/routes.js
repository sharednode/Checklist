define(['./app'], function (app) {
    'use strict';
    return app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        
        $routeProvider.when('/', {
            templateUrl: '/views/categories/index.html',
            controller: 'categoriesController'
        });

        $routeProvider.when('/category/:id', {
            templateUrl: '/views/categories/details.html',
            controller: 'categoriesController'
        });


        /*Handle Not Found Routes*/
        $routeProvider.when('/notFound', {
            templateUrl: '/views/errors/notFound.html'
        });

        $routeProvider.otherwise({
            redirectTo: '/notFound'
        });

        $locationProvider.html5Mode(true);

    }]);
});