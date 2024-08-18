function Drawer(_content, type) {
  this.element = document.getElementById(_content);
  this.element.style.transition = "all 0.5s ease-in-out"
  this.button = null; //document.createElement("button")
  this.imageOpen = "";
  this.imageClose = "";
  this.type = "top";
  this.isOpen = false;
  this.timeContent = "0.5s";
  this.timeButton = "0.5s";
  this.disable = false;

  this.types_open = {
    "top" : function(elm) {
      elm.style.top = 0; //style.transform = `translateY(calc(50% - 40px)`;
    },
    "left" : function(elm) {
      elm.style.transform = `translateX(calc(80vw))`;
    },
    "right" : function() {},
    "bottom" : function() {},
  };
  this.types_close = {
    "top" : function(elm) {
      //console.log(elm)
      elm.style.top = `calc(-${elm.offsetHeight}px + 60px)` //"calc(-80% + 60px)"; //.transform = `translateY(0)`;
    },
    "left" : function(elm) {
      elm.style.transform = `translateX(0)`;
    },
    "right" : function() {},
    "bottom" : function() {},
  };

  this.open = function() {
    this.element.style.transition = `all ${this.timeContent} ease-in-out`;
    this.button.style.transition = `all ${this.timeButton} ease-in-out`;
    this.isOpen = true;
    this.types_open[type](this.element);
    this.anim_button_open(this.button);
  }
  this.close = function () {
    this.element.style.transition = `all ${this.timeContent} ease-in-out`;
    this.isOpen = false;
    this.types_close[type](this.element);
    this.anim_button_close(this.button);
  }
  var ctx = this;
  this.setButton = function(_id, _imageOpen, _imageClose) {
    this.button = document.getElementById(_id);
    this.imageOpen = _imageOpen;
    this.imageClose = _imageClose;
    this.button.style.backgroundImage = `url(${this.imageOpen})`;
    if (this.button != null) {
      // if (this.disable) {
      this.button.addEventListener("click", function() {
        ctx.switch();
        if (ctx.isOpen) {
          ctx.onOpen();
        } else {
          ctx.onClose();
        }
      },
        false);
      // }
    }
  }
  this.anim_button_open = function(elm) {
    elm.style.transition = `all ${this.timeButton} ease-in-out`;
    elm.style.transform = `rotate(360deg)`;
    elm.style.backgroundImage = `url(${this.imageClose})`;
  }
  this.anim_button_close = function(elm) {
    elm.style.transition = `all ${this.timeButton} ease-in-out`;
    elm.style.transform = `rotate(0deg)`;
    elm.style.backgroundImage = `url(${this.imageOpen})`;
  }
  this.switch = function() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  this.onOpen = function() {};
  this.onClose = function() {};
  //
  this.types_open[type](this.element)
  window.setTimeout(()=> {
    this.element.style.transition = `all 2s ease-in-out`;
    this.types_close[type](this.element)
  }, 100);
}