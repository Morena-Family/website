function _getPhoto(callback) {
  var fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.addEventListener('change', function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      callback(event.target.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  });
  fileInput.click();
}
function Camera(videoElement) {
  this.video = videoElement;
  this.currentStream = null;
  this.requestPermissionCamera = localStorage.getItem("requestPermissionCamera");
  this.requestPermission = function() {
    if (!this.requestPermissionCamera) {
      this.requestPermissionCamera = true;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
          video: true
        })
        .then(function(stream) {
          stream.getTracks().forEach(track => track.stop());
          console.log("Permiso concedido!");
          localStorage.setItem("requestPermissionCamera", true);
          return;
        })
        .catch(function(error) {
          console.error("Error al obtener acceso a la cámara:", error);
        });
      } else {
        console.error("El navegador no soporta la API de MediaDevices.");
      }
    }
  }
  this.init = function () {
    if (this.requestPermissionCamera) {
      this.video.style.transform = "scaleX(-1)";
      this.video.play();
      this.getCameras()
      .then(cameras => {
        const frontCamera = cameras.find(camera => camera.label.toLowerCase().includes('front') || camera.label.toLowerCase().includes('user'));
        if (frontCamera) {
          this.useCamera(frontCamera.deviceId, () => {});
        } else {
          if (cameras.length > 0) {
            this.useCamera(cameras[0].deviceId, () => {});
          } else {
            console.error("No se encontraron cámaras");
          }
        }
      });
    }
  }
  this.isScaleX = false;
  this.change = function () {
    if (this.requestPermissionCamera) {
      this.getCameras()
      .then(cameras => {
        let currentCameraId = this.currentStream.getVideoTracks()[0].getSettings().deviceId;
        const otherCamera = cameras.find(camera => camera.deviceId !== currentCameraId);
        if (otherCamera) {
          this.isScaleX = this.video.style.transform != "scaleX(1)";
          this.video.style.transform = this.isScaleX ? "scaleX(1)": "scaleX(-1)";
          this.useCamera(otherCamera.deviceId, () => {});
        } else {
          console.error("No se encontró otra cámara");
        }
      });
    }
  };
  this.capture = function (callback) {
    if (this.requestPermissionCamera) {
      this.video.pause();
      this._getPhotoCamera(this.video,
        (p) => {
          callback(p);
        });
    }
  };
  this.exit = function () {
    this.stopCamera(this.currentStream);
    this.currentStream = null;
  }
  this.getCameras = function() {
    return navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      return devices.filter(device => device.kind === 'videoinput');
    });
  }
  this.useCamera = function (deviceId,
    callback) {
    if (this.currentStream) {
      this.stopCamera(this.currentStream);
    }
    var rect = this.video.getBoundingClientRect();
    var W = Math.floor(rect.height);
    var H = Math.floor(rect.width);
    console.log(W, H);
    navigator.mediaDevices.getUserMedia({
      video: {
        height: H,
        width: W,
        deviceId: {
          exact: deviceId
        }
      }
    })
    .then(stream => {
      this.video.srcObject = stream;
      this.currentStream = stream;
      callback(stream);
    })
    .catch(err => {
      console.error('Error al acceder a la cámara:', err);
    });
  }
  this.stopCamera = function(stream) {
    stream.getTracks().forEach(track => track.stop());
  }
  this._getPhotoCamera = function (_video, callback) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = _video.videoWidth;
    canvas.height = _video.videoHeight;
    if (!this.isScaleX) {
      context.scale(-1, 1);
      context.translate(-canvas.width, 0);
    }
    context.drawImage(_video, 0, 0, _video.videoWidth, _video.videoHeight);
    callback(canvas.toDataURL('image/png'));
  }
}