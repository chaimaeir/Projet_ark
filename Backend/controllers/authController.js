const passport = require('passport');

const login = passport.authenticate('oauth2');

const callback = passport.authenticate('oauth2', {
  successRedirect: '/', 
  failureRedirect: '/auth/login' 
});

const logout = (req, res) => {
  req.logout(() => {
    res.status(200).send('Logged out');
  });
};

module.exports={login,callback,logout}