var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

// add a bunch of all the campgrounds
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah"
    }
];

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            data.forEach(function(camp) {
                Campground.create(camp, function(err, camp) {
                   if(err)  {
                       console.log(err);
                   } else {
                       console.log("added a new background");
                       Comment.create(
                           {
                                text: "One of the best places i have ever seen",
                                author: 'Tom Hardy'
                           }, function(err, comment) {
                               if(err){
                                   console.log(err)
                               } else {
                                    camp.comments.push(comment);
                                    camp.save();
                                    console.log("creted new comment");    
                               }
                               
                           }
                       )
                   }
                });
            })
        }
    });
    
}


module.exports = seedDB;