define(["require", "exports", "./playerBuilder", "../sim/entities/team"], function (require, exports, playerBuilder_1, team_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TeamBuilder = /** @class */ (function () {
        function TeamBuilder(nameShort) {
            this.value = new team_1.Team(nameShort);
        }
        TeamBuilder.prototype.withPlayer = function (player) {
            this.value.activeRoster.add(player);
        };
        TeamBuilder.prototype.withPlayers = function (players) {
            var _this = this;
            players.forEach(function (player) { _this.value.activeRoster.add(player); });
        };
        TeamBuilder.genTestTeam = function () {
            var builder = new TeamBuilder("TEST");
            builder.withPlayer(playerBuilder_1.PlayerBuilder.genTestPlayer(10, PositionGroup.QB));
            builder.withPlayer(playerBuilder_1.PlayerBuilder.genTestPlayer(20, PositionGroup.RB));
            builder.withPlayer(playerBuilder_1.PlayerBuilder.genTestPlayer(50, PositionGroup.C));
            builder.withPlayer(playerBuilder_1.PlayerBuilder.genTestPlayer(30, PositionGroup.S));
            return builder.value;
        };
        return TeamBuilder;
    }());
    exports.TeamBuilder = TeamBuilder;
});
