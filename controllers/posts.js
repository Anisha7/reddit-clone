const Post = require('../models/post');

module.exports = (app) => {

    // CREATE
    app.post("/posts", (req, res) => {
        if (req.user) {
        var post = new Post(req.body);
    
        post.save(function(err, post) {
            return res.redirect(`/`);
        });
        } else {
        return res.status(401); // UNAUTHORIZED
        }
    });

    app.get("/", (req, res) => {
        var currentUser = req.user;
      
        Post.find({})
          .then(posts => {
            res.render("posts-index.handlebars", { posts, currentUser });
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
            res.render('post-show.handlebars', { post })
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