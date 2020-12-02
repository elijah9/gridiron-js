import { Play } from '../play';
import { Ball } from '../../ball';
import { SnapBall } from '../../playerMechanics/offense/snapBall';
import { Position, DepthRole } from 'src/game/sim/positionPlayer';
import { waitFor } from 'src/game/util/threadUtils';
import { PlayerMechanic } from '../../playerMechanics/playerMechanic';
import { LoggerService } from '../../../../../app/services/logger.service';

export abstract class OffensePlay extends Play {
  readonly snapper : DepthRole;

  protected constructor(logger : LoggerService) {
    super(logger);
    this.snapper = this.initializeRole(Position.C, 1, 0, 0, 0);
  }

  // do not override!!!
  async runPlay(ball : Ball) {
    let snapperMechanic = new SnapBall(this._logger);

    let isSnapping = false;
    this.addMechanic(snapperMechanic, () => isSnapping = false);
    await snapperMechanic.start(this._team.get(this.snapper), this._team, this._opp, ball);
    waitFor(() => !isSnapping, () => this.runOffensePlay(ball), PlayerMechanic.DeltaT);
  }

  protected abstract async runOffensePlay(ball : Ball);
}