const Engine = function(dt, onTick, render) {

  let _elapsed = 0;
  let _animationFrameRequest = undefined;
  let _time = undefined;
  let _dt = dt;
  let _updated = false;
  let _onTick = onTick;
  let _render = render;

  this.handleTick = (timeStamp) => {
    tick(timeStamp);
  };

  this.start = function() {
    _elapsed = _dt;
    _time = window.performance.now();
    _animationFrameRequest = window.requestAnimationFrame(this.handleTick);
  };

  this.stop = function() {
    window.cancelAnimationFrame(_animationFrameRequest); 
  };

  let tick = (timeStamp) => {
    _elapsed += timeStamp - _time;
    _time = timeStamp;

    // roll back if 3 or more frames behind
    if(_elapsed >= _dt * 3) {
      console.log("rolling back frames...");
      _elapsed = _dt;
    }

    // run all the accumulated ticks
    while(_elapsed >= _dt) {
      _elapsed -= _dt;
      _onTick(timeStamp);
      _updated = true;
    }

    // only draw when necessary
    if(_updated) {
      _updated = false;
      _render(timeStamp);
    }

    _animationFrameRequest = window.requestAnimationFrame(this.handleTick);
  };
};

Engine.prototype = {
  constructor:Engine
};