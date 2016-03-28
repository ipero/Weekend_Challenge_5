petApp.controller("AddController", ["$scope", "PetService", function($scope, PetService){
    var petObject = {};
    var petService = PetService;

    //POST HERE
    $scope.submit = function(data){
      petService.postData(data);
      petObject = {};
    };
}]);

petApp.controller("ShowController", ["$scope", "PetService", function($scope, PetService){
    var petService = PetService;

    //GET HERE
    petService.getData();
    $scope.data = PetService.petData;

    //$scope.deleteStuff = PetService.deleteData;
    $scope.deletePet = function(item){
      //var id = item.currentTarget.getAttribute("data-id");
      var id = item;
      console.log(id);
      petService.deleteData(id);
    };
    //sorting
    $scope.predicate = 'age';
    $scope.reverse = true;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };
}]);
