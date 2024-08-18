function ViewPage(_content) {
  var content = document.getElementById(_content);
  var pages = document.querySelectorAll('.item-page');
  this.move = function(_count) {
    content.style.transform = `translateX(-${_count * 100}%)`;
    anim_normalize_scroll_top(pages[_count])
    anim_normalize_scroll_top(content)
    anim_normalize_scroll_top(document.body);
  }
}
function anim_normalize_scroll_top(element) {
  if (element.scrollTop > 0) {
    var count = element.scrollTop;
    var speed = 15;
    var interval = window.setInterval(function() {
      count = count == -(count % speed)? 0: count - speed;
      if (count <= 0) {
        window.clearInterval(interval);
      }
      element.scrollTop = count;
    },
      10);
  }
}
function tabActive(id, callback) {
  var tabs = document.querySelectorAll(".bottom-bar-item");
  var tab = document.getElementById(id);
  if (callback != null) {
    tab.onclick = function () {
      for (let i of tabs) {
        for (let i2 of i.childNodes) {
          if (i2.localName == "div") i2.classList.remove("img-active")
          if (i2.localName == "b") i2.classList.remove("text-active")
        }
      }
      if (tab.parentNode.children[0].localName == "div") tab.parentNode.children[0].className = "btn-round img-active";
      if (tab.parentNode.children[1].localName == "b") tab.parentNode.children[1].className = "btn-round text-active";
      callback();
    }
  } else {
    if (tab.parentNode.children[0].localName == "div") tab.parentNode.children[0].className = "btn-round img-active"
    if (tab.parentNode.children[1].localName == "b") tab.parentNode.children[1].className = "btn-round text-active";

  }
}
function Theme() {
  this.isDarkMode = function () {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    if (document.body.classList.contains('dark-mode')) {
      return true;
    }
    return false;
  }
  this.set = function(theme) {
    document.documentElement.className = theme;
  }
  var ctx = this;
  this.automatic = function() {
    window.setInterval(function() {
      if (ctx.isDarkMode()) {
        document.documentElement.className = "dark";
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
      2000);
  }
  var tog = true;
  this.toggle = function(time) {
    window.setInterval(function() {
      if (tog) {
        document.documentElement.className = "dark";
        tog = false;
      } else {
        document.documentElement.classList.remove('dark');
        tog = true;
      }
    },
      1000 * time);
  }
}
function setIconUse(element, icon) {
  for (var ix = 0; ix < element.childNodes.length; ix++) {
    if (element.childNodes[ix].localName == "svg") {
      for (var iy = 0; iy < element.childNodes[ix].childNodes.length; iy++) {
        if (element.childNodes[ix].childNodes[iy].localName == "use") {
          element.childNodes[ix].childNodes[iy].setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${icon}`)
        }
      }
    }
  }
}
function optionsEdit(item, content, rm, edit) {
  var _content = document.createElement("div");
  _content.className = "content-edit-articles"
  var _btn_edit = document.createElement("div");
  _btn_edit.innerHTML = `<svg>
  <use xlink:href="#icon_edit" />
  </svg>`;
  _btn_edit.className = "btn-round-small";
  var isEdit = true;
  var _btn_save = document.createElement("div");
  _btn_save.innerHTML = `<svg>
  <use xlink:href="#icon_save" />
  </svg>`;
  _btn_save.className = "btn-round-small";
  _btn_save.style.display = "none";
  var _title = "";
  var _context = "";
  _btn_edit.onclick = function() {
    for (let i of item.childNodes) {
      if (i.localName != "div") {
        i.contentEditable = isEdit;
        if (i.localName == "h2") {
          _title = i.innerText;
        } else {
          _context = i.innerText;
        }
        i.oninput = function() {
          if (i.localName == "h2") {
            _title = i.innerText;
          } else {
            _context = i.innerText;
          }
        }
        if (isEdit) {
          i.className = "input-edit"
        } else {
          i.classList.remove("input-edit")
        }
      }
    }
    if (isEdit) {
      setIconUse(_btn_edit, "icon_close")
      _btn_edit.style.transform = "rotate(360deg)"
      isEdit = false;
      _btn_save.style.display = "block"
    } else {
      setIconUse(_btn_edit, "icon_edit");
      _btn_edit.style.transform = "rotate(0)"
      isEdit = true;
      _btn_save.style.display = "none"
    }
  };
  var _btn_clear = document.createElement("div");
  _btn_clear.innerHTML = `<svg>
  <use xlink:href="#icon_delete" />
  </svg>`;
  _btn_clear.className = "btn-round-small";
  _btn_clear.onclick = function() {
    if (confirm("¿Estás seguro de borrar el artículo?")) {
      rm(item.id);
      content.removeChild(item)
    }
  };
  _btn_save.onclick = function() {
    console.log(item.id)
    console.log(_title, _context)
    console.log(edit)
    edit(item.id, _title, _context)
  }
  _content.appendChild(_btn_edit);
  _content.appendChild(_btn_clear);
  _content.appendChild(_btn_save)
  return _content;
}
function addArticles(content, id, title, text, isEdit = false, rm = Function, edit = Function) {
  var _content = document.createElement("div");
  _content.className = "item-article";
  _content.id = id;
  var _title = document.createElement("h2");
  _title.innerText = title;
  var _text = document.createElement("p");
  _text.innerText = text;
  if (isEdit) {
    _content.appendChild(optionsEdit(_content, content, rm, edit));
  }
  _content.appendChild(_title);
  _content.appendChild(_text);
  content.appendChild(_content);
}
function extractVideoId(url) {
  var videoId = null;
  var regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]+)/;
  var match = url.match(regex);
  if (match && match[1]) {
    videoId = match[1];
  }
  return videoId;
}
function addAid(content, id, title, text, linkYoutube, isEdit = false, rm = Function, edit = Function) {
  var _content = document.createElement("div");
  _content.className = "item-article";
  _content.id = id;
  var _title = document.createElement("h2");
  _title.innerText = title;
  var _text = document.createElement("p");
  var _iframe = document.createElement("iframe");
  _iframe.style.border = "0";
  _iframe.style.width = "100%";
  var videoId = extractVideoId(linkYoutube);

  if (videoId) {
    _iframe.src = "https://www.youtube.com/embed/" + videoId;
  } else {
    // Crea un elemento HTML dentro del iframe
    _iframe.onload = function() {
      var iframeDoc = _iframe.contentDocument || _iframe.contentWindow.document; // Obtiene el documento del iframe
      var content = iframeDoc.createElement("h3");
      content.textContent = "Url no válida";
      iframeDoc.body.appendChild(content);
    }
  }
  _text.innerText = text;
  if (isEdit) {
    _content.appendChild(optionsEdit(_content, content, rm, edit));
  }
  _content.appendChild(_title);
  _content.appendChild(_text);
  _content.appendChild(_iframe);
  content.appendChild(_content);
}
function addCustomAds(id, linksImages) {
  var content = document.getElementById(id);
  content.className = "custom-ads"
  var listImages = [];
  for (var i = 0; i < linksImages.length; i++) {
    var img = document.createElement("img");
    img.src = linksImages[i];
    listImages.push(img);
  }
  var COUNT_IMAGES = 0;
  var item1 = document.createElement("div");
  item1.className = "custom-ads-item";
  item1.appendChild(listImages[listImages.length-1]);
  content.appendChild(item1);
  var count_move = -content.clientWidth;
  var count_stop = 0;
  var isMove = true;
  var speed = 100;
  window.setInterval(function() {
    content.innerHTML = "";
    var item = document.createElement("div");
    item.className = "custom-ads-item"
    item.style.transform = `translateX(100px)`;
    var img = listImages[COUNT_IMAGES];
    item.appendChild(img);
    if (count_move == 0) {
      isMove = false;
      count_stop ++;
      if (count_stop >= 20) {
        isMove = true;
        count_stop = 0;
      }
    }
    if (isMove) {
      count_move = count_move == (-content.clientWidth % speed) ? 0: count_move+ speed;
    }
    item.style.transform = `translateX(${-(count_move)}px)`; //+"px";
    item.style.x = -count_move;
    if (count_move >= content.clientWidth) {
      var cont_rect = item.getBoundingClientRect();
      count_move = -(content.clientWidth);
      COUNT_IMAGES = COUNT_IMAGES >= listImages.length -1 ? 0: COUNT_IMAGES + 1;
    }
    content.appendChild(item);
  },
    100);
}
function addEvent(content, id, user_name, date, image, details) {
  var _content = document.createElement("div");
  _content.className = "item-event";
  _content.id = id;
  var _user = document.createElement("h2");
  _user.innerText = user_name;
  var _date = document.createElement("h4");
  _date.innerText = date;
  var _details = document.createElement("p");
  var _image = document.createElement("img");
  _image.src = image;
  _details.innerText = details;
  _content.appendChild(_user);
  _content.appendChild(_date);
  _content.appendChild(_image);
  _content.appendChild(_details);
  content.appendChild(_content);
}
function addTop(content, top, points, id, user_name, image_profile) {
  var _content = document.createElement("div");
  _content.className = "item-top";
  var _top = document.createElement("div");
  //_top.className = "item-top-number";
  //_content.id = id;
  _top.innerHTML = `<h3>${top.toString()}</h3>`
  switch (parseInt(top)) {
    case 1:
      _top.className = "item-top-number medal-gold";
      break;
    case 2:
      _top.className = "item-top-number medal-silver";
      break;
    case 3:
      _top.className = "item-top-number medal-bronze";
      break;
    default:
      _top.className = "item-top-number top-normal";
      break;
  }
  _content.appendChild(_top);
  var _image = document.createElement("img");
  _image.src = image_profile;
  _image.className = "btn-round"
  var _user = document.createElement("h4");
  _user.innerText = user_name;
  var _id = document.createElement("h4");
  _id.innerText = id;
  var _points = document.createElement("h4");
  _content.appendChild(_points);
  _points.innerText = points;
  _content.appendChild(_id);
  _content.appendChild(_user);
  _content.appendChild(_image);
  content.appendChild(_content);
}