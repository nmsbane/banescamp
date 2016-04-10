var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get('/', function(req, res) {
    Campground.find({}, function(err, camps) {
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: camps});        
        }
    })
    
    
});


router.post('/', function(req, res) {
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

router.get('/new', function(req, res) {
   res.render('campgrounds/new') ;
});

router.get('/:id', function(req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, camp) {
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/show', {camp: camp});
        }
    })
    
});

module.exports = router;