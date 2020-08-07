//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");
var _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-Aditya:aditya@740860@cluster0-rtoix.mongodb.net/HomeDB", {useUnifiedTopology: true , useNewUrlParser: true});


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const homeSchema = new mongoose.Schema({
  Title: String,
  Content: String,
  Author: String,
  College: String,
  Date: String
});

const HomeItem = mongoose.model("HomeItem" , homeSchema);


const pinSchema = new mongoose.Schema({
  Title: String,
  Content: String,
  Author: String,
  College: String,
  Date: String
});

const pinItem = mongoose.model("pin" , pinSchema);


let temp = new HomeItem({
  Title: "",
  Content: "",
  Author: "",
  College: "",
  Date: ""
});

app.get("/", function(req, res){

  HomeItem.find({}, function(err, foundList){
    if(err){
      console.log(err);
    }else{
      console.log("Success");
     res.render("home", {Items: foundList});
    }
  });

});

app.get("/audvid", function(req, res){
  res.render("audvid");
});

app.get("/watch" , function(req, res){
  res.render("watch");
});

app.get("/pinned", function(req, res){
  pinItem.find({}, function(err, foundList){
    if(err){
      console.log(err);
    }else{
      res.render("pinned" ,{pinarticles: foundList});
    }
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});


app.post("/", function(req, res){

  const  post = new HomeItem({
  Title:  req.body.Title,
  Content:  req.body.Content,
  Author: req.body.author,
  College:  req.body.CollegeName,
  Date: date.getDate()
  });
  post.save(function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Success Here And Added SuccesFully");
      res.redirect("/");
    }
  });
// end of post("/")
});

app.get("/post", function(req, res){
  res.render("post", {thisOne: temp});
});

app.get("/posts/:Name", function(req,res){

HomeItem.find({}, function(err, foundList){
  if(err){
    console.log(err);
  }else{
    foundList.forEach(function(element) {
      if( _.lowerCase(element.Title) === _.lowerCase(req.params.Name) ){
        temp = element;
        res.redirect("/post");
      }
    });
  }
});

});


let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server is running on port 3000");
});
