const GameSim = function() {
  this.field = new Field();

  this.update = function() {
    this.field.update();
  };
};

GameSim.prototype = {
  constructor : GameSim
};

GameSim.Player = function(x, y) {
  this.colorMain = "#ff0000";
  this.colorSec = "rgba(100, 100, 100)";
  this.vx = 0;
  this.vy = 0;
  this.x = 15;
  this.y = 25;
};

GameSim.Player.prototype = {
  constructor: GameSim.Player,
  
  moveLeft: function() {
    this.vx -= 0.1;
  },

  moveRight: function() {
    this.vx += 0.1;
  },

  moveUp: function() {
    this.vy -= 0.1;
  },

  moveDown: function() {
    this.vy += 0.1;
  },

  update: function() {
    this.x += this.vx;
    this.y += this.vy;
  }
}