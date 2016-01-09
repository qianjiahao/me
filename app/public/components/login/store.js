var { msg, Store } = require('iflux');
var api = require('./api.js');
var Immutable = require('immutable');

var store = module.exports = Store({
  msg: '',
  username: '',
  password: '',
  authCode: '',
});

msg.on('login', () => {
  var user = {
    username: store.data().get('username'),
    password: store.data().get('password'),
    authCode: store.data().get('authCode')
  };

  api.login(user.username, user.password, user.authCode).then(res => {
    store.cursor().set('msg', res.msg);

    if(res.result == 'ok') {
      window.location.href = '/';
    }
  });
});

msg.on('changeUsername', username => {
  store.cursor().set('username', username);
});

msg.on('changePassword', password => {
  store.cursor().set('password', password);
});

msg.on('changeAuthCode', authCode => {
  store.cursor().set('authCode', authCode);
});
