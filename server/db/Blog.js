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
  cover: {
    type: String,
    required: false,
    default: 'images/default.png'
  },
  tags: {
    type: Array,
    required: false 
  },
  h_content: {
    type: String,
    required: true
  },
  m_content: {
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
      Blog.find(query, { _id: 0, uuid: 1, h_content: 1, title: 1, modify_date: 1, tags: 1, cover: 1 }, (err, blogs) => {
        if(err) reject(err);

        resolve(blogs);
      });  
    });
  },
}