'use strict';

angular.module('netflixinterviewApp')
  .controller('CommitsCtrl', function ($scope, repo) {
    $scope.repo = repo;
    console.log(repo);
  });
