var formidable = require('formidable');
var uploads_path = './app/public/uploads';
var Image = require('../db/Image.js');
var fs = require('fs');
var path = require('path');

var copy = require('../util/copy.js');
var remove = require('../util/remove.js');
var iter = require('../util/iter.js');


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

    try {
      (async function () {
        var target = await copy(temp_path, images_path, 'dir', (size, total) => console.log(`copy : ${(size/total*100).toFixed(2)}%`))
        var source = await remove(temp_path, 'dir');
        var result = await Image.create(source);

        return res.json({ result: 'ok', msg: 'upload success', data: result });    
      })();
    } catch (e) {
      console.log(e);
    }
  });
};


exports.query = (req,res) => {
  var pageSize = parseInt(req.query.pageSize); 
  var pageNumber = parseInt(req.query.pageNumber);
  
  try {
    (async function () {
      var data = await Image.findByPage({pageNumber: pageNumber, pageSize: pageSize});

      return res.json({ 
        result: 'ok', 
        data: {
          result: data.result,
          currentPage: pageNumber,
          totalPage: Math.ceil(data.total/pageSize)
        }
      });

    })();
  } catch (e) {
    console.log(e);
  }
};

exports.remove = (req, res) => {
  var list = req.body.list.split(',');
  var pageSize = req.body.pageSize;

  try {
    (async function () {

      var images_path = './app/public/uploads/images';
      var result = await Image.remove(list);
      var images = await iter(images_path);

      var data = await Promise.all(
        result.map((v) => {
          if(images.indexOf(v) !== -1) {
            return remove(path.join(images_path, v), 'file');
          }
        })
      );

      var data = await Image.findByPage({pageNumber: 1, pageSize: pageSize});

      return res.json({ 
        result: 'ok', 
        data: {
          result: data.result,
          currentPage: 1,
          totalPage: Math.ceil(data.total/pageSize)
        }
      });

    })();
  } catch (e) {
    console.log(e);
  }
}

