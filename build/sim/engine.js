"use strict";
var Engine = /** @class */ (function () {
    function Engine(dt, onTick, render) {
        var _this = this;
        this._elapsed = 0;
        this._updated = false;
        this.handleTick = function (timeStamp) {
            _this.tick(timeStamp);
        };
        this._dt = dt;
        this._onTick = onTick;
        this._render = render;
    }
    Engine.prototype.start = function () {
        this._elapsed = this._dt;
        this._time = window.performance.now();
        this._animationFrameRequest = window.requestAnimationFrame(this.handleTick);
    };
    Engine.prototype.stop = function () {
        window.cancelAnimationFrame(this._animationFrameRequest);
    };
    Engine.prototype.tick = function (timeStamp) {
        this._elapsed += timeStamp - this._time;
        this._time = timeStamp;
        // roll back if 3 or more frames behind
        if (this._elapsed >= this._dt * 3) {
            console.log("rolling back frames...");
            this._elapsed = this._dt;
        }
        // run all the accumulated ticks
        while (this._elapsed >= this._dt) {
            this._elapsed -= this._dt;
            this._onTick(timeStamp);
            this._updated = true;
        }
        // only draw when necessary
        if (this._updated) {
            this._updated = false;
            this._render(timeStamp);
        }
        this._animationFrameRequest = window.requestAnimationFrame(this.handleTick);
    };
    return Engine;
}());
