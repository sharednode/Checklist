define(['./module','toastr'], function (services, toastr) {
	'use strict';

	services.service('adminService', ['$http', function ($http) {

		this.getLogs = function(searchFilter, callback){

			$http({method: 'GET', url: '/admin/logs?page=' + searchFilter.currentPage + '&level=' + searchFilter.selectedLevel}).
			success(function(data, status, headers, config) {
				callback(data);
			}).
			error(function(data, status, headers, config) {
				toastr.error('Error requesting logs.', 'Error')
				callback(data);
			});
		};

		this.getUsers = function(callback){
			$http({method: 'GET', url: '/admin/users'}).
			success(function(data, status, headers, config) {
				callback(data);
			}).
			error(function(data, status, headers, config) {
				toastr.error('Error requesting users.', 'Error')
				callback(data);
			});
		};
	}]);
});
