'use strict';

angular.module('netflixinterviewApp')
  .service('Appdataservice', function Appdataservice($q, $http, $rootScope, Dataformattedservice) {
   var appDataService = this;
   appDataService.result = '';
   appDataService.org = ''
   appDataService.max = 5;
   appDataService.authed = false;
   appDataService.ref = '';
   appDataService.orderBy == '';

  /**
   * @title setOrg()
   * @description Changes the organization searched by the user
   * The reason this function exists, as opposed to two way data binding
   * is because it would be combursome to make a call to github whenever 
   * the user changed the org value. 
   * @param {[type]} org [description]
   */
  appDataService.setOrg = function(org){
    appDataService.org = org;
  }
  
  /**
   * @title oauth()
   * @description oauth makes the call to authio which is an authentication service
   * I went this route, because it seemed a little out of scope of the project 
   * to work on a node chunk to handle authentication. 
   * I could have handled this clien side, but then privacy.
   * @return {promise} [A promise watching for succeeded authentication]
   */
  appDataService.oauth = function () {
    var defer = $q.defer();
    // if the application has NOT been authenticated.
    if(!appDataService.ref){
      // The key is my oauth public key. No biggie ;)
      OAuth.initialize('o4UWv7GYcMgYsqunPgURZkzTztA');
      OAuth.popup('github', function(err, result) {
        if (err) {
          appDataService.authed = false;
          defer.reject(false);
          return defer.promise;
        }
        appDataService.authed = true;
        appDataService.ref = result.access_token;
        defer.resolve(true);
        return defer.promise;
      });
    }
    return defer.promise;
  }

    /**
    * The Big Kahuna
    * This makes all the magic happen
    * pulling in data form the github api
    * @param  {[array of objects]} org [description]
    * @return {[Promise]}     [A promise of the inital repos pull. 
    * The deferred promise calls formatData and getContribs after the data is accessed]
    */
   appDataService.getData = function(){
      
    appDataService.deferred = $q.defer();

      $http.get('https://api.github.com/orgs/'+ appDataService.org + '/repos?access_token=' + appDataService.ref)
      .success(function(data){
        appDataService.listData = data;
        appDataService.deferred.resolve(data);
      }).error(function(data, status){
        appDataService.deferred.reject(data);
        appDataService.listData = data;

        if(status = 403){
          alert("Org Doesn't Exist! Oh No!");
          appDataService.oauth();
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
  		 		$http.get('https://api.github.com/repositories/' + d.id + '/commits?top=master&access_token=' + appDataService.ref)
  		 		.success(function(r){
  		 			angular.forEach(r, function(d){
  		 				if(d.commit.message){
  		 					d.commit.message = d.commit.message.substr(0,90);
  		 				}
              //sends the dates to get formatted. Kind of like a slaughter house really.
              //Its quite sad.
              d.commit.author.date = Dataformattedservice.formatDate(d.commit.author.date);
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
  		 		$http.get('https://api.github.com/repos/' + d.full_name + '/collaborators?access_token=' + appDataService.ref)
  		 		.success(function(r){
  		 			d.contributers = r;
  		 		}).error(function(r){
  		 			
  		 		})
  		 	});
      
  	}
  	


  	

  	return appDataService;
  });
