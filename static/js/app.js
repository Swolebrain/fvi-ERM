angular.module('ERM', [])
.factory('employersService', ['$http', function($http){
  function getAllEmployers(){
    return $http.get('api/employers/').catch(err=>console.log(err.toString()));
  }

  return {getAllEmployers};
}])
.controller('MainController', ['$scope', 'employersService', function($scope, employersService){
  console.log("main controller is running");
  employersService.getAllEmployers().then(res=>$scope.employers = res.data);
  $scope.employerCardClick = (employer)=> employerCardClick($scope, employer);
  $scope.employers = [];
  $scope.currentEmployer = {};
}]);




function employerCardClick($scope, employer){
  $scope.currentEmployer = employer;
}
