import { Play } from '../play';
import { Ball } from '../../ball';
import { SnapBall } from '../../playerMechanics/offense/snapBall';
import { Position, DepthRole } from 'src/game/sim/positionPlayer';
import { wait } from 'src/game/util/threadUtils';

export abstract class OffensePlay extends Play {
  readonly snapper : DepthRole;

  protected constructor() {
    super();
    this.snapper = this.initializeRole(Position.C, 1, 0, 0, 0);
  }

  // do not override!!!
  protected async runPlay(ball : Ball) {
    let snapperMechanic = new SnapBall();

    let isSnapping : boolean;
    this.addMechanic(snapperMechanic, () => isSnapping = false);
    isSnapping = true;
    await snapperMechanic.start(this._players.getValue(this.snapper), this._players, ball);

    while (isSnapping) { wait(0); }
    await this.runOffensePlay(ball);
  }

  protected abstract async runOffensePlay(ball : Ball);
}