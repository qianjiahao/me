var { msg, Store } = require('iflux');
var ajax = require('ajax');

var store = module.exports = Store({
  title: '',
  tags: '',
  content: '',

  tab: 0
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
    value += `![](uploads/images/${v})`;
  });

  store.cursor().set('content', value);
});

msg.on('save', () => {
  
});

msg.on('publish', () => {

});