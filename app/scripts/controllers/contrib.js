'use strict';

angular.module('netflixinterviewApp')
  .controller('ContribCtrl', function ($scope, repo) {
    $scope.filterText = '';
    $scope.repo = repo;
  });
