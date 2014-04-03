'use strict';

angular.module('netflixinterviewApp')
  .controller('listCtrl', function ( $scope, Appdataservice, $modal) {
  		
  	$scope.max = 5;
  	$scope.rating = 0;
  	$scope.ascend = true;

  	
  	
  	
  	console.log($scope.order);
  		
  	Appdataservice.getData().then(function(d){
  		Appdataservice.getCommits(d);
  		$scope.list = Appdataservice.formatData(d);
  		console.log($scope.list);
  	})
  			

  		
	// $scope.open = function(){

	//     var modalInstance = $modal.open({
	//       templateUrl: 'myModalContent.html',
	//       controller: listCtrl
	//     });

	//     modalInstance.result.then(function (selectedItem) {
	//       $scope.selected = selectedItem;
	//     }, function () {
	//       $log.info('Modal dismissed at: ' + new Date());
	//     });
	// }

	$scope.open = function (repo) {

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

		
	$scope.switchAscend = function(){
		$scope.ascend = !$scope.ascend;
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


		console.log($scope.order);

	}

	$scope.switchAscend();
	$scope.order = $scope.orderList[0];
  	
  	console.log($scope.order);


  });




  	
