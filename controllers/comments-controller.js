const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = function(app) {

    // CREATE Comment
    // app.post("/posts/:postId/comments", function(req, res) {
    //     // INSTANTIATE INSTANCE OF MODEL
    //     const comment = new Comment(req.body);
    //     comment.author = req.user._id;
    
    //     // SAVE INSTANCE OF Comment MODEL TO DB
    //     comment
    //     .save()
    //     .then(comment => {
    //         return Post.findById(req.params.postId);
    //     })
    //     .then(post => {
    //         post.comments.unshift(comment);
    //         return post.save();
    //     })
    //     .then(post => {
    //         res.redirect(`/posts/${req.params.postId}`);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });


    // });

    // CREATE
    app.post("/posts/:postId/comments", function(req, res) {
        // FIND THE PARENT POST
        Post.findById(req.params.postId).exec(function(err, post) {
        // UNSHIFT A NEW COMMENT
        post.comments.unshift(req.body);
        // SAVE THE PARENT
        post.save();
    
        // REDIRECT BACK TO THE PARENT POST#SHOW PAGE TO SEE OUR NEW COMMENT IS CREATE
        return res.redirect(`/posts/` + post._id);
        });
    })
};