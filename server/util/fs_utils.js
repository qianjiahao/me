var fs = require('fs');
var path = require('path');

exports.copy = copy;
exports.iter = iter;
exports.remove = remove;

/**
 * 复制文件、文件夹
 * @param  {[type]} source   [description]
 * @param  {[type]} target   [description]
 * @param  {[type]} type     [description]
 * @param  {[type]} progress [description]
 * @return {[type]}          [description]
 */
function copy (source, target, type, progress) {
  return new Promise((resolve, reject) => {

    fs.stat(source, (err, stats) => {

      if(err) return reject(err);

      fs.stat(target, (err) => {
        if(err) return reject(err);

        if(type === 'file') {

          var ss = fs.createReadStream(source);
          var ts = fs.createWriteStream(target);

          ss.on('error', err => reject);
          ts.on('error', err => reject);

          var copySize = 0;

          ss.on('data', data => {
            copySize += data.length;
            progress && progress(copySize, stats.size);
          });

          ss.on('end', () => resolve(target))

          ss.pipe(ts);

        } else {

          fs.readdir(source, (err, dir) => {
            if(err) return reject(err);

            if(dir && !dir.length) return reject('directory is empty now');

            Promise.all(
              dir.map((v) => {
                return new Promise((resolve, reject) => {
                  var sub_source = path.join(source, v);
                  var sub_target = path.join(target, v);

                  fs.stat(sub_source, (err, stats) => {
                    if(err) return reject(err);

                    var ss = fs.createReadStream(sub_source);
                    var ts = fs.createWriteStream(sub_target);

                    ss.on('error', err => reject);
                    ts.on('error', err => reject);

                    var copySize = 0;

                    ss.on('data', data => {
                      copySize += data.length;
                      progress && progress(copySize, stats.size);
                    });

                    ss.on('end', () => resolve(sub_target))

                    ss.pipe(ts);  
                  })
                })
              })
            ).then(res => resolve(res)).catch(err => reject(err))
          })
        }
      })
    })
  })
}


/**
 * 遍历目标路径
 * @param  {[type]} sources [description]
 * @return {[type]}         [description]
 */
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


/**
 * 删除文件、清空文件夹
 * @param  {[type]} source [description]
 * @param  {[type]} type   [description]
 * @return {[type]}        [description]
 */
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
