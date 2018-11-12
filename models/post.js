const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = mongoose.model('Post', {
  title: String,
  subtitle: String,
  description: String,
});

module.exports = Post
