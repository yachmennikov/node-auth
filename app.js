const express = require('express');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
require('./config/passportConfig');
const passport = require('passport');
const config = require('./config/config');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

const app = express();

// db connection
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

app.set('view engine', 'ejs');
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [config.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
app.get('/', (req, res) => {
  res.render('home')
})

app.listen(config.port, () => { console.log('server is running on port ' + config.port) });

module.exports = app