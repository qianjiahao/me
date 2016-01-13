var formidable = require('formidable');
var fs = require('fs');
var uploads_path = './app/public/uploads';

exports.uploads_single = (req, res) => {
  var form = new formidable.IncomingForm();

  form.encoding = 'utf-8';
  form.uploadDir = './app/public/uploads';
  form.keepExtensions = true;
  form.hash = 'md5';

  form.on('progress', (size, total) => {
    console.log(`receive ${(size/total*100).toFixed(2)}%`);
  });

  form.on('end', () => {
    return res.json({ result: 'ok', msg: 'upload success' });
  });

  form.on('error', (err) => {
    return res.json({ result: 'error', err: err });
  });

  form.on('aborted', () => {
    return res.json({ result: 'aborted', msg: 'upload request aborted' });
  });

  form.parse(req, (err, fields, files) => {
    if(err) return res.json({ result: 'error', err: err });
  });
};

exports.query_uploads = (req, res) => {

  var pageSize = req.body.pageSize ? parseInt(req.body.pageSize) : 20;
  var pageNumber = req.body.pageNumber ? parseInt(req.body.pageNumber) : 1;

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
}