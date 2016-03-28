var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/pet_app');
mongoose.model("Pets", new Schema({"name" : String, "type" : String,
                "age":String, "urlimg": String}));
var Animal = mongoose.model("Pets");

//DB STUFF

app.get("/pets", function(req,res){
    Animal.find({}, function(err, data){
          if(err){
              console.log(err);
          }

          res.send(data);
      });
    //res.send("Get data");
});

app.delete("/pets/:id", function(req, res){
  Animal.remove({_id:  req.params.id }, function(err, data){
    if(err){
      console.log(err);
    }
    res.status(200).send();
  });
  
});

app.post("/pets", function(req,res){
    console.log(req.body);

    var addedPerson = new Animal({"name" : req.body.name, "type" : req.body.type,
                  "age": req.body.age, "urlimg": req.body.urlImg});
    addedPerson.save(function(err, data){
        if(err){
          console.log(err);
        }

        res.send(data);
    });
    //res.send("Post data");
});

app.get("/*", function(req, res){
  var file = req.params[0] || "/views/index.html";
  res.sendFile(path.join(__dirname, "/public/", file));
});

app.listen(app.get("port"), function(){
  console.log("listening on port: ", app.get("port"));
});

module.exports = app;
