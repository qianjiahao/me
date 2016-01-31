var { msg, Store } = require('iflux');
var Immutable = require('immutable');

var store = module.exports = Store({
  images: Immutable.fromJS([
    'images/bg2.jpg',
    'images/bg3.jpg',
    'images/latte.jpg'
  ]),
  index: 0,
  time: 5000
});

var timer ;

msg.on('cover:start', (index) => {
  var len = store.data().get('images').size;

  store.cursor().set('index', index);
 
  clearInterval(timer);

  timer = setInterval(() => {
    store.cursor().set('index', (store.data().get('index') + 1) % len);
  }, store.data().get('time'));
});

msg.on('cover:clear', () => {
  clearInterval(timer);
});

