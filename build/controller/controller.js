"use strict";
var Controller = /** @class */ (function () {
    function Controller() {
        this.down = new ButtonInput();
        this.left = new ButtonInput();
        this.right = new ButtonInput();
        this.up = new ButtonInput();
    }
    Controller.prototype.onKeyEvent = function (type, keyCode) {
        var down = type === "keydown";
        switch (keyCode) {
            case 37:
                this.left.handleInput(down);
                break;
            case 38:
                this.up.handleInput(down);
                break;
            case 39:
                this.right.handleInput(down);
                break;
            case 40:
                this.down.handleInput(down);
        }
    };
    return Controller;
}());
var ButtonInput = /** @class */ (function () {
    function ButtonInput() {
        this.active = false;
        this.down = false;
    }
    ButtonInput.prototype.handleInput = function (down) {
        if (this.down != down) {
            this.active = down;
        }
        this.down = down;
    };
    return ButtonInput;
}());
