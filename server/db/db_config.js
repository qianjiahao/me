var mongoose = require('mongoose');

var host = 'localhost';
var post = 27017;
var db = 'me';

mongoose.connect(`mongodb://${host}:${post}/${db}`);

module.exports = mongoose;