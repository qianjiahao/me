var express = require('express');
var router = express.Router();
var ccap = require('ccap');

var captcha = ccap();

router.get('/authCode', (req, res) => {
  if(req.url == '/favicon.ico') return res.end('');

  var any = captcha.get();
  var text = any[0];
  var butter = any[1];

  console.log(text);
  res.end(butter);
});


module.exports = router;
