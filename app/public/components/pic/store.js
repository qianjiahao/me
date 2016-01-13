var { msg, Store } = require('iflux');
var api = require('./api.js');
var Immutable = require('immutable');

var store = module.exports = Store({
  toggle_panel: false,
  tab: 0,
  list: Immutable.List(),
  currentPage: 1,
  totalPage: 1
});

msg.on('toggle_panel', value => {
  store.cursor().set('toggle_panel', value);
});

msg.on('toggle_tab', value => {
  store.cursor().set('tab', value);
  if(value == 1) {
    msg.emit('query_uploads', 20, 1);
  }
});

msg.on('query_uploads', (pageSize, pageNumber) => {
  api.query_uploads(pageSize, pageNumber).then(res => {
    if(res.result === 'ok') {
      store.cursor().withMutations(cursor => {
        cursor.set('list', Immutable.fromJS(res.data.list));
        cursor.set('currentPage', res.data.currentPage);
        cursor.set('totalPage', res.data.totalPage);
      });
    }
  });
});

msg.on('choose_picture', () => {

});