function ChatRoom(page) {
  page.className = "room-container"
  // document.body.style.overflow = "hidden";//.className = "room-container"
  var content = document.createElement("div");
  content.className = "container-messages";
  //this.adapter = new Adapter();
  page.appendChild(content);
  this.send = function(text, date = new Date().getTime()) {
    add("chat-message user-message", null, null, text, date, null)
  }
  this.receive = function(img, user, photo, text, date, callback) {
    if (photo != null) {
      addPhoto(photo, text, date);
    } else {
      add("chat-message received-message", img, user, text, date, callback);
    }
  }
  this.sendPhoto = function(_img, _text, _date = new Date().getTime()) {
    addPhoto(_img, _text, _date)
  }
  function addPhoto(_img, _text, _date) {
    var item = document.createElement("div");
    item.className = "chat-message user-message";
    var img = document.createElement("img");
    img.src = _img;
    img.className = "chat-image"
    var text = document.createElement("p");
    text.innerText = _text;
    content.appendChild(img)
    item.appendChild(img);
    if (_text != null) item.appendChild(text);
    var date = document.createElement("p")
    date.style.fontSize = "12px";
    date.style.float = "right";
    date.innerText = new Date(parseInt(_date)).toLocaleTimeString('es-ES', {
      hour: 'numeric', minute: 'numeric', hour12: true
    });
    if (_date != null) item.appendChild(date);
    content.appendChild(item);
  }
  function downScroll() {
    content.scrollTop = content.scrollHeight;
    if (content.scrollTop > document.body.scrollTop) {
      document.body.scrollTop = document.body.scrollHeight;
    }
  }
  function add(type, _img, _user, _text, _date, callback) {
    var item = document.createElement("div");
    item.className = type;
    if (_img != null && _user != null && callback != null) {
      var cont_prof = document.createElement("div");
      cont_prof.style.display = "flex"
      var img = document.createElement("img");
      img.className = "img-profile-chat";
      img.src = _img;
      cont_prof.appendChild(img)
      var user = document.createElement("b");
      user.innerHTML = _user;
      user.style.top = 0;
      user.style.padding = 0;
      user.onclick = img.onclick = function() {
        callback(img.src);
      }
      cont_prof.appendChild(user);
      item.appendChild(cont_prof);
    }
    var text = document.createElement("p");
    text.innerText = _text;
    item.appendChild(text);
    var date = document.createElement("p")
    date.style.fontSize = "12px";
    date.style.float = "right";
    date.innerText = new Date(parseInt(_date)).toLocaleTimeString('es-ES', {
      hour: 'numeric', minute: 'numeric', hour12: true
    });
    if (_date != null) item.appendChild(date);
    content.appendChild(item);
    // console.log(content.scrollHeight, document.body.scrollTop)
    downScroll();

  }
}