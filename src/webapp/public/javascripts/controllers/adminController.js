define(['./module','toastr'], function (controllers, toastr) {
    'use strict';

    controllers.controller('adminController', ['$scope', 'adminService' , function ($scope, adminService) {
        
        $scope.initLogPage = function(){
            $scope.model = {};
            $scope.model.searchFilter = {
                currentPage: 1,
                selectedLevel: 'all'
            };

            $scope.getLogs();
        };

        $scope.getLogs = function(){

            if($scope.model.searchFilter.currentPage < 1 ||
                $scope.model.searchFilter.currentPage > $scope.model.searchFilter.numPages ||
                isNaN($scope.model.searchFilter.currentPage)){
                
                toastr.error('Invalid page number.', 'Error');
                return;
            }

 			adminService.getLogs($scope.model.searchFilter, function(model){
 				$scope.model = model;
 				if($scope.model.searchFilter.numPages == 0)
 					$scope.model.searchFilter.currentPage = 0;
 			});
    	}

		$scope.changeLevel = function(){
			$scope.model.searchFilter.currentPage = 1;
            $scope.model.searchFilter.numPages = 1;
 			$scope.getLogs();
	    }


        $scope.initUsersPage = function(){
            $scope.model = {};
            
            adminService.getUsers(function(users){
                $scope.model.users = users;
            });
        };

    }]);
});
