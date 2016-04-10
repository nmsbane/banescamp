var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seed");
var Comment = require("./models/comment");

seedDB();
 
// connect to banes_camp database
mongoose.connect("mongodb://localhost/banes_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));


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

app.get('/campgrounds/:id/comments/new', function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render('comments/new', {camp: campground});
        }
    })
});

app.post('/campgrounds/:id/comments', function(req, res) {
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

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The camp server has started");
});