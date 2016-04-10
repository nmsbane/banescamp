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


router.post('/', isLoggedIn, function(req, res) {
    // get the form data
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    
    var author = {id: req.user._id, username: req.user.username }
    var campground = {
        name: name,
        image: image,
        description: description,
        author: author
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

router.get('/new',isLoggedIn,  function(req, res) {
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


// EDIT ROUTE
router.get('/:id/edit', checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampGround) {
        if(err) {
            res.redirect('/campgrounds')
        } else {
            res.render('campgrounds/edit', {campground: foundCampGround});
        }
    });
})

// UPDATE ROUTE
router.put('/:id', checkCampgroundOwnership, function(req, res) {
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err)  {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
   }); 
});

// DELETE A CAMPGROUND
router.delete('/:id', checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });  
});


// create a middleware which will check if the user is logged in or not
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();   
    } 
    res.redirect('/login');
}

// check the ownership of the user to edit or delete campground
function checkCampgroundOwnership(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampGround) {
            if(err)  {
                res.redirect("back");
            } else {
                if(foundCampGround.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}


module.exports = router;