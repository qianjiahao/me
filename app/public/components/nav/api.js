var ajax = require('ajax');

exports.checkLoginStatus = () => {
  return new Promise((resolve, reject) => {
    ajax.post('/checkLoginStatus', {}, (res) => {
      resolve(res);
    })
  })
}

exports.logout = () => {
  return new Promise((resolve, reject) => {
    ajax.post('/logout', {}, (res) => {
      resolve(res);
    })
  })
}