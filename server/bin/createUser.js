var User = require('../db/User.js');
var bcrypt = require('bcrypt');
var data = require('../../data.js');

if(Object.keys(data)) {

  User.findOne({ username: data.username }, (err, user) => {
    if(err) return err;

    if(user) {
      return console.log('Find one reuslt : ', user);
    }

    if(!user) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(data.bcrypt_password, salt, (err, hash) => {
          data.bcrypt_password = hash;

          User.create(data, (err, user) => {
            if(err) return err;

            console.log('Create one user : ', user);
          });
        });
      });    
    }
  })
}



