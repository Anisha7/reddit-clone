// variables
const express = require('express');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit-clone');
//import express from 'express'
const methodOverride = require('method-override')
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
// initializing handlebars
const exphbs = require('express-handlebars');

const Post = require('./models/post')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// serve all client-side assets in its public folder
app.use(express.static('public'))
// handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))


// routes
app.get('/', (req, res) => {
    res.send('Hello World!');
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

app.post('/posts', (req, res) => {
    console.log(req.body)
    Post.create(req.body).then(post => {
        res.redirect('/')
    }).catch((err) => {
        console.log(err.message);
      })
});
// host
app.listen(port, () => console.log(`Example app listening on port ${port}!`))