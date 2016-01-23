module.exports = (req, res, next) => {
  if(!req.session.username || req.session.cookie.expires < new Date()) {
    res.render('404');
  }
}