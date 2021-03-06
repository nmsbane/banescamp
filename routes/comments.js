var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = require("../middleware");

router.get('/new', middlewareObj.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render('comments/new', {camp: campground});
        }
    })
});

router.post('/', middlewareObj.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
       if(err)  {
           console.log(err);
           res.redirect('/campgrounds/');
       } else {
           Comment.create(req.body.comment, function(err, comment) {
               if(err) {
                   console.log(err);
               } else {
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   req.flash("success", "successfully created the comment");
                   res.redirect('/campgrounds/' + campground._id);
               }
           })
       }
    });
});

// EDIT THE COMMENT
router.get('/:comment_id/edit', middlewareObj.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
       if(err)  {
           req.flash("error", "The given comment is not found");
           res.redirect("back");
       } else {
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment}) ;       
       }
    });
    
});

// UPDATE THE COMMENT
router.put('/:comment_id', middlewareObj.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            res.redirect("back");
        } else {
            req.flash("success", "successfully updated the comment");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE THE COMMENT
router.delete('/:comment_id', middlewareObj.checkCommentOwnership, function(req, res) {
   Comment.findByIdAndRemove(req.params.comment_id, function(err) {
       if(err) {
           req.flash("error", "something went wrong");
           res.redirect("back");
       } else {
           req.flash("success", "successfully deleted the comment");
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});



module.exports = router;
