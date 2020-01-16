import { genTestPlayer } from "./playerBuilder";
import { IPlayer, PlayerAttribute } from '../sim/entities/player';
import { ITeam, Team } from "../sim/entities/team";
import { GameTeam } from '../sim/game/gameTeam';
import { PositionGroup } from '../sim/positionPlayer';
import { Dictionary } from 'typescript-collections';

export class TeamBuilder implements IBuilder<ITeam> {
  readonly value : ITeam;

  constructor(nameShort : string, colorMain : string, colorSec : string) {
    this.value = new Team(nameShort, colorMain, colorSec);
  }

  withPlayer(player : IPlayer) {
    this.value.activeRoster.add(player);
  }

  withPlayers(players : Set<IPlayer>) {
    players.forEach((player : IPlayer) => { this.value.activeRoster.add(player); })
  }
}

export function genTestTeam() : ITeam {
  let builder = new TeamBuilder("TEST", "rgb(150, 0, 0)", "rgb(0, 0, 0)");
  builder.withPlayer(genTestPlayer(10, PositionGroup.QB));
  builder.withPlayer(genTestPlayer(20, PositionGroup.RB));
  builder.withPlayer(genTestPlayer(50, PositionGroup.C));

  let attr30 = new Dictionary<PlayerAttribute, number>();
  attr30.setValue(PlayerAttribute.Speed, 1);
  builder.withPlayer(genTestPlayer(30, PositionGroup.S, attr30));
  return builder.value;
}

export function genTestTeam2() : ITeam {
  let builder = new TeamBuilder("TEST2", "rgb(0, 0, 175)", "rgb(255, 255, 255)");
  builder.withPlayer(genTestPlayer(10, PositionGroup.QB));

  let attr20 = new Dictionary<PlayerAttribute, number>();
  attr20.setValue(PlayerAttribute.Speed, 0.1);
  builder.withPlayer(genTestPlayer(20, PositionGroup.RB, attr20));

  builder.withPlayer(genTestPlayer(50, PositionGroup.C));
  builder.withPlayer(genTestPlayer(30, PositionGroup.S));
  return builder.value;
}