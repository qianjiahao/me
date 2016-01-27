var express = require('express');
var router = express.Router();

var { authCode, login, logout, checkLoginStatus } = require('../ctrl/login.js');
var { image_query, image_upload, image_remove } = require('../ctrl/image.js');
var { blog_post, blog_queryAll, blog_query } = require('../ctrl/blog.js');

/**
 * 无需验证登录状态
 */
router.get('/authCode', authCode);
router.post('/login', login);
router.post('/logout', logout);
router.post('/checkLoginStatus', checkLoginStatus);

/**
 * 图片路由
 */
router.get('/image/query', image_query);
router.post('/image/upload', image_upload);
router.post('/image/remove', image_remove);

/**
 * 博客路由
 */
router.post('/blog/post', blog_post);
router.post('/blog/query', blog_query);

module.exports = router;
