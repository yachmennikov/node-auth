const passport = require('passport');
const User = require('./UserModel');

exports.login = function(req, res, next) {
  passport.authenticate('local',
    function(err, user, info) {
      return err 
        ? next(err)
        : user
          ? req.logIn(user, function(err) {
              return err
                ? next(err)
                : res.send('success');
            })
          : res.send('failia');
    }
  )(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  res.send('success');
};

exports.register = function(req, res, next) {
 const user = new User({ username: req.body.email, password: req.body.password});
  user.save(function(err) {
    return err
      ? next(err)
      : req.logIn(user, function(err) {
        return err
          ? next(err)
          : res.redirect('/private');
      });
  });
};

exports.mustAuthenticatedMw = function (req, res, next){
  req.isAuthenticated()
    ? next()
    : res.redirect('/');
};

