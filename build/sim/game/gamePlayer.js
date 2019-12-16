"use strict";
var GamePlayer = /** @class */ (function () {
    function GamePlayer() {
        this.colorMain = "#ff0000"; // move to Player
        this.colorSec = "rgba(100, 100, 100)"; // move to Player
        this.x = 15;
        this.y = 25;
        this.vx = 0;
        this.vy = 0;
    }
    GamePlayer.prototype.moveLeft = function () {
        this.vx -= 0.1;
    };
    GamePlayer.prototype.moveRight = function () {
        this.vx += 0.1;
    };
    GamePlayer.prototype.moveUp = function () {
        this.vy -= 0.1;
    };
    GamePlayer.prototype.moveDown = function () {
        this.vy += 0.1;
    };
    GamePlayer.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
    };
    return GamePlayer;
}());
