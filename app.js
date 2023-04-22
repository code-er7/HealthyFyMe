const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(express.static("public"));
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/healthyUsers");
var counter = 0 ;
var Userdata = null;
const appUser = new mongoose.Schema({
    name:String,
    bmi:Number,
    email:String,
    password:String
});

const User =  new mongoose.model('user' , appUser);
app.get("/" , function(req , res){
    Userdata = null
    res.render("home");
});
app.get("/login" , function(req , res){
    Userdata = null
    res.render("login" , {count: counter });
});
app.get("/register" , function(req , res){
    counter = 0 ;
    Userdata = null
    res.render("register");
});
app.get("/website" ,function(req, res){
    counter = 0 ;
    if(Userdata==null)res.redirect("/login");
    else{
    console.log(Userdata.name , Userdata.BMI);
    res.render("website");
    }
    
});
app.post("/login" , function(req , res){
    var Uemail = req.body.username;
    var password = req.body.password;
    datafinder();
    // console.log(Uname);
    async function datafinder(){
        try{
           const foundUser = await User.findOne({email:Uemail});
           if(foundUser == null){
            counter++;
            res.render("login" , {count: counter });  
           }
           else{
            Userdata = foundUser;
           if(foundUser.password==password){
            counter = 0 ;
            res.redirect("/website");
           }
           else{
               counter++;
               res.render("login" , {count: counter });  
           }
           } 
        }
        catch(err){
            console.log(err);
        }
    }
    
});
app.post("/register" , function(req , res){
    counter = 0;
    var Uemail = req.body.username;
    var Upassword = req.body.password;
    var uname = req.body.name;
    var Uweight = req.body.weight;
    var Uheight = req.body.height;
    const BMI = Uweight/(Uheight*Uheight);
    registerinDB();
    async function registerinDB(){
        try{
          const newUser = User({
            name:uname,
            bmi:BMI,
            email:Uemail,
            password:Upassword
          });
          await newUser.save();
          res.redirect("/website");
        }
        catch(err)
        {
            console.log(err);
        }
    }
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
