'use strict';

angular.module('netflixinterviewApp')
  .controller('ContribCtrl', function ($scope, repo) {
  	// This controller only exists to pass data to the repo view.
  	// There would probably be a lot more logic in here if I had time to ponder it.
    $scope.filterText = '';
    $scope.repo = repo;
  });
