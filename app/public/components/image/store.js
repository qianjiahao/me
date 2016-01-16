var { msg, Store } = require('iflux');
var Immutable = require('immutable');
var ajax = require('ajax');

var store = module.exports = Store({
  toggle_panel: false,
  toggle_tab: 0,
  toggle_select: false,

  currentPage: 1,
  totalPage: 1,
  pageSize: 12,

  result: Immutable.List(),
  temp: Immutable.List()    // will be deleted
});

msg.on('toggle_panel', value => {
  store.cursor().set('toggle_panel', value);
});

msg.on('toggle_tab', value => {
  store.cursor().set('toggle_tab', value);
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

msg.on('toggle_select', value => {
  store.cursor().set('toggle_select', !value);
  store.cursor().update('temp', temp => temp.clear());
});

msg.on('select_image', value => {
  if(!store.data().get('toggle_select')) return ;

  store.cursor().update('temp', temp => {
    var index = temp.indexOf(value);

    if(index !== -1) {
      return temp.filter(v => v !== value);
    } else {
      return temp.push(value);
    }
  });
});

msg.on('query_images', (pageSize, pageNumber) => {

  ajax({
    url: `/image/query?pageSize=${pageSize}&pageNumber=${pageNumber}`,
    type: 'get'
  }).then(res => {
    if(res.result === 'ok') {
      store.cursor().withMutations(cursor => {
        cursor.set('result', Immutable.fromJS(res.data.result));
        cursor.set('currentPage', res.data.currentPage);
        cursor.set('totalPage', res.data.totalPage);
      });
    }
  }).catch(err => {
    console.log(err);
  });
});

msg.on('remove_images', () => {
  if(!store.data().get('temp').size) return ;

  ajax({
    url: '/image/remove',
    type: 'post',
    data: { list: store.data().get('temp').toJS(), pageSize: store.data().get('pageSize') }
  }).then(res => {
    if(res.result === 'ok') {
      console.log('ok')
      store.cursor().withMutations(cursor => {
        cursor.set('result', Immutable.fromJS(res.data.result));
        cursor.set('currentPage', res.data.currentPage);
        cursor.set('totalPage', res.data.totalPage);
        cursor.update('temp', temp => temp.clear());
      });
    }

  }).catch(err => {
    console.log(err);
  });
});

