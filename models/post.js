const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = mongoose.model('Post', {
  title: String,
  subtitle: String,
  content: String,
});

module.exports = Post
