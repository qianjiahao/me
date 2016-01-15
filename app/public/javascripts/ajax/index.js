var ajax_default = require('./ajax.js');

module.exports = function (settings) {
  return new Promise((resolve, reject) => {
    ajax_default({
      url: settings.url,
      type: settings.type,
      data: settings.data,
      success: function (res) {
        resolve(JSON.parse(res));
      },
      error: function (err) {
        reject(JSON.parse(err));
      }
    });
  });
}