exports.checkLogin = (req, res, next) => {
  if(req.session.username) {
    next();
  } else {
    res.render('404');
  }
}
