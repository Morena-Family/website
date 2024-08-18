const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;
const PATH_ARTICLES = __dirname + "/articles.json";
const PATH_CUSTOM_ADS = __dirname + "/custom_ads.json";
const PATH_EVENTS = __dirname + "/events.json";
const getFile = (_path) => {
  return JSON.parse(fs.readFileSync(_path, "utf-8"))
};
app.use(express.static('public'));
app.use(express.static('images'));
app.post('/', (req, res)=> {
  bodyParse(req, (data)=> {
    switch (data.type) {
      case "articles":
        res.json({
          type_user: typeUser(data.id), data: getFile(PATH_ARTICLES)
        });
        break;
      case "custom_ads":
        res.json({
          type_user: typeUser(data.id), data: getFile(PATH_CUSTOM_ADS)
        });
        break;
      case "events":
        res.json({
          type_user: typeUser(data.id), data: getFile(PATH_EVENTS)
        });
        break;
    }
  });
});
app.post('/status', (req, res)=> {
  bodyParse(req, (data)=> {
    res.json({
      type_user: typeUser(data.id)});
  });
});
app.listen(PORT, ()=> {console.log(`Servidor iniciado, puerto ${PORT}`);
});
function typeUser(id) {
return id == "admin" ? "admin": id == "user" ? "user": "observer";
}
function bodyParse(req, callback) {
let body = '';
req.on('data', (chunk)=> {
body += chunk.toString();
});
req.on('end', ()=> {
callback(JSON.parse(body));
});
}
