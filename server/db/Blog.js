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
    required; false 
  },
  content: {
    type: String,
    required: true
  }
}));