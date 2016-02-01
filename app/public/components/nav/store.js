var { msg, Store } = require('iflux');
var ajax = require('ajax');

var store = module.exports = Store({
  isLogin: false
});

/**
 * 判断服务器端session的状态
 */
msg.on('checkLoginStatus', () => {
  ajax({
    url: '/checkLoginStatus',
    type: 'post'
  }).then(res => {
    if(res.result === 'ok') {
      var now = Date.now();
      var expires = res.data.cookie.expires;

      if(expires && now <= new Date(expires).valueOf()) {
        store.cursor().set('isLogin', true);
      } else {
        store.cursor().set('isLogin', false);
        window.location.hash = '#/';
      }

    } else {
      store.cursor().set('isLogin', false);
      window.location.hash = '#/';
    }
  }).catch(err => console.log(err));
});

msg.on('logout', () => {
  ajax({
    url: '/logout',
    type: 'post',
  }).then(res => {
    if(res.result === 'ok') {
      store.cursor().set('isLogin', false);
      window.location.hash = '#/';
    } else {
      console.log(res.msg);
    }
  }).catch(err => console.log(err));
});