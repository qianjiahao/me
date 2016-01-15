import fs from 'fs';
import stat from './stat.js';

function copy (source, target, progress) {
  return new Promise((resolve, reject) => {

    stat(source)
      .then(file => {

        let ss = fs.createReadStream(source);
        let ts = fs.createWriteStream(target);

        ss.on('error', err => reject);
        ts.on('error', err => reject);

        let copySize = 0;

        ss.on('data', data => {
          copySize += data.length;
          progress && progress(copySize, file.size);
        });

        ss.on('end', () => resolve(target))

        ss.pipe(ts);

      })
      .catch(err => {
        return reject(err);
      })
  })
}

module.exports = copy;