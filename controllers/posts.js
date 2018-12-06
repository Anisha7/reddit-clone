const Post = require('../models/post');
const User = require('../models/user')

module.exports = (app) => {

    // CREATE
    app.post("/posts", (req, res) => {

        var post = new Post(req.body);
        post.author = req.user._id;

        post
        .save()
        .then(post => {
            return User.findById(req.user._id);
        })
        .then(user => {
            user.posts.unshift(post);
            user.save();
            // REDIRECT TO THE NEW POST
            res.redirect("/posts/" + post._id);
        })
        .catch(err => {
            console.log(err.message);
        });
    });

    app.get("/", (req, res) => {
        var currentUser = req.user;
      
        Post.find({})
          .then(posts => {

            res.render("posts-index.handlebars", { posts, currentUser});
            
        })
          .catch(err => {
            console.log(err.message);
          });
    });

    app.get('/posts/new', (req, res) => {
        res.render('posts-new');
    })

    app.get("/posts/:id", function(req, res) {

        // LOOK UP THE POST
        Post.findById(req.params.id).populate('comments').then((post) => {
            User.findById(post.author).then((user) => {
                for (comment in post.comments) {
                    post.populate('comment')
                }
                res.render('post-show.handlebars', { post, user })
            })
        }).catch((err) => {
            console.log(err.message)
        })
        
      });

    // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
        Post.find({ subreddit: req.params.subreddit })
        .then(posts => {
            res.render("posts-index.hbs", { posts });
        })
        .catch(err => {
            console.log(err);
        });
    });

};