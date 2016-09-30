angular.module('SwipeJobsApp', [])
.controller('JobController', ['$log', '$scope', 'JobService', function($log, $scope, JobService){
  $log.log('MainController initiated');
  JobService.getJobs().then(function(response){
    $log.info('reading data from job service');
    $scope.jobs = response.data;
    $scope.total = $scope.jobs.shifts.length;
    $scope.jobStartDate = $scope.jobs.shifts[0].startDate;
    $scope.jobEndDate = $scope.jobs.shifts[$scope.total - 1].endDate;

    //$log.debug('From Services', $scope.jobs);
  });
}])
.service('JobService', ['$http', '$q', function($http, $q){
  return {
    getJobs: function(){
      var list = $q.defer();
      $http.get('../resources/json/jobs.json').then(function(response){
        list.resolve(response);
      }, function(response){
        list.reject(response);
      }
    );
    return list.promise;
 }
};
}]);
