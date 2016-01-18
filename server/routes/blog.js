var Blog = require('../db/Blog.js');

exports.save = (req, res) => {

  var uuid = req.body.uuid;

  var blog = {
    title: req.body.title,
    tags: req.body.tags ? req.body.tags.split('|') : [],
    content: req.body.content,
    modify_date: new Date(),
    publish: 0
  }

  try {

    (async function () {

      if(blog.uuid) {

        blog.uuid = uuid;
        var result = await Blog.save(blog);
      } else {

        blog.create_date = new Date();
        var result = await Blog.create(blog);
      }

      console.log(result);

      return res.json({ result: 'ok', data: result });
    })();

  } catch (e) {
    console.log(e);
    return res.json({ result: 'error', msg: e });
  }
}

exports.publish = (req, res) => {
  console.log(req.body);

  var uuid = req.body.uuid;

  var blog = {
    title: req.body.title,
    tags: req.body.tags ? req.body.tags.split('|') : [],
    content: req.body.content,
    modify_date: new Date(),
    publish: 1
  }

  try {

    (async function () {

      if(blog.uuid) {

        blog.uuid = uuid;
        var result = await Blog.save(blog);

      } else {

        blog.create_date = new Date();
        var result = await Blog.create(blog);
      }

      console.log(result);

      res.json({ result: 'ok', data: result });
    })();

  } catch (e) {
    console.log(e);
    res.json({ result: 'error', msg: e });
  }
}


exports.queryAll = (req, res) => {
  try {

    (async function () {

      var result = await Blog.findAll();

      console.log(result);

      res.json({ result: 'ok', data: result });
      
    })();
  } catch (e) {
    console.log(e);

    res.json({ result: 'error', msg: e });
  }
}
