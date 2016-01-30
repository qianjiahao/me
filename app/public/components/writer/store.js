var { msg, Store } = require('iflux');
var ajax = require('ajax');
var markdown = require('markdown').markdown;
var Immutable = require('immutable');

var store = module.exports = Store({
  uuid: '',
  title: '',
  h_content: '',
  m_content: '',
  create_date: '',

  tab: 0,
});
msg.on('writer:init', id => {
  ajax({
    url: '/blog/findOne',
    type: 'post',
    data: { uuid: id }
  }).then(res => {
    if(res.result === 'ok') {
      store.cursor().withMutations(cursor => {
        cursor.set('uuid', res.data.uuid);
        cursor.set('title', res.data.title);
        cursor.set('m_content', res.data.m_content);
        cursor.set('h_content', res.data.h_content);
        cursor.set('create_date', res.data.create_date);
      });
    } else {
      window.location.hash = '#/index';
    }
    console.log(res);
  }).catch(err => console.log(err));
})

msg.on('clear', () => {
  store.cursor().withMutations(cursor => {
    cursor.set('title', '');
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
    m_content: store.data().get('m_content'),
    h_content: store.data().get('h_content'),
    modify_date: new Date(),
    publish: 0
  }

  if(store.data().get('uuid')) {
    model.create_date = store.data().get('create_date');
  }

  ajax({
    url: '/blog/post',
    type: 'post',
    data: model
  }).then(res => {
    if(res.result === 'ok') {
      msg.emit('clear');
      window.location.hash = '#/console/dashboard';
    } else {
      console.log(res.err);
    }
  }).catch(err => console.log(err))
});

msg.on('publish', () => {
  var model = {
    uuid: store.data().get('uuid'),
    title: store.data().get('title'),
    m_content: store.data().get('m_content'),
    h_content: store.data().get('h_content'),
    modify_date: new Date(),
    publish: 1
  }

  if(store.data().get('uuid')) {
    model.create_date = store.data().get('create_date');
  }

  ajax({
    url: '/blog/post',
    type: 'post',
    data: model
  }).then(res => {
    if(res.result === 'ok') {
      msg.emit('clear');
      window.location.hash = '#/';
    } else {
      console.log(res.err);
    }
  }).catch(err => console.log(err))
});