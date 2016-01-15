import fs from 'fs';
import stat from './stat.js';
import copy from './copy.js';

function move (source, target, progress) {
  return new Promise((resolve, reject) => {

    stat(source)
      .then(() => {

        copy(source, target, progress)
          .then(() => {

            fs.unlink(source, err => {
              if(err) return reject(err);

              return resolve(target);
            });

          })
          .catch(err => {
            return reject(err);
          })

      })
      .catch(err => {
        return reject(err)
      })
  })
}

module.exports = move;