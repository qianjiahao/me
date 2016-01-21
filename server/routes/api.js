var express = require('express');
var router = express.Router();

var { authCode, login, logout, checkLoginStatus } = require('../ctrl/login.js');
var { query, upload, remove } = require('../ctrl/image.js');
var { save, publish, queryAll } = require('../ctrl/blog.js');
var { checkLogin } = require('./check.js');

/**
 * 无需验证登录状态
 */
router.get('/authCode', authCode);
router.post('/login', login);
router.post('/logout', logout);
router.post('/checkLoginStatus', checkLoginStatus);

/**
 * 需要验证登录状态
 */
router.get('/image/query', checkLogin);
router.get('/image/query', query);

router.post('/image/upload', checkLogin);
router.post('/image/upload', upload);

router.post('/image/remove', checkLogin);
router.post('/image/remove', remove);


router.post('/blog/save', checkLogin);
router.post('/blog/save', save);

router.post('/blog/publish', checkLogin);
router.post('/blog/publish', publish);

router.post('/blog/queryAll', checkLogin);
router.post('/blog/queryAll', queryAll);

module.exports = router;
