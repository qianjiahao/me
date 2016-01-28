var { msg, Store } = require('iflux');
var ajax = require('ajax');
var Immutable = require('immutable');

var store = module.exports = Store({
  doc: Immutable.Map()
});

msg.on('doc:init', id => {
  ajax({
    url: '/blog/findOne',
    type: 'post',
    data: { uuid: id }
  }).then(res => {
    if(res.result === 'ok') {
      store.cursor().set('doc', Immutable.fromJS(res.data));
    }
  }).catch(err => console.log(err));
})

