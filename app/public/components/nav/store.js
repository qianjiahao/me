var { msg, Store } = require('iflux');
var api = require('./api.js');

var store = module.exports = Store({
  isLogin: false
});

/**
 * 判断服务器端session的状态
 */
msg.on('checkLoginStatus', () => {
  api.checkLoginStatus().then(res => {
    if(res.result === 'error') {
      store.cursor().set('isLogin', false);
    }
    if(res.result === 'ok') {
      var now = Date.now();
      var expires = res.data.cookie.expires;

      if(expires && now <= new Date(expires).valueOf()) {
        store.cursor().set('isLogin', true);
      }else {
        store.cursor().set('isLogin', false);
      }
    }
  });
});

msg.on('logout', () => {
  api.logout().then(res => {
    if(res.result === 'error') {
      console.log(res.msg); 
    }
    if(res.result === 'ok') {
      store.cursor().set('isLogin', false);
    }
  })
})