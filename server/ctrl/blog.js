var Blog = require('../db/Blog.js');
var checkLogin = require('./check.js');

exports.blog_save = (req, res) => {
  checkLogin(req, res);
  var uuid = req.body.uuid;

  var blog = {
    title: req.body.title,
    tags: req.body.tags ? req.body.tags.split('|') : [],
    h_content: req.body.h_content,
    m_content: req.body.m_content,
    cover: req.body.cover,
    publish: 0
  }

  try {
    (async function () {

      if(uuid) {
        blog.uuid = uuid;
        blog.modify_date = new Date();
        var data = await Blog.save(blog);
      } else {
        blog.create_date = new Date();
        var data = await Blog.create(blog);
      }

      return res.json({ result: 'ok', data: data });
    })();
  } catch (e) {
    console.log(e);
    
    return res.json({ result: 'error', msg: e });
  }
}

exports.blog_publish = (req, res) => {
  checkLogin(req, res);

  var uuid = req.body.uuid;

  var blog = {
    title: req.body.title,
    tags: req.body.tags ? req.body.tags.split('|') : [],
    h_content: req.body.h_content,
    m_content: req.body.m_content,
    cover: req.body.cover,
    publish: 1
  }

  try {
    (async function () {

      if(uuid) {
        blog.uuid = uuid;
        blog.modify_date = new Date();
        var data = await Blog.save(blog);
      } else {
        blog.create_date = new Date();
        var data = await Blog.create(blog);
      }

      res.json({ result: 'ok', data: data });
    })();
  } catch (e) {
    console.log(e);

    res.json({ result: 'error', msg: e });
  }
}

exports.blog_query = (req, res) => {
  try {
    (async function () {

      var params = req.body;
      var data = await Blog.find(params);

      res.json({ result: 'ok', data: data });

    })();
  } catch (e) {
    console.log(e);

    res.json({ result: 'error', msg: e });
  }
}
