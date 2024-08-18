new Theme().automatic();

var tab_content = document.getElementById("tab_content");
var input_content = document.getElementById("input_content");

var content_article = document.getElementById("content_article");
var content_add_article = document.getElementById("content_add_article");
var content_events = document.getElementById("content_events");
var content_add_event = document.getElementById("content_add_event");
var content_add_aid = document.getElementById("content_add_aid");
var content_aid = document.getElementById("content_aid");
var content_tops = document.getElementById("content_tops");
var content_chat_room = document.getElementById("content_chat_room");
var content_camera = document.getElementById("content_camera");
var content_detalis_profile = document.getElementById("content_detalis_profile");
var content_login = document.getElementById("content_login");
var content_profile = document.getElementById("content_profile");

var get_files_content = document.getElementById("get_files_content");
var image_to_send_content = document.getElementById("image_to_send_content");
var img_details_profile = document.getElementById("img_details_profile");

var input_message = document.getElementById("input_message");
var input_description_image = document.getElementById("input_description_image");
var video_camera_chat = document.getElementById("video_camera_chat");
var details_profile_name = document.getElementById("details_profile_name");
var details_profile_id = document.getElementById("details_profile_id");
var details_profile_info = document.getElementById("details_profile_info");
var input_password_login = document.getElementById('input_password_login');
var btn_show_password = document.getElementById('btn_show_password_login');
var input_content_password_login = document.getElementById('input_content_password_login');

var btn_start_chat = document.getElementById("btn_start_chat");
var btn_send_message = document.getElementById("btn_send_message");
var btn_capture_photo = document.getElementById("btn_capture_photo");
var btn_change_camera = document.getElementById("btn_change_camera");
var btn_get_file = document.getElementById("btn_get_file");
var btn_camera = document.getElementById("btn_camera");
var btn_gallery = document.getElementById("btn_gallery");
var btn_add_event = document.getElementById("btn_add_event");
var btn_add_article = document.getElementById("btn_add_article");
var btn_add_aid = document.getElementById("btn_add_aid");
var btn_post_aid = document.getElementById("btn_post_aid");
var btn_admin_more = document.getElementById("btn_admin_more");

var btn_close_chat = document.getElementById("btn_close_chat");
var btn_close_get_files = document.getElementById("btn_close_get_files");
var btn_close_image_to_send = document.getElementById("btn_close_image_to_send");
var btn_close_camera = document.getElementById("btn_close_camera");
var btn_close_details_profile = document.getElementById("btn_close_details_profile");

var viewPage = new ViewPage("content");
var chatRoom = new ChatRoom(content_chat_room);
var camera_chat = new Camera(video_camera_chat);
var drawerBar = new Drawer("action_bar", "top");

