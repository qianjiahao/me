var { msg, Store } = require('iflux');
var ajax = require('ajax');
var markdown = require('markdown').markdown;
var Immutable = require('immutable');

var store = module.exports = Store({
  uuid: '',
  title: '',
  tags: '',
  cover: '',
  h_content: '',
  m_content: '',

  tab: 0,
});

var model = {
  uuid: store.data().get('uuid'),
  title: store.data().get('title'),
  tags: store.data().get('tags'),
  cover: store.data().get('cover'),
  m_content: store.data().get('m_content'),
  h_content: store.data().get('h_content'),
}

msg.on('clear', () => {
  store.cursor().withMutations(cursor => {
    cursor.set('title', '');
    cursor.set('tags', '');
    cursor.set('cover', '');
    cursor.set('h_content', '');
    cursor.set('m_content', '');
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

msg.on('change_cover', value => {

  // 封面 取首个元素
  store.cursor().set('cover', value[0]);
});


msg.on('change_content', value => {
  store.cursor().set('m_content', value);
  store.cursor().set('h_content', markdown.toHTML(value).replace(/img/g, `img width="100%"`).replace(/\<p>/g, `<p style="width: 98%; word-wrap: break-word;margin: 0 auto">`));
});


msg.on('toggle_tab', value => {
  store.cursor().set('tab', value);
});

msg.on('select_image', data => {
  var value = store.data().get('m_content');

  data.map((v) => {
    value += `\n\n![](uploads/images/${v})\n\n`;
  });

  msg.emit('change_content',value);
});

msg.on('save', () => {
  var model = {
    uuid: store.data().get('uuid'),
    title: store.data().get('title'),
    tags: store.data().get('tags'),
    cover: store.data().get('cover'),
    m_content: store.data().get('m_content'),
    h_content: store.data().get('h_content'),
    publish: 0
  }

  ajax({
    url: '/blog/save',
    type: 'post',
    data: model
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
  var model = {
    uuid: store.data().get('uuid'),
    title: store.data().get('title'),
    tags: store.data().get('tags'),
    cover: store.data().get('cover'),
    m_content: store.data().get('m_content'),
    h_content: store.data().get('h_content'),
    publish: 1
  }

  ajax({
    url: '/blog/publish',
    type: 'post',
    data: model
  }).then(res => {
    if(res.result === 'ok') {
      msg.emit('clear');
      window.location.hash = '#/console/dashboard';
    } else {
      console.log(res.msg);
    }
  }).catch(err => console.log(err))
});