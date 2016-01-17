var User = require('../db/User.js');
var bcrypt = require('bcrypt');
var ccap = require('ccap');

exports.authCode = (req, res) => {
  if(req.url == '/favicon.ico') return res.end('');

  var any = ccap().get();
  var text = any[0];
  var butter = any[1];

  console.log(text);

  req.session.authCode = text;
  res.end(butter);
}

exports.login = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var authCode = req.body.authCode ? req.body.authCode.toLowerCase() : '';
  var code = req.session.authCode ? req.session.authCode.toLowerCase() : '';

  User.findOne({ username: username }, (err, user) => {
    if(err) return res.json({ result: 'error', msg: '用户名或密码错误' });
    if(!user) return res.json({ result: 'error', msg: '用户名或密码错误' });

    bcrypt.compare(password, user.bcrypt_password, (err, bool) => {
      if(err) return res.json({ result: 'error', msg: '用户名或密码错误' });
      if(!bool) return res.json({ result: 'error', msg: '用户名或密码错误' });
      if(bool) {
        if(code !== authCode) return res.json({ result: 'error', msg: '验证码不正确' });
        
        if(code === authCode) {
          req.session.username = user.username;
          
          var hour = 3600000;
          req.session.cookie.expires = new Date(Date.now() + hour)
          req.session.cookie.maxAge = hour
          
          console.log(req.session);
          return res.json({ result: 'ok', msg: '登录成功' });
        }
      }
    });
  });
};

exports.logout = (req, res) => {
  req.session.username = null;

  console.log(req.session)
  if(req.session.username) return res.json({ result: 'error', msg: '退出失败' });
  if(!req.session.username) return res.json({ result: 'ok', msg: '退出成功' });
};

exports.checkLoginStatus = (req, res) => {
  console.log(req.session);
  if(!req.session.username) return res.json({ result: 'error', msg: '用户未登录' });
  return res.json({ result: 'ok', msg: '欢迎归来', data: req.session });
}