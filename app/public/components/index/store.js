var { msg , Store } = require('iflux');
var Immutable = require('immutable');
var ajax = require('ajax');

var store = module.exports = Store({
  data: Immutable.List()
});

msg.on('index:init', () => {

  ajax({
    url: '/blog/query',
    type: 'post',
    data: { publish: 1 }
  }).then(res => {
    console.log(res);
    if(res.result === 'ok') {
      store.cursor().set('data', Immutable.fromJS(res.data));
    }
  }).catch(err => console.log(err))
})