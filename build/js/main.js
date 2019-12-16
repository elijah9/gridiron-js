define(["require", "exports", "./view/field2D", "./controllers/controller"], function (require, exports, field2D_1, controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // initialize state variables
    var resourcesToInit = 2;
    // initialize functions
    var init = function (e) {
        resourcesToInit--;
        if (resourcesToInit > 0) {
            return;
        }
        resize(e);
        engine.start();
    };
    var onKeyEvent = function (e) {
        controller.onKeyEvent(e.type, e.keyCode);
    };
    var resize = function (e) {
        field2D.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32);
    };
    var render = function () {
        field2D.updateField(game.field);
    };
    var update = function () {
        if (controller.left.active) {
            game.field.player.moveLeft();
        }
        if (controller.right.active) {
            game.field.player.moveRight();
        }
        if (controller.up.active) {
            game.field.player.moveUp();
        }
        if (controller.down.active) {
            game.field.player.moveDown();
        }
        game.update();
    };
    // initialize game modules
    var canvas = document.querySelector("canvas");
    var controller = new controller_1.Controller();
    var field2D = new field2D_1.Field2D(canvas);
    var game = new GameSim();
    var engine = new Engine(1000 / 30, render, update);
    // start the engine when the tilesheet is loaded
    field2D.canvas.addEventListener("field-loaded", init, { once: true });
    field2D.canvas.addEventListener("players-loaded", init, { once: true });
    field2D.loadAssets();
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", onKeyEvent);
    window.addEventListener("keyup", onKeyEvent);
});
