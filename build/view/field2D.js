"use strict";
/// <reference path="../../node_modules/paper/dist/paper.d.ts" />
/// <reference path="../sim/field.ts" />
var Field2D = /** @class */ (function () {
    function Field2D(canvas) {
        this._resourcesToLoad = 2;
        this.canvas = canvas;
        // these lines must be after initDraw is declared, even though it makes organization worse
        this.canvas.addEventListener("field-loaded", this.initDraw, { once: true });
        this.canvas.addEventListener("players-loaded", this.initDraw, { once: true });
    }
    Field2D.prototype.loadAssets = function () {
        paper.setup(this.canvas);
        this.drawField();
        this.drawPlayers();
    };
    Field2D.prototype.updateField = function (field) {
        // draw the player (eventually this will be drawing 22 players)
        this.updatePlayer(field.player);
    };
    Field2D.prototype.resize = function (w, h) {
        // reverse the existing scales
        if (this._fieldScale !== undefined) {
            this._fieldImg.scale(1 / this._fieldScale, this._fieldImg.bounds.topLeft);
        }
        if (this._playerScale !== undefined) {
            this._playerImg.scale(1 / this._playerScale, new paper.Point(0, 0));
        }
        var ratio = this._baseFieldH / this._baseFieldW;
        this._fieldScale = h / w > ratio ? w / this._baseFieldW : h / this._baseFieldH;
        this._fieldImg.scale(this._fieldScale, this._fieldImg.bounds.topLeft);
        // scale player to be 3 yards wide
        var oldPlayerW = this._playerImg.bounds.width;
        this._pixelsPerYardX = this._fieldImg.bounds.width / 120.9;
        this._pixelsPerYardY = this._fieldImg.bounds.height / 54.1;
        var newPlayerW = this._pixelsPerYardX * 3;
        this._playerScale = newPlayerW / oldPlayerW;
        this._playerImg.scale(this._playerScale, new paper.Point(0, 0));
    };
    // I believe the way paper.js works means I only have to render here (not every frame)
    Field2D.prototype.initDraw = function (e) {
        this._resourcesToLoad--;
        if (this._resourcesToLoad > 0) {
            return;
        }
        // doesn't do anything useful right now but keeping this set up just in case
    };
    Field2D.prototype.drawField = function () {
        var _this = this;
        var fieldEvent = new Event("field-loaded");
        var fieldLayer = new paper.Layer();
        paper.project.addLayer(fieldLayer);
        paper.project.importSVG("../../media/field2D.svg", function (item) {
            _this._fieldImg = item;
            _this._baseFieldW = _this._fieldImg.bounds.width;
            _this._baseFieldH = _this._fieldImg.bounds.height;
            canvas.dispatchEvent(fieldEvent);
        });
    };
    Field2D.prototype.drawPlayers = function () {
        var playersEvent = new Event("players-loaded");
        var playersLayer = new paper.Layer();
        paper.project.addLayer(playersLayer);
        // method 1 - jersey SVG (not working right now)
        // paper.project.importSVG("../../media/jersey2.svg", (item : paper.Item) => {
        //   this._playerImg = item;
        //   this.canvas.dispatchEvent(playersEvent);
        // });
        // method 2 - just a circle
        this._playerImg = new paper.Path.Circle({
            center: [0, 0],
            radius: 3
        });
        playersLayer.addChild(this._playerImg);
        canvas.dispatchEvent(playersEvent);
    };
    Field2D.prototype.updatePlayer = function (player) {
        // should change things around so that this line isn't redundant with the identical one in fillPlayerColor()
        //this._playerImg.children.map((child : paper.Item) => { this.fillPlayerColor(player, child); });
        this._playerImg.fillColor = new paper.Color(player.colorMain); // this line should be moved to initialization code
        this._playerImg.bounds.x = player.x * this._pixelsPerYardX;
        this._playerImg.bounds.y = player.y * this._pixelsPerYardY;
        //let x = _playerImg.bounds.x;
        //let y = _playerImg.bounds.y;
        //console.log({x, y});
    };
    Field2D.prototype.fillPlayerColor = function (player, child) {
        var _this = this;
        child.fillColor = new paper.Color(player.colorMain);
        child.strokeColor = new paper.Color(player.colorSec);
        if (typeof child.children !== "undefined") {
            child.children.map(function (child) { _this.fillPlayerColor(player, child); });
        }
    };
    return Field2D;
}());
;
