'use strict';

angular.module('netflixinterviewApp')
  .service('Appdataservice', function Appdataservice($q, $http, $rootScope) {
   var appDataService = this;
   appDataService.result = '';
   appDataService.org = 'Netflix'
   appDataService.max = 5;

   /**
    * The Big Kahuna
    * This makes all the magic happen
    * pulling in data form the github api
    * @param  {[array of objects]} org [description]
    * @return {[Promise]}     [A promise of the inital repos pull. 
    * The deferred promise calls formatData and getContribs after the data is accessed]
    */
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
  		 		alert(status + " To many api calls, go take a walk... And then come back. or your org doesn't exist.");
  		 	}
  		 	
  		 })

  		 return appDataService.deferred.promise;

  	}
  	/**
  	 * Format data is used to take the initial response from github, 
  	 * and format it however the dom needs it.
  	 * I really don't like how unflexible this function is. 
  	 * Work on it later? ;)
  	 * @param  {List of repos} list [Just a list of repos that get looped through and get formatted]
  	 * @return {list of repos}      [returns the formatted list of repos. Simple.]
  	 */
  	appDataService.formatData = function(list){
  		var highestWatcher = 0;
  		for (var i = list.length - 1; i >= 0; i--) {
    		list[i].watchers_count = parseFloat(list[i].watchers_count);
    		if(list[i].watchers_count > highestWatcher){
    			highestWatcher = list[i].watchers_count;
    		}
    	};

    	for (var i = list.length - 1; i >= 0; i--) {
    		list[i].ranking = (list[i].watchers_count / highestWatcher) * appDataService.max;
    		
    	};



    	return list;
  	}

  	/**
  	 * Get commits just waits until the initial repo list is downloaded, and then makes a call to 
  	 * the commits list and injects it into each repo accordingly
  	 * @param  {List of repos} d [A list of repos lonely without its list of commits]
  	 * @return {List of repos}   [It doesn't really return, just makes the repo list less lonely with a list of commits!]
  	 */
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

  	/**
  	 * Get commits just waits until the initial repo list is downloaded, and then makes a call to 
  	 * the contributes list and injects it into each repo accordingly
  	 * @param  {List of repos} d [A list of repos lonely without its list of contributors]
  	 * @return {List of repos}   [It doesn't really return, just makes the repo list less lonely with a list of contributors!]
  	 * This is totally an exact copy of get commits with a different api call...
  	 */
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
