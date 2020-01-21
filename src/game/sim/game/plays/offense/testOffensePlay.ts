import { OffensePlay } from "./offensePlay";
import { Ball } from '../../ball';
import { GamePlayer } from '../../gamePlayer';
import { PlayerRun } from '../../playerMechanics/playerRun';
import { FieldPoint } from '../../iFieldPoint';
import { Position } from 'src/game/sim/positionPlayer';
import { RunBlock } from '../../playerMechanics/offense/runBlock';

export class TestOffensePlay extends OffensePlay {
  constructor() {
    super();
    this.initializeRole(Position.QB, 1, -1.5, 0, 0);
    this.initializeRole(Position.FB, 1, -5, 0, 0);
    this.initializeRole(Position.RB, 1, -10, 0, 0);
    this.initializeRole(Position.WR, 1, -2, -10, 0);
    this.initializeRole(Position.WR, 2, 0, 10, 0);
    this.initializeRole(Position.TE, 1, 0, 4.5, 0);
    this.initializeRole(Position.LT, 1, 0, -3, 0);
    this.initializeRole(Position.LG, 1, 0, -1.5, 0);
    this.initializeRole(Position.RG, 1, 0, 1.5, 0);
    this.initializeRole(Position.RT, 1, 0, 3, 0);
  }

  // qb sneak for now
  protected async runOffensePlay(ball : Ball) {
    for(let role of this._team.keys()) {
      switch(role.role) {
        case Position.QB:
          let qb : GamePlayer = this._team.get(role);
          let run = new PlayerRun(new FieldPoint(100, qb.offset));
          run.name = qb.player.jerseyNumber.toString() + " run";
          this.addMechanic(run);
          await run.start(qb, this._team, this._opp, ball);
          break;
        case Position.C:
          let c : GamePlayer = this._team.get(role);
          let block = new RunBlock();
          block.name = c.player.jerseyNumber.toString() + " block";
          this.addMechanic(block);
          await block.start(c, this._team, this._opp, ball);
          break;
        default:
          break;
      }
    }
  }
}