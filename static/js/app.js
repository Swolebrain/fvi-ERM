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
  $scope.employerCardClick = ()=> employerCardClick($scope);
  $scope.employers = [];
}]);




function employerCardClick($scope){
  console.log("a card got clicked")
}
