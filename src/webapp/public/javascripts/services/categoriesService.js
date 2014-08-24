define(['./module','toastr'], function (services, toastr) {
	'use strict';

	services.service('categoriesService', ['$http', function ($http) {

		this.getCategoriesInfo = function(callback){

			$http({method: 'GET', url: '/api/category/info'}).
			success(function(data, status, headers, config) {
				callback(data);
			}).
			error(function(data, status, headers, config) {
				toastr.error('Error requesting categories.', 'Error')
				callback(null);
			});
		};

		this.getCategory = function(categoryId, callback){
			$http({method: 'GET', url: '/api/category/' + categoryId}).
			success(function(data, status, headers, config) {
				callback(data);
			}).
			error(function(data, status, headers, config) {
				callback(null);
			});
		};
	}]);
});