getStatus(function(status) {
  switch (status) {
    case "user":
      btn_add_event.style.display = "block";
      btn_start_chat.style.display = "block";
      content_profile.style.display = "flex";
      break;
    case "admin":
      btn_start_chat.style.display = "block";
      btn_add_event.style.display = "block";
      btn_add_article.style.display = "block";
      btn_add_aid.style.display = "block";
      btn_admin_more.style.transform = "translateY(0)"
      content_profile.style.display = "flex";
      break;
    case "observer": default:
      content_chat_room.innerHTML = "<h2>No estás registrado</h2>";
      drawerBar.disable = true;
      content_login.style.display = "block";
      setEditPassword(input_content_password_login, input_password_login, btn_show_password)
      break;
  }
})
btn_post_aid.onclick = function() {
  var input_aid_title = document.getElementById("input_aid_title").innerText;
  var input_aid_description = document.getElementById("input_aid_description").innerText;
  var input_aid_url_youtube = document.getElementById("input_aid_url_youtube").innerText;
  addAid(content_aid, 0, input_aid_title, input_aid_description, input_aid_url_youtube)
}
btn_close_chat.onclick = function() {
  closeChat(true);
}
btn_start_chat.onclick = function() {
  startChat();
}
var isAddEvent = true;
btn_add_event.onclick = function() {
  if (isAddEvent) {
    content_add_event.style.display = "flex";

    var sild_in = function() {
      content_add_event.style.transform = "scale(1)";
      isAddEvent = false;
      btn_add_event.innerText = "Cancelar"
    };
    window.setTimeout(sild_in, 10);
  } else {
    var silde_out = function() {
      content_add_event.style.display = "none";
      isAddEvent = true;
      btn_add_event.innerText = "Añadir evento";
    }
    window.setTimeout(silde_out, 200);
    content_add_event.style.transform = "scale(0)";
  }
}
var isAddArticle = true;
btn_add_article.onclick = function() {
  if (isAddArticle) {
    content_add_article.style.display = "block";
    var silde_in = function() {
      content_add_article.style.transform = "scale(1)";
      isAddArticle = false;
      btn_add_article.innerText = "Cancelar"
    };
    window.setTimeout(silde_in, 10);
  } else {
    var silde_out = function() {
      content_add_article.style.display = "none";
      isAddArticle = true;
      btn_add_article.innerText = "Añadir artículo"
    };
    window.setTimeout(silde_out, 200);
    content_add_article.style.transform = "scale(0)";
  }
}
var isAddAid = true;
btn_add_aid.onclick = function() {
  if (isAddAid) {
    content_add_aid.style.display = "block";
    var silde_in = function() {
      content_add_aid.style.transform = "scale(1)";
      isAddAid = false;
      btn_add_aid.innerText = "Cancelar"
    };
    window.setTimeout(silde_in, 10);
  } else {
    var silde_out = function() {
      content_add_aid.style.display = "none";
      isAddAid = true;
      btn_add_aid.innerText = "Agregar"
    };
    window.setTimeout(silde_out, 200);
    content_add_aid.style.transform = "scale(0)";
  }
}
document.body.scrollTop = document.body.scrollHeight;
function imageDescription(img, callback) {
  image_to_send_content.style.transform = "translateY(0)";
  var btn_send_image_and_message = document.getElementById("btn_send_image_and_message");
  document.getElementById("img_to_send").src = img;
  btn_send_image_and_message.onclick = ()=> {
    callback(input_description_image.innerText);
    input_description_image.innerText = "";
    closeImageToSend();
  }
}
function getImage(close, callback) {
  get_files_content.style.transform = "translateY(0)"
  btn_close_get_files.style.transform = "rotate(360deg)"
  var _text = "";
  var _img = "";
  btn_gallery.onclick = function() {
    var _photo = function(base64) {
      _img = base64;
      callback(base64)
      closeGetFiles();
    }
    _getPhoto(_photo);
  }

  btn_close_image_to_send.onclick = function() {
    closeImageToSend();
  }
  btn_camera.onclick = function () {
    if (camera_chat.requestPermissionCamera) {
      openCamera();
      camera_chat.init();
    } else {
      camera_chat.requestPermission();
    }
  }
  btn_change_camera.onclick = function() {
    camera_chat.change();
  }
  btn_capture_photo.onclick = function() {
    var _photo = function (img) {
      callback(img)
      closeCamera();
      camera_chat.exit();
      closeGetFiles();
      close();
    }
    camera_chat.capture(_photo);
  }
  btn_close_get_files.onclick = function() {
    closeGetFiles();
    close();
  }
  btn_close_camera.onclick = function () {
    closeCamera();
    camera_chat.exit();
    close();
  }
};

function getDetailsProfile(img, user, user_id, info) {
  content_detalis_profile.style.transform = "translateX(0)";
  btn_close_details_profile.style.transform = "rotate(360deg)";
  img_details_profile.innerText = "";
  var i = document.createElement("img");
  i.src = img;
  i.style.width = "100%"
  i.style.height = "100%"
  i.className = "image-profile"
  console.log(img)
  //img_details_profile.style.backgroundSize = "cover";
  img_details_profile.appendChild(i)
  // img_details_profile.style.backgroundImage = `url(${img})`; //.appendChild(i)
  details_profile_name.innerText = user;
  details_profile_id.innerText = user_id;
  details_profile_info.innerText = info;
  btn_close_details_profile.onclick = function() {
    content_detalis_profile.style.transform = "translateX(-100vw)";
    btn_close_details_profile.style.transform = "rotate(0)";
  }
}
function startChat() {
  tab_content.style.transform = "translateY(100px)"
  input_content.style.transform = "translateY(0)"
  btn_start_chat.style.transform = "translateY(150px)"
  btn_close_chat.style.transform = "rotate(0)"
}
function closeChat(isOpenTab) {
  input_content.style.transform = "translateY(100px)"
  btn_close_chat.style.transform = "rotate(360deg)"
  if (isOpenTab) btn_start_chat.style.transform = "translateY(0)"
  if (isOpenTab) tab_content.style.transform = "translateY(0)"
}
function openGetFiles() {
  get_files_content.style.transform = "translateY(0)"
  btn_close_get_files.style.transform = "rotate(360deg)"
  closeChat();
}
function closeGetFiles() {
  get_files_content.style.transform = "translateY(100px)"
  btn_close_get_files.style.transform = "rotate(0)"
  //startChat();
}
function closeImageToSend() {
  image_to_send_content.style.transform = "translateY(150vh)";
}
function openCamera() {
  content_camera.style.transform = "translateY(0)";
}
function closeCamera() {
  content_camera.style.transform = "translateY(150vh)";
}
viewPage.move(2);
tabActive("btn_home", null);

