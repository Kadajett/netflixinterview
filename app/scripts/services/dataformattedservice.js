'use strict';

angular.module('netflixinterviewApp')
  .service('Dataformattedservice', function Dataformattedservice() {
    
    var dataFormattedService = this;

    dataFormattedService.init = function(){
    	
    	
    }

    dataFormattedService.formatDate = function(date){
        date = date.replace('T', ' Time:');
        date = date.replace('Z', '');
        date = "date: ".concat(date);
        return date;
    }
	
		


    
    dataFormattedService.init();

    return dataFormattedService.originalList;
  });
