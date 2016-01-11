var mongoose = require('./db_config.js');
var uuid = require('uuid');

var Blog = mongoose.model('Blog', new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    default: uuid.v1()
  },
  title: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: false 
  },
  content: {
    type: String,
    required: true
  },
  comments: {
    type: Array,
    required: false
  },
  create_date: {
    type: Date,
    required: true,
    default: new Date()
  },
  modify_date: {
    type: Date,
    required: true,
    default: new Date()
  },
  publish: {
    type: Number,
    required: true,
    default: 0
  }
}));

module.exports = {
  create(blog, cb) {
    Blog.create(blog, (err, blog) => {
      if(err) return cb(err);

      return cb(null, blog);
    });
  },
  findByTitle(title, cb) {
    Blog.find({ title: title }, (err, blog) => {
      if(err) return cb(err);

      return cb(null, blog);
    });
  },
  findAll(cb) {
    Blog.find({}, (err, blogs) => {
      if(err) return cb(err);

      return cb(null, blogs);
    });
  }
}