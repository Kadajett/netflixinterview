'use strict';

angular.module('netflixinterviewApp')
  .service('Controlpanelservice', function Controlpanelservice($rootScope) {
    var controlPanelService = this;
    controlPanelService.ascend = false;
    //This is to path the order of the list of repos around the application
    controlPanelService.order = '';
    controlPanelService.orderList = [{value:'forks'},
			{value:'ranking'},
			{value:'stargazers_count'}
			];
    controlPanelService.filterText = '';
			
    return controlPanelService;
  });
