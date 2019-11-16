const Engine = function(dt, update, render) {

  this.elapsed = 0;
  this.animationFrameRequest = undefined;
  this.time = undefined;
  this.dt = dt;
  this.updated = false;
  this.update = update;
  this.render = render;
  
  this.tick = function(timeStamp) {
    this.elapsed += timeStamp - this.time;
    this.time = timeStamp;

    // roll back if 3 or more frames behind
    if(this.elapsed >= this.dt * 3) {
      console.log("rolling back frames...");
      this.elapsed = this.dt;
    }

    // run all the accumulated ticks
    while(this.elapsed >= this.dt) {
      this.elapsed -= this.dt;
      this.update(timeStamp);
      this.updated = true;
    }

    // only draw when necessary
    if(this.updated) {
      this.updated = false;
      this.render(timeStamp);
    }

    this.animationFrameRequest = window.requestAnimationFrame(this.handleTick);
  };

  this.handleTick = (timeStamp) => {
    this.tick(timeStamp);
  };
};

Engine.prototype = {
  
  constructor:Engine,
  
  start:function() {
    this.elapsed = this.dt;
    this.time = window.performance.now();
    this.animationFrameRequest = window.requestAnimationFrame(this.handleTick);
  },

  stop:function() {
    window.cancelAnimationFrame(this.animationFrameRequest); 
  }
}