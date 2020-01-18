import { OffensePlay } from "./offensePlay";
import { Ball } from '../../ball';
import { GamePlayer } from '../../gamePlayer';
import { PlayerRun } from '../../playerMechanics/playerRun';
import { FieldPoint } from '../../iFieldPoint';
import { Position } from 'src/game/sim/positionPlayer';
import { has } from '../../../../util/dataStructures';

export class TestOffensePlay extends OffensePlay {
  constructor() {
    super();
    this.initializeRole(Position.QB, 1, -1.5, 0, 0);
    this.initializeRole(Position.FB, 1, -5, 0, 0);
    this.initializeRole(Position.RB, 1, -10, 0, 0);
    this.initializeRole(Position.WR, 1, -2, -10, 0);
    this.initializeRole(Position.WR, 1, 0, 10, 0);
    this.initializeRole(Position.TE, 1, 0, 4.5, 0);
    this.initializeRole(Position.LT, 1, 0, -3, 0);
    this.initializeRole(Position.LG, 1, 0, -1.5, 0);
    this.initializeRole(Position.RG, 1, 0, 1.5, 0);
    this.initializeRole(Position.RT, 1, 0, 3, 0);
  }

  // qb sneak for now
  protected async runOffensePlay(ball : Ball) {
    for(let role of this._players.keys()) {
      let player : GamePlayer = this._players.get(role);
      let run = new PlayerRun(new FieldPoint(100, player.offset));
      run.name = player.player.jerseyNumber.toString() + " run";
      this.addMechanic(run);
      await run.start(player, this._players, ball);
    }
  }
}