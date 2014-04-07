'use strict';

angular.module('netflixinterviewApp')
  .service('Appdataservice', function Appdataservice($q, $http, $rootScope, Dataformattedservice) {
   var appDataService = this;
   appDataService.result = '';
   appDataService.org = '';
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
        appDataService.listData = '';
        appDataService.deferred.reject([]);
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
  	 * @param  {List of repos} list [Just a list of repos that get looped through and get formatted]
  	 * @return {list of repos}      [returns the formatted list of repos. Simple.]
  	 */
  	appDataService.formatData = function(list){
    	return Dataformattedservice.getRanking(list);
  	}

  	/**
  	 * Get commits just waits until the initial repo list is downloaded, and then makes a call to 
  	 * the commits list and injects it into each repo accordingly
     * I am getting a 409 conflict error here. I should really intercept it, 
     * but I want to know why I am not getting the same error in the getContribs()... 
  	 * @param  {List of repos} d [A list of repos lonely without its list of commits]
  	 * @return {List of repos}   [It doesn't really return, just makes the repo list less lonely with a list of commits!]
  	 */
  	appDataService.getCommits = function(d) {
  	 	angular.forEach(d, function(repo){
  	 		$http.get('https://api.github.com/repositories/' + repo.id + '/commits?access_token=' + appDataService.ref)
  	 		.success(function(r){
  	 			angular.forEach(r, function(commitD){
  	 				if(commitD.commit.message){
  	 					commitD.commit.message = commitD.commit.message.substr(0,90);
  	 				}
            //sends the dates to get formatted. Kind of like a slaughter house really.
            //Its quite sad.
            commitD.commit.author.date = Dataformattedservice.formatDate(commitD.commit.author.date);
  	 			});
  	 			repo.commits = r;
  	 		}).error(function(data, status){
  	 			if(status == '409'){
            repo.noCommits = true;
          }
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
            // For whatever reason, the API isn't returning a 409 on no contributers like it does 
            // for no commits. I should really complain ;)
            // Until it is resolved, this if/else will have to work
            if(r.length == 0){
              d.noContribs = true;
            }else{
              d.contributers = r;
              d.noContribs = false;
              angular.forEach(d.contributers, function(contrib){
                if(!contrib.avatar_url){
                  contrib.avatar_url = 'http://lorempixel.com/output/animals-q-c-460-460-4.jpg';
                }
                // Get followers
                $http.get(contrib.followers_url + '?access_token=' + appDataService.ref)
                .success(function(followers){
                  contrib.followerCount = followers.length;
                }).error(function(){
                  // don't know what I would do with this error...
                  // Tested tons of users, this never returned as a 404 or 409. I think 
                  // I am good here. Very Nice!
                })
              })
            }
  		 		}).error(function(data, status){
  		 			d.noContribs = true;
  		 		})
  		 	});
      
  	}
  	


  	

  	return appDataService;
  });
