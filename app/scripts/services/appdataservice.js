'use strict';

angular.module('netflixinterviewApp')
  .service('Appdataservice', function Appdataservice($q, $http, $rootScope) {
   var appDataService = this;
   appDataService.result = '';

   appDataService.getData = function(){
  		appDataService.deferred = $q.defer();

  		 $http.get('https://api.github.com/orgs/Netflix/repos')
  		 .success(function(data){
  		 	
  		 	
  		 	appDataService.listData = data;
  		 	appDataService.deferred.resolve(data);
  		 	
  		 }).error(function(data){
  		 	appDataService.deferred.reject(data);
  		 	appDataService.listData = data;
  		 })

  		 return appDataService.deferred.promise;

  	}

  	appDataService.formatData = function(list){
  		var highestWatcher = 0;
  		for (var i = list.length - 1; i >= 0; i--) {
    		list[i].watchers_count = parseFloat(list[i].watchers_count);
    		if(list[i].watchers_count > highestWatcher){
    			highestWatcher = list[i].watchers_count;
    		}
    	};

    	for (var i = list.length - 1; i >= 0; i--) {
    		list[i].ranking = (list[i].watchers_count / highestWatcher) * 5;
    		
    	};



    	return list;
  	}

  	appDataService.getCommits = function(d) {
  		

  		 	angular.forEach(d, function(d){
  		 		$http.get('https://api.github.com/repositories/' + d.id + '/commits?top=master')
  		 		.success(function(r){
  		 			angular.forEach(r, function(d){
  		 				if(d.commit.message){
  		 					d.commit.message = d.commit.message.substr(0,90);
  		 				}
  		 				else{
  		 					console.log("r.message", d);
  		 				}
  		 				
  		 			});
  		 			d.commits = r;
  		 			
  		 		}).error(function(r){
  		 			alert(r);
  		 		})
  		 	});
  	}
  	appDataService.getContribs = function(d){
  		
  		angular.forEach(d, function(d){
  		 		$http.get('https://api.github.com/repos/' + d.full_name + '/collaborators')
  		 		.success(function(r){
  		 			d.contributers = r;
  		 			console.log("Contribs", d.contributers);
  		 			
  		 		}).error(function(r){
  		 			alert(r);
  		 		})
  		 	});
  	}
  	
  		appDataService.getData().then(function(d){
  			// for (var i = d.length - 1; i <= 0; i--) {
  		 // 		$http.get('https://api.github.com/repositories/' + d[i].id + '/commits?top=master')
  		 // 		.success(function(r){
  		 // 			d[i].commits = r;
  		 			
  		 // 		}).error(function(d){
  		 // 			alert(d);
  		 // 		})
  		 // 	};
  			// appDataService.result = appDataService.formatData(d);
  			// $rootScope.$broadcast('dataLoaded');
  		});


  	

  	return appDataService;
  });
