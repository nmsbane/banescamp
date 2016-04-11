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
          req.flash("error", err.message);
          res.redirect('register');
      } else {
          passport.authenticate("local")(req, res, function() {
              req.flash("success", "successfully logged in as " + user.username);
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
   req.flash("success", "successfully logged out");
   res.redirect('/campgrounds');
});



module.exports = router;