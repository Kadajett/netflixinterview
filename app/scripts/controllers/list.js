'use strict';

angular.module('netflixinterviewApp')
  .controller('listCtrl', function ( $scope, Appdataservice, $modal, Controlpanelservice, $timeout) {
  	
  	
  	
  	// Handles the organization Could really be in a contrl controller
  	$scope.org = '';
    $scope.searched = false;
  	Appdataservice.org = $scope.org;
    
    

  	// END


   $scope.control = Controlpanelservice;

   $scope.changedOrgSearch = function(){
    // just a timer to wait for the data to be pulled back in. 
    // I was seeing my no repositories message for a split second here.
   $scope.searched = false
    
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
         $timeout(function(){
          $scope.searched = true;
        }, 500);
      }

       
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

   
	



  });




  	
