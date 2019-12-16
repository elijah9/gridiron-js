define(["require", "exports", "typescript-collections"], function (require, exports, typescript_collections_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PlayerAttribute;
    (function (PlayerAttribute) {
        PlayerAttribute[PlayerAttribute["Speed"] = 0] = "Speed";
    })(PlayerAttribute = exports.PlayerAttribute || (exports.PlayerAttribute = {}));
    var Player = /** @class */ (function () {
        function Player() {
            this.attributes = new typescript_collections_1.Dictionary();
        }
        Object.defineProperty(Player.prototype, "jerseyNumber", {
            get: function () {
                return this._jerseyNumber;
            },
            set: function (v) {
                this._jerseyNumber = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "primaryPosition", {
            get: function () {
                return this._primaryPosition;
            },
            set: function (v) {
                this._primaryPosition = v;
            },
            enumerable: true,
            configurable: true
        });
        return Player;
    }());
    exports.Player = Player;
});
