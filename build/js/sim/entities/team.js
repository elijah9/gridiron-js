var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../../../node_modules/typescript-collections/dist/lib/Set"], function (require, exports, Set_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Set_1 = __importDefault(Set_1);
    var Team = /** @class */ (function () {
        function Team(nameShort) {
            this.activeRoster = new Set_1.default();
            this.nameShort = nameShort;
        }
        Object.defineProperty(Team.prototype, "nameShort", {
            get: function () {
                return this._nameShort;
            },
            set: function (v) {
                this._nameShort = v;
            },
            enumerable: true,
            configurable: true
        });
        return Team;
    }());
    exports.Team = Team;
});
