var ccap = require('ccap');

module.exports = (req, res) => {
  if(req.url == '/favicon.ico') return res.end('');

  var any = ccap().get();
  var text = any[0];
  var butter = any[1];

  console.log(text);

  req.session.authCode = text;
  console.log(req.session);
  res.end(butter);
}