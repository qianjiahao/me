var ajax = require('ajax');


exports.login = (username, password) => {
  return new Promise((resolve) => {
    ajax.post('/login', { username: username, password: password }, (res) => {
      resolve(res);
    });
  });
}