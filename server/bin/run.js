require('babel-core/register');
require('babel-polyfill');

var server = require('./www');
var db = require('../db/db_config.js');

server.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`server listening on http://${host}:${port}`);
});

db.connection.on('error', err => console.error(err));
db.connection.on('open', () => console.log(`mongodb connect success`));