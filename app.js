var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var Campground = require("./models/campground");
var seedDB = require("./seed");
var Comment = require("./models/comment");
var User = require("./models/user");

seedDB();

 
// connect to banes_camp database
mongoose.connect("mongodb://localhost/banes_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
    secret: "A secret key",
    resave: false,
    saveUninitialized: false
}));



app.use(express.static(__dirname + '/public'));

// configure passport
app.use(passport.initialize());
app.use(passport.session());

// middleware to put the currentUser in every response local variables
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    Campground.find({}, function(err, camps) {
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: camps});        
        }
    })
    
    
});


app.post('/campgrounds', function(req, res) {
    // get the form data
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    
    
    var campground = {
        name: name,
        image: image,
        description: description
    };
    // create a new campground in the database
    Campground.create(campground, function(err, camp) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    })
});

app.get('/campgrounds/new', function(req, res) {
   res.render('campgrounds/new') ;
});

app.get('/campgrounds/:id', function(req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, camp) {
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/show', {camp: camp});
        }
    })
    
});

// ============================
// COMMENTS ROUTES
// ===========================

app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render('comments/new', {camp: campground});
        }
    })
});

app.post('/campgrounds/:id/comments', isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
       if(err)  {
           console.log(err);
           res.redirect('/campgrounds/');
       } else {
           Comment.create(req.body.comment, function(err, comment) {
               if(err) {
                   console.log(err);
               } else {
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect('/campgrounds/' + campground._id);
               }
           })
       }
    });
})

// =============================
// AUTHENTICATION ROUTES
// =============================

app.get('/register', function(req, res) {
    res.render('register');
});

// Sign Up new user
app.post('/register', function(req, res) {
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
app.get('/login', function(req, res) {
   res.render('login') ;
});

// handle the post request from the login page
app.post('/login', passport.authenticate("local", 
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }
), function(req, res) {
    
});

// logout link
app.get('/logout', function(req, res) {
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


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The camp server has started");
});