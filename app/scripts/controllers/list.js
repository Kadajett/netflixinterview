'use strict';

angular.module('netflixinterviewApp')
  .controller('listCtrl', function ( $scope, Appdataservice, $modal) {
  	$scope.ascend = true;
  	$scope.order = '';
  	$scope.filterText = '';
  	// Handles the organization Could really be in a contrl controller
  	$scope.org = '';
  	Appdataservice.org = $scope.org;
    $scope.authed = Appdataservice.authed;
    $scope.hideControl = false;

  	// END


    $scope.toggleControl = function(){
      $scope.hideControl = !$scope.hideControl;
    }
  	/**
  	 * Init is a function that calls all the other functions needed to start the applicaiton
  	 * They are here for code cleanliness mostly.
  	 * @return {NULL} [NULL]
  	 */
  	var init = function(){
  		$scope.switchAscend();
		$scope.order = $scope.orderList[0].value;
    Appdataservice.setOrg($scope.org);
    
  	}

  	/**
  	 * @title newOrg()
  	 *
  	 * newOrg takes user input for grabbing a different organization.
  	 * calls the getData() process again with the new org. 
  	 * 
  	 * @return {[type]} [description]
  	 */
  	$scope.newOrg = function(){
      
      if(Appdataservice.ref){
        
        Appdataservice.setOrg($scope.org);
        
    		Appdataservice.getData($scope.org).then(function(d){
  	  		Appdataservice.getCommits(d)
  	  		Appdataservice.getContribs(d);
  	  		$scope.list = Appdataservice.formatData(d);
    		})
      }
  	}
  	
    /**
     * @title
     *   auth()
     *  @description 
     *  This is just a wrapper for the auth call
     *  Waits till the auth is done, then sets the 
     *  HUD for auth to true or false.
     * @return {NULL} [NULLL]
     */
  	$scope.auth = function(){
      Appdataservice.oauth().then(function(data){
        $scope.authed = data;
      });
      
    }
  	
  			
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
  	 * @description
     * Opens up the contributer modal
     * passes in the repo to pull the 
     * contributers from
  	 * 
  	 * @param  {array} repo the selected repository to pull the contribs from
  	 * @return {repo} [returns the active repository to CommitCtrl,]
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
     * @title openHelp()
     * @description jsut a scope funciton to open the help modal
     * Could be moved to a controlBox Controller
     * @return {NULL} NULL
     */
    $scope.openHelp = function(){
      $modal.open({
        templateUrl: '/views/modals/helpModal.html'
      });
    }

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



  });




  	
