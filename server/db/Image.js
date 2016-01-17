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
  create(data) {
    return new Promise((resolve, reject) => {
      if(type(data) === 'string') {
        data = [data];
      } 

      if(type(data) !== 'array') return reject('TypeError : type must be string or array');

      Promise.all(
        data.map((v) => {
          return new Promise((resolve, reject) => {
            
            var name = v.slice(v.lastIndexOf('/')+1, v.length);

            Image.create({ name: name }, (err, res) => {
              if(err) return reject(err);

              return resolve(res);
            })
          })
        })
      ).then(res => resolve(res)).catch(err => reject(err))  
    })
  },
  findByPage(data) {
    return new Promise((resolve, reject) => {
      var skip = (data.pageNumber - 1) * data.pageSize;
      var limit = +data.pageSize;
      
      Image.count((err, total) => {
        if(err) return reject(err);

        Image.find().sort({ upload_Date: -1 })
          .skip(skip).limit(limit)
          .exec((err, images) => {
            if(err) return reject(err);

            var result = [];

            images.map((image) => {
              result[result.length] = image.name;
            })
            resolve({ result: result, total: total});
          })  
      })
    })
  },
  remove(data) {
    return new Promise((resolve, reject) => {

      Promise.all(
        data.map((v) => {
          return new Promise((resolve, reject) => {
            Image.remove({ name: v }, (err) => {
              if(err) return reject(err);

              resolve(v)
            })  
          })
        })
      ).then(res => resolve(res)).catch(err => reject(err));
    })
  }
}