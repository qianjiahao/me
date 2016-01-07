var express = require('express');
var router = express.Router();
var ccap = require('ccap');
var User = require('../db/User.js');
var bcrypt = require('bcrypt');

router.get('/authCode', (req, res) => {
  if(req.url == '/favicon.ico') return res.end('');

  var any = ccap().get();
  var text = any[0];
  var butter = any[1];

  console.log(text);

  req.session.authCode = text;
  res.end(butter);
});

router.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var authCode = req.body.authCode;

  User.findOne({ username: username }, (err, user) => {

    if(err) return res.json({ result: 'error', msg: '用户名或密码错误' });
    if(!user) return res.json({ result: 'error', msg: '用户名或密码错误' });

    bcrypt.compare(password, user.bcrypt_password, (err, bool) => {

      if(err) return res.json({ result: 'error', msg: '用户名或密码错误' });
      if(!bool) return res.json({ result: 'error', msg: '用户名或密码错误' });
      if(bool) {
        if(req.session.authCode !== authCode) return res.json({ result: 'error', msg: '验证码不正确' });

        req.session.username = user.username;
        return res.json({ result: 'ok', msg: '登录成功' });        
      }
    });
  });
});


module.exports = router;
