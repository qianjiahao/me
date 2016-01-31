var { msg, Store } = require('iflux');
var ajax = require('ajax');
var Immutable = require('immutable');

var store = module.exports = Store({
  result: Immutable.List()
});

msg.on('dashboard:init', () => {

  ajax({
    url: '/blog/query',
    type: 'post',
    data: {}
  }).then(res => {
    if(res.result === 'ok') {
      store.cursor().set('result', Immutable.fromJS(res.data));
    }
  }).catch(err => {
    console.log(err);
  })
});