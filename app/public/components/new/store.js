var { msg, Store } = require('iflux');
var ajax = require('ajax');

var store = module.exports = Store({
  title: '',
  tags: '',
  publish: 0,
  content: '',
  tab: 0,
});

msg.on('changeTitle', value => {
  store.cursor().set('title', value);
});

msg.on('changeTags', value => {
  store.cursor().set('tags', value);
});

msg.on('changePublish', value => {
  store.cursor().set('publish', value);
});

msg.on('changeContent', value => {
  store.cursor().set('content', value);
});

msg.on('tab', value => {
  store.cursor().set('tab', value);
});

msg.on('clear', () => {
  store.cursor().withMutations(cursor => {
    cursor.set('title', '');
    cursor.set('tags', '');
    cursor.set('content', '');
    cursor.set('publish', 0);
  });
});

msg.on('insert_images', (data) => {
  
})

msg.on('save', () => {
  var blog = {
    title: store.data().get('title'),
    tags: store.data().get('tags'),
    content: store.data().get('content'),
    publish: 0
  }

});

msg.on('publish', () => {

})





