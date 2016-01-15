var mongoose = require('./db_config.js');
var type = require('type-of');

var Image = mongoose.model('Image', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  upload_Date: {
    type: Date,
    required: true,
    default: new Date()
  }
}));

module.exports = {
  create(data, cb) {
    if(type(data) === 'string') {
      Image.create({ name: data }, (err, res) => {
        if(err) return cb(err);

        return cb(null, res);
      })
    } else if(type(data) === 'array') {
      Promise.all(data.map((v) => {
        return new Promise((resolve, reject) => {
          Image.create({ name: v }, (err, res) => {
            if(err) return reject(err);

            return resolve(res);
          })
        })
      })).then(res => {
        return cb(null, res);
      }).catch(err => {
        return cb(err);
      })

    } else {
      console.log(`type : ${type(data)}`);
      cb('TypeError : type must be string or array');
    }
  }
}