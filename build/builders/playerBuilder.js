define(["require", "exports", "../sim/entities/player"], function (require, exports, player_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PlayerBuilder = /** @class */ (function () {
        function PlayerBuilder() {
            this.value = new player_1.Player();
        }
        PlayerBuilder.prototype.withNumber = function (num) {
            this.value.jerseyNumber = num;
        };
        PlayerBuilder.prototype.withPrimaryPosition = function (position) {
            this.value.primaryPosition = position;
        };
        PlayerBuilder.prototype.withAttribute = function (attribute, value) {
            this.value.attributes.setValue(attribute, value);
        };
        PlayerBuilder.genTestPlayer = function (num, position) {
            var builder = new PlayerBuilder();
            builder.withNumber(num);
            builder.withPrimaryPosition(position);
            for (var attribute in player_1.PlayerAttribute) {
                builder.withAttribute(player_1.PlayerAttribute[attribute], Math.random());
            }
            return builder.value;
        };
        return PlayerBuilder;
    }());
    exports.PlayerBuilder = PlayerBuilder;
});
