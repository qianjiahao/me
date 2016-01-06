require('babel-core/register');
require('babel-polyfill');

var server = require('./www');

server.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`server listening on http://${host}:${port}`);
});
