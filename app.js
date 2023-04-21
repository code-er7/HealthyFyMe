const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(express.static("public"));
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/healthyUsers");
const appUser = new mongoose.Schema({
    email:String,
    password:String
});
const User =  new mongoose.model('user' , appUser);
app.get("/" , function(req , res){
    res.render("home");
});
app.get("/login" , function(req , res){
    res.render("login");
});
app.get("/register" , function(req , res){
    res.render("register");
});
app.listen(3000 , function(){
    console.log("app is listening on port 3000");
});
