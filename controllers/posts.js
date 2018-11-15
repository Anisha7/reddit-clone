const Post = require('../models/post');

module.exports = (app) => {

    // CREATE
    app.post('/posts', (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);

        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            // REDIRECT TO THE ROOT
            return res.redirect(`/`);
        })
    });

    app.get('/', (req, res) => {
        // res.send('Hello World!');
        Post.find({})
        .then(posts => {
            res.render("posts-index.handlebars", { posts });
        })
        .catch(err => {
            console.log(err.message);
        });
    });

    app.get('/posts/new', (req, res) => {
        res.render('posts-new');
    })

    app.get('/posts', (req, res) => {
        Post.find().then(posts => {
            console.log(posts)
            res.render('posts-show', {posts: posts})
        })
        
    })

    app.get("/posts/:id", function(req, res) {
        // LOOK UP THE POST
        Post.findById(req.params.id)
          .then(post => {
            res.render("post-show.handlebars", { post });
          })
          .catch(err => {
            console.log(err.message);
          });
      });

};