var express = require('express');
var router = express.Router();
var User = require('../db/User.js');
var Blog = require('../db/Blog.js');
var bcrypt = require('bcrypt');
var { authCode, login, logout, checkLoginStatus } = require('./login.js');
var { query, upload, remove } = require('./image.js');


router.get('/image/query', query);
router.post('/image/upload', upload);
router.post('/image/remove', remove);

router.get('/authCode', authCode);
router.post('/login', login);
router.post('/logout', logout);
router.post('/checkLoginStatus', checkLoginStatus);


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
