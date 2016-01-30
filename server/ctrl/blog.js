var Blog = require('../db/Blog.js');
var checkLogin = require('./check.js');
var uuid = require('uuid');
var assign = require('../util/Object.assign.js');

exports.blog_post = (req, res) => {
  try {
    (async function () {
      checkLogin(req, res);
      var id = req.body.uuid || '';
      var blog = {
        title: req.body.title,
        h_content: req.body.h_content,
        m_content: req.body.m_content,
        modify_date: req.body.modify_date,
        create_date: req.body.create_date,
        publish: req.body.publish,
      }

      // 旧文章
      if(id) {
        blog.uuid = id;
        var model = await Blog.findOne({ uuid: id });

        model.title = blog.title;
        model.h_content = blog.h_content;
        model.m_content = blog.m_content;
        model.modify_date = blog.modify_date;
        model.publish = blog.publish;
        
        var data = await Blog.save(model);
      // 新文章
      } else {
        blog.uuid = uuid.v1();
        blog.create_date = new Date();
        console.log(blog);
        // 是否发布
        var data = await Blog.create(blog);
        console.log(data);
      }

      return res.json({ result: 'ok', data: data });
    })();
  } catch (e) {
    console.log(e);
    return res.json({ result: 'error', err: e });
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
    res.json({ result: 'error', err: e });
  }
}

exports.blog_findOne = (req, res) => {
  try {
    (async function () {

      var params = req.body;
      var data = await Blog.findOne(params);

      res.json({ result: 'ok', data: data });
    })();
  } catch (e) {
    console.log(e);
    return res.json({ result: 'error', err: e });
  }
}

exports.blog_remove = (req, res) => {
  try {
    checkLogin(req, res);
    (async function () {
      var params = req.body;
      console.log(params);
      await Blog.remove(params);

      res.json({ result: 'ok', data: {} });
    })();
  } catch (e) {
    console.log(e);
    return res.json({ result: 'error', err: e }); 
  }
}