const Field = function(friction = 0.9) {
  this.friction = friction; 
  this.player = new GameSim.Player(); 
  this.gridW = 120;
  this.gridH = 54;
  this.map = Array(120 * 54).fill([00]);

  this.collideObject = function(object) {
    if(object.x < 0) {
      object.x = 0;
      object.vx = 0;
    } else if(object.x > this.gridW) {
      object.x = this.gridW;
      object.vx = 0;
    }

    if(object.y < 0) {
      object.y = 0;
      object.vy = 0;
    } else if(object.y > this.gridH) {
      object.y = this.gridH;
      object.vy = 0;
    }
  };

  this.update = function() {
    this.player.update();

    this.player.vx *= this.friction;
    this.player.vy *= this.friction;

    this.collideObject(this.player);
  };
};

Field2D.prototype = {
  constructor: Field2D
}