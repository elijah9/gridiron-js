import { genTestPlayer } from "./playerBuilder";
import { IPlayer, PlayerAttribute } from '../sim/entities/player';
import { ITeam, Team } from "../sim/entities/team";
import { GameTeam } from '../sim/game/gameTeam';
import { PositionGroup } from '../sim/positionPlayer';

export class TeamBuilder implements IBuilder<ITeam> {
  readonly value : ITeam;

  constructor(nameShort : string, colorMain : string, colorSec : string) {
    this.value = new Team(nameShort, colorMain, colorSec);
  }

  withPlayer(player : IPlayer) {
    this.value.activeRoster.push(player);
  }

  withPlayers(players : Set<IPlayer>) {
    players.forEach((player : IPlayer) => { this.value.activeRoster.push(player); })
  }
}

export function genTestTeam() : ITeam {
  let builder = new TeamBuilder("TEST", "rgb(150, 0, 0)", "rgb(0, 0, 0)");
  builder.withPlayer(genTestPlayer(12, PositionGroup.QB));
  builder.withPlayer(genTestPlayer(26, PositionGroup.RB));
  builder.withPlayer(genTestPlayer(46, PositionGroup.FB));
  builder.withPlayer(genTestPlayer(11, PositionGroup.WR));
  builder.withPlayer(genTestPlayer(10, PositionGroup.WR));
  builder.withPlayer(genTestPlayer(87, PositionGroup.TE));
  builder.withPlayer(genTestPlayer(76, PositionGroup.T));
  builder.withPlayer(genTestPlayer(62, PositionGroup.G));
  builder.withPlayer(genTestPlayer(60, PositionGroup.C));
  builder.withPlayer(genTestPlayer(69, PositionGroup.G));
  builder.withPlayer(genTestPlayer(61, PositionGroup.T));

  builder.withPlayer(genTestPlayer(93, PositionGroup.DL));
  builder.withPlayer(genTestPlayer(71, PositionGroup.DL));
  builder.withPlayer(genTestPlayer(70, PositionGroup.DL));
  builder.withPlayer(genTestPlayer(98, PositionGroup.EDGE));
  builder.withPlayer(genTestPlayer(91, PositionGroup.EDGE));
  builder.withPlayer(genTestPlayer(54, PositionGroup.LB));
  builder.withPlayer(genTestPlayer(53, PositionGroup.LB));
  builder.withPlayer(genTestPlayer(24, PositionGroup.CB));
  builder.withPlayer(genTestPlayer(32, PositionGroup.S));
  builder.withPlayer(genTestPlayer(23, PositionGroup.S));
  builder.withPlayer(genTestPlayer(30, PositionGroup.CB));
  return builder.value;
}

export function genTestTeam2() : ITeam {
  let builder = new TeamBuilder("TEST2", "rgb(0, 0, 175)", "rgb(255, 255, 255)");
  builder.withPlayer(genTestPlayer(12, PositionGroup.QB));
  builder.withPlayer(genTestPlayer(26, PositionGroup.RB));
  builder.withPlayer(genTestPlayer(46, PositionGroup.FB));
  builder.withPlayer(genTestPlayer(11, PositionGroup.WR));
  builder.withPlayer(genTestPlayer(10, PositionGroup.WR));
  builder.withPlayer(genTestPlayer(87, PositionGroup.TE));
  builder.withPlayer(genTestPlayer(76, PositionGroup.T));
  builder.withPlayer(genTestPlayer(62, PositionGroup.G));
  builder.withPlayer(genTestPlayer(60, PositionGroup.C));
  builder.withPlayer(genTestPlayer(69, PositionGroup.G));
  builder.withPlayer(genTestPlayer(61, PositionGroup.T));

  builder.withPlayer(genTestPlayer(93, PositionGroup.DL));
  builder.withPlayer(genTestPlayer(71, PositionGroup.DL));
  builder.withPlayer(genTestPlayer(70, PositionGroup.DL));
  builder.withPlayer(genTestPlayer(98, PositionGroup.EDGE));
  builder.withPlayer(genTestPlayer(91, PositionGroup.EDGE));
  builder.withPlayer(genTestPlayer(54, PositionGroup.LB));
  builder.withPlayer(genTestPlayer(53, PositionGroup.LB));
  builder.withPlayer(genTestPlayer(24, PositionGroup.CB));
  builder.withPlayer(genTestPlayer(32, PositionGroup.S));
  builder.withPlayer(genTestPlayer(23, PositionGroup.S));
  builder.withPlayer(genTestPlayer(30, PositionGroup.CB));
  return builder.value;
}