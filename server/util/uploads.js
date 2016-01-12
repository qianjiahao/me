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

  form.parse(req, (err, fields, files) => {
    if(err) return console.log(err);

    console.log(fields, files);
    return res.json({ fields: fields });
  });
};

exports.query_uploads = (req, res) => {

  var pageSize = req.body.pageSize;
  var pageNumber = req.body.pageNumber;

  fs.readdir(uploads_path, (err, dir) => {
    if(err) return res.json({ result: 'error', msg: err });

    var data = [];
    var len = pageSize * pageNumber < dir.length ? pageNumber * pageSize : dir.length;
    for(let i = (pageNumber-1) * pageSize; i < len; i++) {
      data.push(dir[i]);
    }

    return res.json({ result: 'ok', msg: '查询成功', data: data });
  });
}