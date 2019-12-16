var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../../../node_modules/typescript-collections/dist/lib/Dictionary"], function (require, exports, Dictionary_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Dictionary_1 = __importDefault(Dictionary_1);
    var PlayerAttribute;
    (function (PlayerAttribute) {
        PlayerAttribute[PlayerAttribute["Speed"] = 0] = "Speed";
    })(PlayerAttribute = exports.PlayerAttribute || (exports.PlayerAttribute = {}));
    var Player = /** @class */ (function () {
        function Player() {
            this.attributes = new Dictionary_1.default();
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
