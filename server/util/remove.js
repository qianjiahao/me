var fs = require('fs');
var path = require('path');

function remove (source, type) {
  return new Promise((resolve, reject) => {
    fs.stat(source, (err) => {
      if(err) return reject(err);

      if(type === 'file') {
        fs.unlink(source, (err) => {
          if(err) return reject(err);

          return resolve(source);
        })
      } else {
        fs.readdir(source, (err, dir) => {
          if(err) return reject(err);

          if(dir && !dir.length) return reject('directory is empty now!');

          Promise.all(
            dir.map((v) => {
              return new Promise((resolve, reject) => {
                fs.unlink(path.join(source, v), (err) => {
                  if(err) return reject(err);

                  return resolve(path.join(source, v));
                });
              });
            })
          ).then(res => resolve(res)).catch(err => reject(err))
        })
      }
    })
  })
}

module.exports = remove;

