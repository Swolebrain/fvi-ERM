angular.module('ERM', [])
.factory('employersService', ['$http', function($http){
  function getAllEmployers(){
    return $http.get('api/employers/').catch(err=>console.log(err.toString()));
  }
  function saveEmployer(emp){
    return $http.put('api/employers/'+emp._id, emp).catch(err=>console.log(err.toString()));
  }

  return {getAllEmployers, saveEmployer};
}])
.controller('MainController', ['$scope', 'employersService', function($scope, employersService){
  console.log("main controller is running");
  employersService.getAllEmployers().then(res=>$scope.employers = res.data);
  $scope.employerCardClick = (employer)=> employerCardClick($scope, employer);
  $scope.employers = [];
  $scope.currentEmployer = {};
  $scope.saveCurrentEmployer = () => saveEmployer(employersService, $scope.currentEmployer);
}]);




function employerCardClick($scope, employer){
  $scope.currentEmployer = employer;
}

function saveEmployer(employersService, employer){
  console.log("going to save...");
  console.log(employer);
  employersService.saveEmployer(employer).then(res=>console.log(res));
}
