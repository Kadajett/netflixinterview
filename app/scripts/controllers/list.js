'use strict';

angular.module('netflixinterviewApp')
  .controller('listCtrl', function ( $scope, Appdataservice, $modal) {
  		
  	$scope.max = 5;
  	$scope.rating = 0;
  	$scope.ascend = true;
  	$scope.order = '';
  	$scope.filterText = '';
  	
  	
  	
  		
  	Appdataservice.getData().then(function(d){
  		Appdataservice.getCommits(d)
  		Appdataservice.getContribs(d);
  	
  		
  		$scope.list = Appdataservice.formatData(d);
  		console.log($scope.list);
  	})
  			
  	/**
  	 * @title openCommit
  	 * @type {}
  	 * 
  	 * @param  {[type]} repo [description]
  	 * @return {[type]}      [returns the active repository to CommitCtrl]
  	 */
	$scope.openCommit = function (repo) {
	     $modal.open({
	      templateUrl: '/views/modals/commitsModal.html',
	      controller: 'CommitsCtrl',
	      resolve: {
	      	repo: function(){
	      		return repo;
	      	}
	      }   
	    });
  	};

  	/**
  	 * @title openContrib
  	 * @type {}
  	 * 
  	 * @param  {[type]} repo [description]
  	 * @return {[type]}      [returns the active repository to CommitCtrl]
  	 */
	$scope.openContrib = function (repo) {
	     $modal.open({
	      templateUrl: '/views/modals/contributersModal.html',
	      controller: 'ContribCtrl',
	      resolve: {
	      	repo: function(){
	      		return repo;
	      	}
	      }   
	    });
  	};


	/**
	 * [switchAscend description]
	 * @return {[NULL]} [description]
	 */
	$scope.switchAscend = function(){
		$scope.ascend = !$scope.ascend;

		// Makes sure the orderBy selector stays in the same position
		// through the switch
		// I dislike how I solved this
		// Will look into a more elegant fix.
		if($scope.order == '+forks'){$scope.order = '-forks'}
		else if($scope.order == '-forks'){$scope.order = '+forks'}

		else if($scope.order == '+ranking'){$scope.order = '-ranking'}
		else if($scope.order == '-ranking'){$scope.order = '+ranking'}

		else if($scope.order == '+watchers_count'){$scope.order = '-watchers_count'}
		else if($scope.order == '-watchers_count'){$scope.order = '+watchers_count'}

		// Handles the switching of the orderBy Values
		if($scope.ascend == true){
			$scope.orderList = [{value:'+forks', name:'forks'},
			{value:'+ranking', name:'ranking'},
			{value:'+watchers_count', name:'watchers'}
			];
		}
		else {
			$scope.orderList = [{value:'-forks', name:'forks'},
			{value:'-ranking', name:'ranking'},
			{value:'-watchers_count', name:'watchers'}
			];
		}
	}

	$scope.switchAscend();
	$scope.order = $scope.orderList[0].value;

  });




  	
