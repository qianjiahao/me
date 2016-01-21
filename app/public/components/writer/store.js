var { msg, Store } = require('iflux');
var ajax = require('ajax');
var markdown = require('markdown').markdown;

var store = module.exports = Store({
  uuid: '',
  title: '',
  tags: '',
  content: '',

  tab: 0,
});

msg.on('clear', () => {
  store.cursor().withMutations(cursor => {
    cursor.set('title', '');
    cursor.set('tags', '');
    cursor.set('content', '');
  });
});

msg.on('change_uuid', value => {
  store.cursor().set('uuid', value);
});

msg.on('change_title', value => {
  store.cursor().set('title', value);
});

msg.on('change_tags', value => {
  store.cursor().set('tags', value);
});

msg.on('change_content', value => {
  store.cursor().set('content', value);
});

msg.on('toggle_tab', value => {
  store.cursor().set('tab', value);
});

msg.on('select_image_finish', data => {
  var value = store.data().get('content');

  data.map((v) => {
    value += `\n\n![](uploads/images/${v})\n\n`;
  });

  store.cursor().set('content', value);
});

msg.on('save', () => {
  var data = {
    uuid: store.data().get('uuid'),
    title: store.data().get('title'),
    tags: store.data().get('tags'),
    content: store.data().get('content'),
    publish: 0 
  }

  ajax({
    url: '/blog/save',
    type: 'post',
    data: data
  }).then(res => {
    if(res.result === 'ok') {
      msg.emit('clear');
      window.location.hash = '#/console/dashboard';
    } else {
      console.log(res.msg);
    }
  }).catch(err => console.log(err))
});

msg.on('publish', () => {
  var data = {
    uuid: store.data().get('uuid'),
    title: store.data().get('title'),
    tags: store.data().get('tags'),
    content: store.data().get('content'),
    publish: 1
  }

  ajax({
    url: '/blog/publish',
    type: 'post',
    data: data
  }).then(res => {
    if(res.result === 'ok') {
      msg.emit('clear');
      window.location.hash = '#/console/dashboard';
    } else {
      console.log(res.msg);
    }
  }).catch(err => console.log(err))
});