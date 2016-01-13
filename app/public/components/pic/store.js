var { msg, Store } = require('iflux');
var api = require('./api.js');
var Immutable = require('immutable');

var store = module.exports = Store({
  toggle_panel: false,
  tab: 0,
  images: Immutable.List()
});

msg.on('toggle_panel', value => {
  store.cursor().set('toggle_panel', value);
});

msg.on('toggle_tab', value => {
  store.cursor().set('tab', value);
  if(value == 1) {
    msg.emit('query_uploads', 10, 1);
  }
});

msg.on('query_uploads', (pageSize, pageNumber) => {
  api.query_uploads(pageSize, pageNumber).then(res => {
    if(res.result === 'ok') {
      store.cursor().set('images', Immutable.fromJS(res.data));
    }
  });
});

msg.on('choose_picture', () => {

});