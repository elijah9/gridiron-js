import { GamePlayer } from './gamePlayer';
import { ITeam } from '../entities/team';
import { IPlayer } from '../entities/player';

export class GameTeam {
  readonly team : ITeam;
  readonly players : GamePlayer[] = [];

  constructor(team : ITeam) {
    this.team = team;
    team.activeRoster.forEach((player : IPlayer) => {
      this.players.push(new GamePlayer(player));
    });
  }
}