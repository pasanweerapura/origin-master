
require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true}));
app.use(session({
    secret: 'Our little secret.',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));


mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true,  useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    facebookId: String,
    secret: [type=String]
  });

  const User = mongoose.model("User", userSchema);




// home
app.get("/", function(req, res) {

    res.render("home");
});

app.get("/login", function(req, res) {

    res.render("login");
});

app.get("/register", function(req, res) {

    res.render("register");
});


app.post("/register", function(req, res) {
    User.register({username: req.body.username}, req.body.password, function(err, user){
      if(err){
        console.log(err);
        res.redirect("/register");
      }else{
        passport.authenticate('local')(req, res, function () {
          res.redirect('/secrets');
        });
      }
    });
  });

  
app.post("/login", function(req, res, next) {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });




app.listen("3000", function(){
    console.log("server running at port 3000");
})
