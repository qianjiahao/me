var ajax = require('ajax');

exports.query_uploads = (pageSize, pageNumber) => {
  return new Promise((resolve) => {
    ajax.post('/query_uploads', { pageSize: pageSize, pageNumber: pageNumber }, (res) => {
      resolve(res);
    });
  });
}