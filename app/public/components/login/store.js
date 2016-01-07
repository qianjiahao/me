var { msg, Store } = require('iflux');
var api = require('./api.js');
var Immutable = require('immutable');

var store = module.exports = Store({
  authCode: Immutable.Map(),
  msg: 'msg'
});
