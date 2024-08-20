
const { CLIENT } = require('../../config');
const express = require('express');
const session = require('express-session');
const passport = require('./passport');
const morgan = require('morgan');
const app = express();

app.use(express.json()); 
app.use(express.static(CLIENT + '/public'));
app.use(express.static(CLIENT + '/assets'));
app.use(morgan('dev'));

// passport config
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

 
app.use(require('../routes/auth'));

module.exports = app;
