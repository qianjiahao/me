import fs from 'fs';

function stat (source) {
  return new Promise((resolve, reject) => {
    fs.stat(source, (err, stats) => {
      if(err) return reject(err);

      return resolve(stats);
    });
  });
}

module.exports = stat;