tabActive("btn_chat_room", function() {
  viewPage.move(0);

  btn_start_chat.style.transform = "translateY(0)";
  btn_admin_more.style.transform = "translateY(150px)"
});
tabActive("btn_event", function() {
  viewPage.move(1);


  btn_start_chat.style.transform = "translateY(100px)"
  btn_admin_more.style.transform = "translateY(0)"
});
tabActive("btn_home", function() {
  viewPage.move(2);


  btn_start_chat.style.transform = "translateY(100px)"
  btn_admin_more.style.transform = "translateY(0)"
});
tabActive("btn_top", function() {
  viewPage.move(3);


  btn_start_chat.style.transform = "translateY(100px)"
  btn_admin_more.style.transform = "translateY(0)"
});
tabActive("btn_help", function() {
  viewPage.move(4);
  btn_start_chat.style.transform = "translateY(100px)"
  btn_admin_more.style.transform = "translateY(0)"
});
/*Creación del Drawer Bar */
drawerBar.type = "top";
drawerBar.setButton("btn_profile", null, null);
drawerBar.button.style.transition = `all 2s ease`;
drawerBar.anim_button_open = function(e) {
  e.style.transform = "rotate(180deg)"
  setIconUse(e, "icon_close")
}
drawerBar.anim_button_close = function(e) {
  e.style.transform = "rotate(0)"
  setIconUse(e, "icon_profile")
}
//drawerBar.close();
addArticles(content_article, 0, "Título", "El contenido de un artículo editable", true)
getArticles(function(type_user, id, title, text) {
  var isAdmin = type_user == "admin";
  var _rmArticle = function(i) {
    console.log(`Remove:${i}`)
  }
  var _editArticle = function(id, tit, ctx) {
    console.log(`Edit:
      id:${tit},
      title:${tit},
      context:${ctx}`)
  }
  addArticles(content_article, id, title, text, isAdmin, _rmArticle, _editArticle);
});
getEvents(function(type_user, id, user, date, image, details) {
  addEvent(content_events, id, user, date, image, details);
})

btn_send_message.onclick = function() {
  if (input_message.innerText == "") {
    closeChat();
    var _close = function() {
      startChat();
    }
    var _photo = function(img) {
      imageDescription(img, function(text) {
        chatRoom.sendPhoto(img, text)
        startChat();
      });
    }
    getImage(_close, _photo);
  } else {
    chatRoom.send(input_message.innerText);
    input_message.innerText = "";
    input_message.focus();
  }
  btn_send_message.style.transform = "rotate(20deg)"
  setIconUse(btn_send_message, "icon_get_file")
}
btn_send_message.style.transform = "rotate(20deg)"
input_message.oninput = function () {
  if (input_message.innerText == "") {
    setIconUse(btn_send_message, "icon_get_file")
    btn_send_message.style.transform = "rotate(20deg)";
  } else {
    setIconUse(btn_send_message, "icon_send");
    btn_send_message.style.transform = "rotate(360deg)";
  }
}
var user = ["Fulana",
  "Mengana",
  "Perenseja",
  "Don Omar",
  "Roli ston",
  "De Bitles"];
var img_array = ["/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg"
];
var c_i = 0;
var messages = ["Tengo 5 cajas de cigarros de la tienda a 100 $ cada una",
  "Tengo azúcar blanca en la cuatro 💥💥💥",
  "Tengo ibuprofeno a 300",
  "💳🚨🚨🚨 vendo 60 MLC a 275 tengo domicilio 🚨🚨🚨",
  "Tengo dinero en tarjeta visa para comprar gasolina y petróleo 🛢️ principal mente el pagó al 1x1 en efectivo en USD o euros",
  "Tengo maíz tierno para hacer tamales a 15$ la mazorca"]
for (let i in messages) {
  c_i = c_i >= img_array.length -1 ?0: c_i+1;
  chatRoom.receive(img_array[c_i], user[i], null, messages[i], new Date().toLocaleTimeString(), function(img) {
    // alert(`Este es el perfil de:${user[i]}`);
    getDetailsProfile(img, user[i], `@${(user[i]).toLowerCase().split(" ").join("")}`, `Yo soy ${user[i]}, y este es mi perfil`)
    console.log(img)
  })
  chatRoom.send("Hola " + user[i]);
  addTop(content_tops, parseInt(i)+1, 1000-(parseInt(i) *2), `@${(user[i]).toLowerCase().split(" ").join("")}`, user[i], img_array[c_i])
}