define(['./module'], function (controllers) {
	'use strict';
	controllers.controller('categoriesController', 
		['$scope', '$routeParams', 'categoriesService', function ($scope, $routeParams, categoriesService) {

			$scope.getCategoriesInfo = function(){
				categoriesService.getCategoriesInfo( function(data){
					$scope.categories = data;
				});
			};

			$scope.getCategory = function(){
				var categoryId = $routeParams.id;
				categoriesService.getCategory(categoryId, function(data){
					$scope.category = data;
				});
			};
		}]);
});
