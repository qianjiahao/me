var { msg, Store } = require('iflux');
var Immutable = require('immutable');
var ajax = require('ajax');

var store = module.exports = Store({
  msg: '',
  username: 'qjh',
  password: 'me',
  authCode: '',
});

msg.on('login', () => {
  var user = {
    username: store.data().get('username'),
    password: store.data().get('password'),
    authCode: store.data().get('authCode')
  };

  ajax({ 
    url: '/login', 
    type: 'post', 
    data: user
  }).then(res => {
    if(res.result === 'ok') {
      window.location.hash = '#/index';
      msg.emit('checkLoginStatus');
    }
    store.cursor().set('msg', res.msg);
  }).catch(err => console.log(err));
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
