import Set from "../../node_modules/typescript-collections/dist/lib/Set"
import { PlayerBuilder } from "./playerBuilder";
import { IPlayer } from "../sim/entities/player";
import { ITeam, Team } from "../sim/entities/team";

export class TeamBuilder implements IBuilder<ITeam> {
  public readonly value : ITeam;

  public constructor(nameShort : string) {
    this.value = new Team(nameShort);
  }

  public withPlayer(player : IPlayer) {
    this.value.activeRoster.add(player);
  }

  public withPlayers(players : Set<IPlayer>) {
    players.forEach((player : IPlayer) => { this.value.activeRoster.add(player); })
  }

  public static genTestTeam() : ITeam {
    let builder = new TeamBuilder("TEST");
    builder.withPlayer(PlayerBuilder.genTestPlayer(10, PositionGroup.QB));
    builder.withPlayer(PlayerBuilder.genTestPlayer(20, PositionGroup.RB));
    builder.withPlayer(PlayerBuilder.genTestPlayer(50, PositionGroup.C));
    builder.withPlayer(PlayerBuilder.genTestPlayer(30, PositionGroup.S));
    return builder.value;
  }
}