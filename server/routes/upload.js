var formidable = require('formidable');
var uploads_path = './app/public/uploads';
var Image = require('../db/Image.js');
var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var move = require('../util/move.js');

exports.upload = (req, res) => {
  var form = new formidable.IncomingForm();

  form.encoding = 'utf-8';
  form.uploadDir = './app/public/uploads/temp';
  form.keepExtensions = true;
  form.hash = 'md5';

  form.on('progress', (size, total) => {
    console.log(`receive ${(size/total*100).toFixed(2)}%`);
  });

  form.parse(req, (err, fields, files) => {
    if(err) return res.json({ result: 'error', err: err });
  });

  form.on('error', (err) => {
    return res.json({ result: 'error', err: err });
  });

  form.on('aborted', () => {
    return res.json({ result: 'aborted', msg: 'upload request aborted' });
  });

  form.on('end', () => {
    
    var temp_path = './app/public/uploads/temp';
    var images_path = './app/public/uploads/images';

    fs.readdir(temp_path, (err, temp) => {
      if(err) console.log(err);

      if(temp && temp.length) {

        Image.create(temp, (err) => {
          if(err) console.log(err);

          fs.readdir(temp_path, (err, temp) => {
            if(err) console.log(err);

            Promise.all(temp.map((v) => {
              return new Promise((resolve, reject) => {
                move(path.join(temp_path, v), path.join(images_path, v), (size, total) => console.log(`move ${v} : ${(size/total*100).toFixed(2)}%`))
                  .then(filename => resolve(filename))
                  .catch(err => reject(err));
              });
            })).then(() => {
              console.log('upload images finished');
              
              return res.json({ result: 'ok', msg: 'upload success', data: temp });
            }).catch(err => console.log(err));
          })
        });
      } else {
        console.log('temp is empty');
      }
    });

  });
};


exports.query = (req,res) => {
  var pageSize = req.query.pageSize; 
  var pageNumber = req.query.pageNumber;

  pageSize = isNaN(pageSize) ? 20 : pageSize;
  pageNumber = isNaN(pageNumber) ? 1 : pageNumber;
  
  fs.readdir(uploads_path, (err, dir) => {
    if(err) return res.json({ result: 'error', msg: err });

    var list = [];
    var len = pageSize * pageNumber < dir.length ? pageNumber * pageSize : dir.length;
    for(let i = (pageNumber-1) * pageSize; i < len; i++) {
      list.push(dir[i]);
    }

    var currentPage = pageNumber;
    var totalPage = Math.ceil(dir.length / pageSize);

    return res.json({ 
      result: 'ok', 
      data: {
        list: list,
        currentPage: currentPage,
        totalPage: totalPage
      }
    });
  });
};

