var processor = {
  timerCallback: function() {
    if (this.video.paused || this.video.ended) {
      return;
    }
    this.computeFrame();
    var self = this;
    setTimeout(function () {
      self.timerCallback();
    }, 16); // roughly 60 frames per second
  },

  doLoad1: function() {
    this.video = document.getElementById("my-video");
    this.c1 = document.getElementById("canvas1");
    this.ctx1 = this.c1.getContext("2d");
    var self = this;

	this.c2 = document.getElementById("canvas2");
    this.ctx2 = this.c2.getContext("2d");
    var self = this;

    this.video.addEventListener("play", function() {
      self.width = self.video.width;
      self.height = self.video.height;
      self.timerCallback();
    }, false);
  },
  doLoad2: function() {
    this.video = document.getElementById("my-video");
    this.c1 = document.getElementById("canvas2");
    this.ctx1 = this.c1.getContext("2d");
    var self = this;

    this.video.addEventListener("play", function() {
      self.width = self.video.width;
      self.height = self.video.height;
      self.timerCallback();
    }, false);
  },

  computeFrame: function() {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    var frame = this.ctx1.getImageData(0, 0, this.width, this.height);
    var l = frame.data.length / 4;

    for (var i = 0; i < l; i++) {
      var grey = (frame.data[i * 4 + 0] + frame.data[i * 4 + 1] + frame.data[i * 4 + 2]) / 3;

      frame.data[i * 4 + 0] = grey;
      frame.data[i * 4 + 1] = grey;
      frame.data[i * 4 + 2] = grey;
    }
    this.ctx1.putImageData(frame, 0, 0);
	
	this.ctx2.drawImage(this.video, 0, 0, this.width, this.height);
    var frame = this.ctx2.getImageData(0, 0, this.width, this.height);
    var l = frame.data.length / 4;

    for (var i = 0; i < l; i++) {
      var grey = (frame.data[i * 4 + 0] + frame.data[i * 4 + 0] + frame.data[i * 4 + 2]) / 3;
		  let r = frame.data[i * 4 + 0];
          let g = frame.data[i * 4 + 0];
          let b = frame.data[i * 4 + 2];
		frame.data[i * 4 + 0] = 255-( (r * 0.393)+(g * 0.769)+(b * 0.189));
	    frame.data[i * 4 + 1] = 255-( (r * 0.349)+(g * 0.686)+(b * 0.168));
		frame.data[i * 4 + 2] = 255-( (r * 0.272)+(g * 0.534)+(b * 0.131));
    }
    this.ctx2.putImageData(frame, 0, 0);

    return;
  }
};  

processor.doLoad1()