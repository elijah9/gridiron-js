// how could you want it any other way?
"use strict";

// initialize state variables
let resourcesToInit = 2;

// initialize functions
let init = function(e) {
  resourcesToInit--;
  if(resourcesToInit > 0) { return; }

  resize();
  engine.start();
};

let onKeyEvent = function(e) {
  controller.onKeyEvent(e.type, e.keyCode);
};

let resize = function(e) {
  field2D.resize(document.documentElement.clientWidth - 32, 
    document.documentElement.clientHeight - 32);
};

let render = function() {
  field2D.updateField(game.field);
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

// initialize game modules
let canvas = document.querySelector("canvas");
let controller = new Controller();
let field2D = new Field2D(canvas);
let game = new GameSim();
let engine = new Engine(1000 / 30, render, update);

// start the engine when the tilesheet is loaded
field2D.canvas.addEventListener("field-loaded", init, { once: true });
field2D.canvas.addEventListener("players-loaded", init, { once: true });
field2D.loadAssets();

window.addEventListener("resize", resize);
window.addEventListener("keydown", onKeyEvent);  
window.addEventListener("keyup", onKeyEvent);  

