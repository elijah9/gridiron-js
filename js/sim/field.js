const Field = function(friction = 0.9) {

  this.player = new GameSim.Player(); 

  let _friction = friction; 
  let _gridW = 120;
  let _gridH = 54;

  this.update = function() {
    this.player.update();

    this.player.vx *= _friction;
    this.player.vy *= _friction;

    collideObject(this.player);
  };

  let collideObject = function(object) {
    if(object.x < 0) {
      object.x = 0;
      object.vx = 0;
    } else if(object.x > _gridW) {
      object.x = _gridW;
      object.vx = 0;
    }

    if(object.y < 0) {
      object.y = 0;
      object.vy = 0;
    } else if(object.y > _gridH) {
      object.y = _gridH;
      object.vy = 0;
    }
  };
};

Field2D.prototype = {
  constructor: Field2D
}