petApp.factory("PetService", ["$http", function($http){
    var greeting = function(){
      console.log("Works");
    };
    var data = {};
    var getData = function(){
       $http.get("/pets").then(function(response){
          console.log(response.data);
          data.results = response.data;
       });
    };


    var postData = function(data){
        $http.post("/pets", data).then(function(response){
          console.log(response.data);

       });
    };

    var deleteData = function(data){

          $http.delete("/pets/" + data).then(function(response){
          getData();
      });
    }

    return {
      postData: postData,
      getData: getData,
      greeting: greeting,
      petData: data,
      deleteData: deleteData
    };
}]);
