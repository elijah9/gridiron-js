// Controller class defines functionality for user input
const Controller = function() {

  this.down = new Controller.ButtonInput();
  this.left = new Controller.ButtonInput();
  this.right = new Controller.ButtonInput();
  this.up = new Controller.ButtonInput();

  this.onKeyEvent = function(type, keyCode) {
    let down = event.type === "keydown";
    switch(event.keyCode) {
      case 37:
        this.left.handleInput(down);
        break;
      case 38:
        this.up.handleInput(down);
        break;
      case 39:
        this.right.handleInput(down);
        break;  
      case 40:
        this.down.handleInput(down);
    }
  };
};

Controller.prototype = {
  constructor : Controller
};

// Controller.ButtonInput class stores active/pressed state of a single button
Controller.ButtonInput = function() {
  this.active = this.down = false;
};

Controller.ButtonInput.prototype = {
  constructor : Controller.ButtonInput,
  handleInput : function(down) {
    if(this.down != down) {
      this.active = down;
    }
    this.down = down;
  }
}