'use strict';

angular.module('netflixinterviewApp')
  .service('Dataformattedservice', function Dataformattedservice(Appdataservice, $rootScope) {
    
  	var dataFormattedService = this;

    dataFormattedService.originalList;
    dataFormattedService.formattedList;

    dataFormattedService.init = function(){
    	
    	
    }

    $rootScope.$on('dataLoaded', function(){
    	dataFormattedService.originalList = Appdataservice.results;
    })
	
		

    dataFormattedService.stars = function(list){
    	for (var i = list.length - 1; i >= 0; i--) {
    		list[i].description = 'poop';
    	};
    	return list;
    }

    
    dataFormattedService.init();

    return dataFormattedService.originalList;
  });
