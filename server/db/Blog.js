var mongoose = require('./db_config.js');

var Blog = mongoose.model('Blog', new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
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
    required: true
  },
  modify_date: {
    type: Date,
    required: true
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
  find(query) {
    return new Promise((resolve, reject) => {
      Blog.find(query, { _id: 0}, (err, blogs) => {
        if(err) reject(err);

        resolve(blogs);
      });  
    });
  },
  findOne(query) {
    return new Promise((resolve, reject) => {
      Blog.findOne(query, {}, (err, blogs) => {
        if(err) reject(err);

        resolve(blogs);
      });  
    });
  },
  remove(query) {
    return new Promise((resolve, reject) => {
      Blog.remove(query, (err) => {
        if(err) reject(err);

        resolve();
      })
    })
  }
}