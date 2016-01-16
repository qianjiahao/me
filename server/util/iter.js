var fs = require('fs');
var path = require('path');

function iter (sources) {
  return new Promise((resolve, reject) => {
    fs.stat(sources, (err) => {
      if(err) reject(err);

      fs.readdir(sources, (err, file) => {
        if(err) reject(err);

        resolve(file);
      })
    })
  })
}

module.exports = iter;