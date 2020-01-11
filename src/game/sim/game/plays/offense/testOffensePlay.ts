import { OffensePlay } from "./offensePlay";
import { Ball } from '../../ball';
import { GamePlayer } from '../../gamePlayer';
import { PlayerRun } from '../../playerMechanics/playerRun';
import { FieldPoint } from '../../iFieldPoint';
import { Position } from 'src/game/sim/positionPlayer';

export class TestOffensePlay extends OffensePlay {
  constructor() {
    super();
    this.initializeRole(Position.QB, 1, -5, 0, 0);
    this.initializeRole(Position.RB, 1, -10, 0, 0);
  }

  protected async runOffensePlay(ball : Ball) {
    for(let role of this._players.keys()) {
      if(role == this.snapper) {
        continue;
      }

      let player : GamePlayer = this._players.getValue(role);
      let run = new PlayerRun(new FieldPoint(100, player.offset));
      run.name = player.player.jerseyNumber.toString() + " run";
      this.addMechanic(run);
      await run.start(player, this._players, ball);
    }
  }
}