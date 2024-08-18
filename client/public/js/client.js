var url_origin = window.location.origin;
var _id = "admin"; //localStorage.getItem("token");
var _config_articles = {
  url: "/",
  method: "POST",
  data: {
    type: "articles",
    id: _id
  }
}
var _config_custom_ads = {
  url: "/",
  method: "POST",
  data: {
    type: "custom_ads",
    id: _id
  }
}
var _config_events = {
  url: "/",
  method: "POST",
  data: {
    type: "events",
    id: _id
  }
}
var _config_satus = {
  url: "/status",
  method: "POST",
  data: {
    type: "events",
    id: _id
  }
}

function makeRequest(obj) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(obj.method, obj.url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(obj.data));
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(`${xhr.responseText}/${xhr.status}`);
        }
      }
    }
  });
}
function getArticles(callback) {
  var _list = [];
  makeRequest(_config_articles).then((data)=> {
    var res = JSON.parse(data);
    _list = res.data;
    for (let i = 0; i < _list.length; i++) {
      callback(res.type_user, _list[i].id, _list[i].title, _list[i].content)
    }
  }).catch((e)=> {
    console.log(e)
    callback(null, "0", "Error", e);
  })
}
function getStatus(callback) {
  makeRequest(_config_satus).then(function(data) {
    callback(JSON.parse(data).type_user);
  }).catch(function(e) {
    callback(e)
  })
}
function getCustomAds(callback) {
  makeRequest(_config_custom_ads).then(function(data) {
    callback(data);
  }).catch(function(e) {
    callback(null);
  })
}
function getEvents(callback) {
  var _list = [];
  makeRequest(_config_events).then(function(data) {
    var res = JSON.parse(data);
    _list = res.data;
    for (let i = 0; i < _list.length; i++) {
      callback(res.type_user, _list[i].id, _list[i].user, _list[i].date, _list[i].image, _list[i].details);
    }
  }).catch(function(e) {
    console.log(e)
    callback(null, null, "Error", null, null, e);
  })
}