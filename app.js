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
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");
var methodOverride = require("method-override");
var flash = require("connect-flash");

//seedDB();

 
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
app.use(flash());


// configure express app to use the method override module
app.use(methodOverride("_method"));

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');

// middleware to put the currentUser in every response local variables
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use('/', indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);

app.get('/', function(req, res) {
    res.render('landing');
});




app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The camp server has started");
});