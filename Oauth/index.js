const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express();
app.use(session({ secret: 'ranjan' }));
app.use(passport.initialize());
app.use(passport.session());
require('./auth');
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
app.get('/', (req, res) => {
  res.send(`<a href="/auth/google">Authenticate with Google</a>`);
});
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
app.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  })
);
app.use('/auth/failure', (req, res) => {
  res.send('something went wrong');
});
app.use('/protected', isLoggedIn, (req, res) => {
  res.redirect('/dashboard');
  res.send(`hello ${req.user.language}`);
});
app.get('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect('/');
});

app.listen(5000, () => console.log('server is listening on 5000'));
