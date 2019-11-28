"use strict";
var Player = /** @class */ (function () {
    function Player() {
        this.colorMain = "#ff0000";
        this.colorSec = "rgba(100, 100, 100)";
        this.x = 15;
        this.y = 25;
        this.vx = 0;
        this.vy = 0;
    }
    Player.prototype.moveLeft = function () {
        this.vx -= 0.1;
    };
    Player.prototype.moveRight = function () {
        this.vx += 0.1;
    };
    Player.prototype.moveUp = function () {
        this.vy -= 0.1;
    };
    Player.prototype.moveDown = function () {
        this.vy += 0.1;
    };
    Player.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
    };
    return Player;
}());
