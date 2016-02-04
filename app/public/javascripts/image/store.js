var { msg, Store } = require('iflux');
var Immutable = require('immutable');
var ajax = require('ajax');

var store = module.exports = Store({
  id: '',

  active: false,
  tab: 0,   // 0 显示图片; 1 上传图片

  currentPage: 1,
  totalPage: 1,

  pageSize: 6,

  images: Immutable.List(),    // images data
  selected: Immutable.List(),      // selected data
});

msg.on('image:token', token);
msg.on('image:active', active);
msg.on('image:tab', tab);
msg.on('image:query', query);
msg.on('image:remove', remove);
msg.on('image:select', select);
msg.on('image:page', page);
msg.on('image:clear', clear);

/*
  标示调用者，返回传入的id
 */
function token (value) {
  store.cursor().set('id', value);
}

function active (value, id) {
  store.cursor().set('active', value);
  if(id) {
    token(id);
  }
  if(!value) {
    clear()
  }
}

function tab (value) {
  store.cursor().set('tab', value);

  if(value === 0) {
    query(store.data().get('pageSize'), store.data().get('currentPage'))
  }
}

function select (value) {
  store.cursor().update('selected', selected => {
    var index = selected.indexOf(value);

    if(index !== -1) {
      return selected.filter(v => v !== value);
    } else {
      return selected.push(value);
    }
  });
}

function page (value) {
  var currentPage = store.data().get('currentPage');
  var totalPage = store.data().get('totalPage');

  if(0 < value && value <= totalPage) {
    query(store.data().get('pageSize'), value);
  }
}

function query (pageSize, pageNumber) {
  ajax({
    url: `/image/query?pageSize=${pageSize}&pageNumber=${pageNumber}`,
    type: 'get'
  }).then(res => {
    if(res.result === 'ok') {
      store.cursor().withMutations(cursor => {
        cursor.set('images', Immutable.fromJS(res.data.result));
        cursor.set('currentPage', res.data.currentPage);
        cursor.set('totalPage', res.data.totalPage);
      });
    }
  }).catch(err => console.log(err));
}

function remove () {
  if(!store.data().get('selected').size) return ;
 
  ajax({
    url: '/image/remove',
    type: 'post',
    data: { list: store.data().get('selected').toJS(), pageSize: store.data().get('pageSize') }
  }).then(res => {
    if(res.result === 'ok') {
      store.cursor().withMutations(cursor => {
        cursor.set('images', Immutable.fromJS(res.data.result));
        cursor.set('currentPage', res.data.currentPage);
        cursor.set('totalPage', res.data.totalPage);
        cursor.update('selected', selected => selected.clear());
      });
    }

  }).catch(err => console.log(err));
}

function clear () {
  store.cursor().set('selected', Immutable.List());
}
