var { msg, Store } = require('iflux');
var Immutable = require('immutable');
var ajax = require('ajax');

var store = module.exports = Store({
  toggle_panel: false,
  tab: 0,
  list: Immutable.List(),
  currentPage: 1,
  totalPage: 1,
  pageSize: 20
});

msg.on('toggle_panel', value => {
  store.cursor().set('toggle_panel', value);
});

msg.on('toggle_tab', value => {
  store.cursor().set('tab', value);
  if(value == 1) {
    msg.emit('query_images', store.data().get('pageSize'), store.data().get('currentPage'));
  }
});

msg.on('toggle_page', value => {
  var totalPage = store.data().get('totalPage');
  var pageSize = store.data().get('pageSize');

  if(value <= totalPage && value >= 1) {
    msg.emit('query_images', pageSize, value);
  }
});

msg.on('query_images', (pageSize, pageNumber) => {
  ajax({
    url: `/upload/images?pageSize=${pageSize}&pageNumber=${pageNumber}`,
    type: 'get'
  }).then(res => {
    if(res.result === 'ok') {
      store.cursor().withMutations(cursor => {
        cursor.set('list', Immutable.fromJS(res.data.list));
        cursor.set('currentPage', res.data.currentPage);
        cursor.set('totalPage', res.data.totalPage);
      });
    }
  }).catch(err => {
    console.log(err);
  });
});
