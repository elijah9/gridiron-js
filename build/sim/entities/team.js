define(["require", "exports", "typescript-collections"], function (require, exports, typescript_collections_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Team = /** @class */ (function () {
        function Team(nameShort) {
            this.activeRoster = new typescript_collections_1.Set();
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
