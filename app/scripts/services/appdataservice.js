'use strict';

angular.module('netflixinterviewApp')
  .service('Appdataservice', function Appdataservice($q, $http, $rootScope) {
   var appDataService = this;
   appDataService.result = '';
   appDataService.org = 'Netflix'
   appDataService.getData = function(org){
   		if(org){
   			appDataService.org = org;
   		}
  		appDataService.deferred = $q.defer();

  		 $http.get('https://api.github.com/orgs/'+ appDataService.org + '/repos')
  		 .success(function(data){
  		 	
  		 	
  		 	appDataService.listData = data;
  		 	appDataService.deferred.resolve(data);
  		 	
  		 }).error(function(data, status){
  		 	appDataService.deferred.reject(data);
  		 	appDataService.listData = data;
  		 	if(status = 403){
  		 		alert(status + " To many api calls, couldn't justify setting up OAuth for a test. Go take a walk.");
  		 	}
  		 	
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
  		 					
  		 				}
  		 				
  		 			});
  		 			d.commits = r;
  		 			
  		 		}).error(function(r){
  		 			
  		 		})
  		 	});
  	}
  	appDataService.getContribs = function(d){
  		
  		angular.forEach(d, function(d){
  		 		$http.get('https://api.github.com/repos/' + d.full_name + '/collaborators')
  		 		.success(function(r){
  		 			d.contributers = r;
  		 		}).error(function(r){
  		 			
  		 		})
  		 	});
  	}
  	
  		appDataService.getData().then(function(d){
  		
  		});


  	

  	return appDataService;
  });
