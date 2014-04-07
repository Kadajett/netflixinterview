'use strict';

angular.module('netflixinterviewApp')
  .service('Dataformattedservice', function Dataformattedservice() {
    
    var dataFormattedService = this;
    dataFormattedService.max = 5;

    dataFormattedService.init = function(){
    	
    	
    }

    dataFormattedService.formatDate = function(date){
        date = date.replace('T', ' Time: ');
        date = date.replace('Z', '');
        date = "date: ".concat(date);
        return date;
    }
	
	dataFormattedService.getRanking = function(list){

        var highestWatcher = 0;
        for (var i = list.length - 1; i >= 0; i--) {
            list[i].watchers_count = parseFloat(list[i].watchers_count);
            if(list[i].watchers_count > highestWatcher){
                highestWatcher = list[i].watchers_count;
            }
        };

        for (var i = list.length - 1; i >= 0; i--) {
            list[i].ranking = (list[i].watchers_count / highestWatcher) * dataFormattedService.max;
            
        };


        return list;
    }


    
    dataFormattedService.init();

    return dataFormattedService.originalList;
  });
