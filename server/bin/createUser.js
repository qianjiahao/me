var User = require('../db/User.js');
var bcrypt = require('bcrypt');

var user = {
  username: 'qianjiahao',
  bcrypt_password: 'aboutme'
};

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(user.bcrypt_password, salt, (err, hash) => {
    user.bcrypt_password = hash;

    User.save(user, (err, user) => {
      if(err) return err;

      console.log('save user');
      console.log(user);
    });
  });
});

