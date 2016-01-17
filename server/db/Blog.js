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
  create(blog) {
    return new Promise((resolve, reject) => {
      Blog.create(blog, (err, blog) => {
        if(err) reject(err);

        resolve(blog);
      });  
    });
  },
  save(blog) {
    return new Promise((resolve, reject) => {
      blog.save((err, blog) => {
        if(err) reject(err);

        resolve(blog);
      });  
    });
  },
  findByUuid(uuid) {
    return new Promise((resolve, reject) => {
      Blog.findOne({ uuid: uuid }, (err, blog) => {
        if(err) reject(err);

        resolve(blog);
      });
    });
  },
  findByTitle(title) {
    return new Promise((resolve, reject) => {
      Blog.find({ title: title }, (err, blog) => {
        if(err) reject(err);

        resolve(blog);
      });
    });
  },
  find(query) {
    return new Promise((resolve, reject) => {
      Blog.find(query, (err, blogs) => {
        if(err) reject(err);

        resolve(blogs);
      });  
    });
  }
}