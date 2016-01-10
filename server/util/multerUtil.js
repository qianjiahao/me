var multer = require('multer');

var upload = multer({
  dest: './app/public/uploads',
}).single('file');

module.exports = upload;