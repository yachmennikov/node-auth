const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const controllers = require('./controllers');

const app = express();

mongoose.connect('mongodb://localhost:27017/zalupa3', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: 'SECRET',  
  resave: false,
  saveUninitialized: true
}));
 
// Passport:
app.use(passport.initialize());
app.use(passport.session());
require('./passport');

// Auth system
app.post('/login', controllers.login);
app.post('/register', controllers.register);
app.get('/logout', controllers.logout);

app.listen(4004, () => console.log('ok'))