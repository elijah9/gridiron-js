"use strict";
var Field = /** @class */ (function () {
    function Field(friction) {
        if (friction === void 0) { friction = 0.9; }
        this.player = new GamePlayer();
        this._gridW = 120;
        this._gridH = 54;
        this._friction = friction;
    }
    Field.prototype.update = function () {
        this.player.update();
        this.player.vx *= this._friction;
        this.player.vy *= this._friction;
        this.collideObject(this.player);
    };
    Field.prototype.collideObject = function (object) {
        if (object.x < 0) {
            object.x = 0;
            object.vx = 0;
        }
        else if (object.x > this._gridW) {
            object.x = this._gridW;
            object.vx = 0;
        }
        if (object.y < 0) {
            object.y = 0;
            object.vy = 0;
        }
        else if (object.y > this._gridH) {
            object.y = this._gridH;
            object.vy = 0;
        }
    };
    return Field;
}());
