var ajax = require('ajax');


exports.login = (username, password, authCode) => {
  return new Promise((resolve) => {
    ajax.post('/login', { username: username, password: password, authCode: authCode }, (res) => {
      resolve(res);
    });
  });
}