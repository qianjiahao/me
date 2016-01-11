var ajax = require('ajax');

exports.create = (blog) => {
  return new Promise((resolve) => {
    ajax.post('/create', {
      title: blog.title, 
      tags: blog.tags, 
      publish: blog.publish, 
      content: blog.content
    }, (res) => {
      resolve(res);
    });
  });
};