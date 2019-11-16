// how could you want it any other way?
"use strict";

// initialize functions
let onKeyEvent = function(event) {
  controller.onKeyEvent(event.type, event.keyCode);
};

let resize = function(event) {
  field2D.resize(document.documentElement.clientWidth - 32, 
    document.documentElement.clientHeight - 32);
  field2D.render();
};

let render = function() {
  field2D.drawField(game.field);

  field2D.render();
};

let update = function() {
  if(controller.left.active) {
    game.field.player.moveLeft();
  }

  if(controller.right.active) {
    game.field.player.moveRight();
  }

  if(controller.up.active) {
    game.field.player.moveUp();
  }

  if(controller.down.active) {
    game.field.player.moveDown();
  }

  game.update();
};

// initialize objects
let controller = new Controller();
let field2D = new Field2D(document.querySelector("canvas"));
let game = new GameSim();
let engine = new Engine(1000 / 30, render, update);

// start the engine when the tilesheet is loaded
field2D.tilesheet.image.addEventListener("load", function(event) {
  resize();
  engine.start();
}, { once: true });

window.addEventListener("resize", resize);
window.addEventListener("keydown", onKeyEvent);  
window.addEventListener("keyup", onKeyEvent);  