var express = require('express');
var router = express.Router();

var { authCode, login, logout, checkLoginStatus } = require('./login.js');
var { query, upload, remove } = require('./image.js');
var { save, publish, queryAll } = require('./blog.js');

router.get('/image/query', query);
router.post('/image/upload', upload);
router.post('/image/remove', remove);

router.get('/authCode', authCode);
router.post('/login', login);
router.post('/logout', logout);
router.post('/checkLoginStatus', checkLoginStatus);

router.post('/blog/save', save);
router.post('/blog/publish', publish);
router.post('/blog/queryAll', queryAll);

module.exports = router;
