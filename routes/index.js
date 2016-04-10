var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get('/register', function(req, res) {
    res.render('register');
});

// Sign Up new user
router.post('/register', function(req, res) {
   var newUser = new User({username: req.body.username}) ;
   User.register(newUser, req.body.password, function(err, user) {
      if(err)  {
          console.log(err);
          return res.render('register');
      } else {
          passport.authenticate("local")(req, res, function() {
              res.redirect('/campgrounds');
          })
      }
   });
});

// show the login form when user visits /login
router.get('/login', function(req, res) {
   res.render('login') ;
});

// handle the post request from the login page
router.post('/login', passport.authenticate("local", 
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }
), function(req, res) {
    
});

// logout link
router.get('/logout', function(req, res) {
   req.logout();
   res.redirect('/campgrounds');
});

// create a middleware which will check if the user is logged in or not
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();   
    } 
    res.redirect('/login');
}


module.exports = router;