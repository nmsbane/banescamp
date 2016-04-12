# banescamp
A website which shows the list of campgrounds, and the user can comment or edit about campgrounds.

This website is developed using MEN Stack. 

## A brief intro to functionality of site.

A user who is not logged in or signed up is free to view all the list of campgrounds, associated comments, and information about campground

Only a logged in user can post comments. Otherwise he is redirected to login page.

Only the owner of the comment or campground, can edit or delete the campground or comment.

### Things i learned

All the routes are RESTful.

#### For campgrounds
 /campgrounds     &nbsp;&nbsp;&nbsp;&nbsp;GET &nbsp;&nbsp;&nbsp;&nbsp;shows the list of campgrounds                  <br />
 /campgrounds/new  &nbsp;&nbsp;&nbsp;&nbsp;                       GET    &nbsp;&nbsp;&nbsp;&nbsp;             shows the form to create new campground        <br />
 /campgrounds     &nbsp;&nbsp;&nbsp;&nbsp;                        POST    &nbsp;&nbsp;&nbsp;&nbsp;            create a new campground                        <br />
 /campgrounds/:id    &nbsp;&nbsp;&nbsp;&nbsp;                     GET    &nbsp;&nbsp;&nbsp;&nbsp;             Show the specific campground                   <br />
 /campgrounds/:id/edit  &nbsp;&nbsp;&nbsp;&nbsp;                  GET    &nbsp;&nbsp;&nbsp;&nbsp;             Show the specific campground for edit          <br />
 /campgrounds/:id      &nbsp;&nbsp;&nbsp;&nbsp;                   PUT    &nbsp;&nbsp;&nbsp;&nbsp;             Update the specific campground                 <br />
 /campgrounds/:id     &nbsp;&nbsp;&nbsp;&nbsp;                    DELETE  &nbsp;&nbsp;&nbsp;&nbsp;            Delete the specific campground                 <br />


#### For comments
/campgrounds/:id/comments/new  &nbsp;&nbsp;&nbsp;&nbsp;                         GET  &nbsp;&nbsp;&nbsp;&nbsp;              shows a form to enter comments  <br/>
/campgrounds/:id/comments   &nbsp;&nbsp;&nbsp;&nbsp;                            POST &nbsp;&nbsp;&nbsp;&nbsp;              Post a new comment for the particular camp ground <br/>
/campgrounds/:id/comments/:comment_id/edit &nbsp;&nbsp;&nbsp;&nbsp;             GET  &nbsp;&nbsp;&nbsp;&nbsp;              Shows the form to edit the comment  <br />
/campgrounds/:id/comments/:comment_id &nbsp;&nbsp;&nbsp;&nbsp;                  PUT  &nbsp;&nbsp;&nbsp;&nbsp;              Update the specific comment <br />
/campgrounds/:id/comments/:comment_id/delete &nbsp;&nbsp;&nbsp;&nbsp;           DELETE &nbsp;&nbsp;&nbsp;&nbsp;            To delete the specific comment <br />

- Learnt about using middlewares, and creating middlewares
- Learnt about using bootstrap, and Semantic UI
- Learnt about using express, express router, static middleware.
- Learnt how to use MongoLab to handle my mongo database.
- Learnt about the use of `mergerParams ` in express.router

