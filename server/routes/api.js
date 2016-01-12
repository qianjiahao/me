var express = require('express');
var router = express.Router();
var User = require('../db/User.js');
var Blog = require('../db/Blog.js');
var bcrypt = require('bcrypt');
var { uploads_single, query_uploads } = require('../util/uploads.js');
var authCode = require('../util/authCode.js');

router.get('/authCode', authCode);

router.post('/uploads', uploads_single);

router.post('/query_uploads', query_uploads);

router.post('/login', (req, res) => {
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
});

router.post('/logout', (req, res) => {
  req.session.username = null;

  console.log(req.session)
  if(req.session.username) return res.json({ result: 'error', msg: '退出失败' });
  if(!req.session.username) return res.json({ result: 'ok', msg: '退出成功' });
});

router.post('/checkLoginStatus', (req, res) => {
  console.log(req.session);
  if(!req.session.username) {
    return res.json({ result: 'error', msg: '用户未登录' });
  }

  return res.json({ result: 'ok', msg: '欢迎归来', data: req.session });
});


router.post('/create', (req, res) => {

  var blog = req.body;
  Blog.create(blog, (err, blog) => {
    if(err) {
     console.log(err); 
     return res.json({ result: 'error', msg: err }); 
    }
    
    if(blog) return res.json({ result: 'ok', msg: '创建成功', data: blog });
  });
});

router.post('/findAll', (req, res) => {
  Blog.findAll((err, blogs) => {
    if(err) return res.json({ result: 'error', msg: err });

    if(!blogs) return res.json({ result: 'ok', msg: '查询成功', data: {} })
    if(blogs) return res.json({ result: 'ok', msg: '查询成功', data: blogs });
  })
})
module.exports = router;
