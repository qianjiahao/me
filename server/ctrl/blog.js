var Blog = require('../db/Blog.js');
var checkLogin = require('./check.js');

exports.blog_post = (req, res) => {
  try {
    (async function () {

      checkLogin(req, res);
      var uuid = req.body.uuid || '';
      var blog = {
        title: req.body.title,
        h_content: req.body.h_content,
        m_content: req.body.m_content,
        modify_date: req.body.modify_date,
        publish: req.body.publish
      }

      if(uuid) {
        blog.uuid = uuid;
        var data = await Blog.save(blog);
      } else {
        blog.create_date = new Date();
        var data = await Blog.create(blog);
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
