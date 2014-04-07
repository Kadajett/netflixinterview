'use strict';

angular.module('netflixinterviewApp')
  .controller('ControlpanelCtrl', function ($scope, Appdataservice, Controlpanelservice, $modal) {
    $scope.ascend = true;
    
    $scope.hideControl = false;
    $scope.authed = Appdataservice.authed;
	  $scope.order = {};
	  $scope.control = Controlpanelservice;
    $scope.control.order = $scope.order.value;
    $scope.showAuthTool = false;

    /**
     * @title init()
     * @description runs common functions needed for the controller to start
     * @return {[type]} [description]
     */
    function init(){
    	$scope.switchAscend();
    }

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
     * @title
     *   auth()
     *  @description 
     *  This is just a wrapper for the auth call
     *  Waits till the auth is done, then sets the 
     *  HUD for auth to true or false.
     * @return {NULL} [NULLL]
     */
  	$scope.auth = function(){
      $scope.showAuthTool = true
      Appdataservice.oauth().then(function(data){
        $scope.authed = data;
        
      });
      
    }


    /**
	 * [switchAscend description]
	 * @return {[NULL]} [description]
	 */
	$scope.switchAscend = function(){
		$scope.control.ascend = !$scope.control.ascend;
	}

	/**
	 * @title toggleControl()
	 * @description Makes the control panel invisible or visible
	 * simple
	 * @return {[type]} [description]
	 */
	 $scope.toggleControl = function(){
      $scope.hideControl = !$scope.hideControl;
    }

    init();
  	
  });
