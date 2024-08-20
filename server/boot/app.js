
const {CLIENT} = require('../../config');
const express = require('express');
const app = express();

app.use(express.json()); 
app.use(express.static(CLIENT + '/public'));
app.use(express.static(CLIENT + '/assets'));
app.use(require('../routes/auth'));

module.exports = app;
