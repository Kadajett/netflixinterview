'use strict';

/**
 * @title CommitsCtrl
 *
 * @description  
 * CommitsCtrl is used to pull in the active repository
 * for access to its commits. 
 * the reason this is abstracted into its own controller,
 * is because there is a large possibility that functionality
 * would be added to the commits modal in the future
 *
 * @param [repo] [an array filled with the active repositories data]
 */
angular.module('netflixinterviewApp')
  .controller('CommitsCtrl', function ($scope, repo) {
  	
  	
   	$scope.repo = repo;
   	$scope.changeFilter = function(){
   		$scope.$apply();
   	}
  });
