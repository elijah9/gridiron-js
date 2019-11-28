"use strict";
var GameSim = /** @class */ (function () {
    function GameSim() {
        this.field = new Field();
    }
    GameSim.prototype.update = function () {
        this.field.update();
    };
    return GameSim;
}());
