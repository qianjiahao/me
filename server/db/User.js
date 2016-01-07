var mongoose = require('./db_config.js');
var uuid = require('uuid');

var User = mongoose.model('User', new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    default: uuid.v1()
  },
  username: {
    type: String,
    required: true
  },
  bcrypt_password: {
    type: String,
    required: true
  }
}));

module.exports = {
  create(user, cb) {
    User.create(user, (err, user) => {
      if(err) return cb(err);

      return cb(null, user);
    });
  },
  save(user, cb) {
    var user = new User(user);
    user.save((err, user) => {
      if(err) return cb(err);

      return cb(null, user);
    })
  },
  find(user, cb) {
    User.find(user, (err, user) => {
      if(err) return cb(err);

      return cb(null, user);
    });
  },
  findOne(user, cb) {
    User.findOne(user, (err, user) => {
      if(err) return cb(err);

      return cb(null, user);
    });
  }
}
