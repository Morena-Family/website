
const {ARTICLES, CUSTOM_ADS, EVENTS, CLIENT} = require('../config.js');
const express = require('express');
const fs = require('fs');
const app = express();

const getFile = (_path) => {
  return JSON.parse(fs.readFileSync(_path, 'utf-8'))
};
app.use(express.static(CLIENT + '/public'));
app.use(express.static(CLIENT + '/assets'));

// @TODO
app.post('/', (req, res) => {
  bodyParse(req, (data) => {
    switch (data.type) {
      case 'articles':
        res.json({
          type_user: typeUser(data.id), data: getFile(ARTICLES)
        });
        break;
      case 'custom_ads':
        res.json({
          type_user: typeUser(data.id), data: getFile(CUSTOM_ADS)
        });
        break;
      case 'events':
        res.json({
          type_user: typeUser(data.id), data: getFile(EVENTS)
        });
        break;
    }
  });
});
app.post('/status', (req, res) => {
  bodyParse(req, (data) => {
    res.json({
      type_user: typeUser(data.id)
    });
  });
});


function typeUser(id) {
  return id == 'admin' ? 'admin' : id == 'user' ? 'user' : 'observer';
}
function bodyParse(req, callback) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    callback(JSON.parse(body));
  });
}

module.exports = app;
