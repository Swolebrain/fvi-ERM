angular.module('ERM', [])
.factory('employersService', ['$http', function($http){
  function getAllEmployers(){
    return $http.get('api/employers/').catch(err=>console.log(err.toString()));
  }
  function saveEmployer(emp){
    return $http.put('api/employers/'+emp._id, emp).catch(err=>console.log(err.toString()));
  }
  function deleteEmployer(id){
    return $http.delete('api/employers/'+id).catch(err=>console.log(err.toString()));
  }

  return {getAllEmployers, saveEmployer, deleteEmployer};
}])
.controller('MainController', ['$scope', 'employersService', function($scope, employersService){
  console.log("main controller is running");
  employersService.getAllEmployers().then(res=>$scope.employers = res.data);
  $scope.employerCardClick = (employer)=> employerCardClick($scope, employer);
  $scope.employers = [];
  $scope.currentEmployer = {};
  $scope.saveCurrentEmployer = () => saveEmployer(employersService, $scope.currentEmployer);
  $scope.deleteCurrentEmployer = () => deleteEmployer(employersService, $scope);
}]);


function deleteEmployer(employersService, $scope){
  var emp = $scope.currentEmployer;
  if (emp._id){
    employersService.deleteEmployer(emp._id).then(res=>{
      console.log(res);
      $scope.employers = $scope.employers.filter(el=>el != emp);
    });
  }
  $scope.currentEmployer = {};
}

function employerCardClick($scope, employer){
  $scope.currentEmployer = employer;
}

function saveEmployer(employersService, employer){
  employersService.saveEmployer(employer).then(res=>console.log(res));
}
