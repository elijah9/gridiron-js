import { Play } from '../play';
import { MathUtils } from '../../../../util/mathUtils';
import { Ball } from '../../ball';
import { TackleCarrier } from '../../playerMechanics/defense/tackleCarrier';
import { Position } from 'src/game/sim/positionPlayer';
import { LoggerService } from '../../../../../app/services/logger.service';

export class TestDefensePlay extends Play {
  constructor(logger : LoggerService) {
    super(logger);
    this.initializeRole(Position.FS, 1, MathUtils.randInt(0, 20), MathUtils.randInt(-10, 10), 180);
  }

  async runPlay(ball : Ball) {
    this._logger.log("starting defense play...");

    let tackle = new TackleCarrier(this._logger);
    this.addMechanic(tackle);
    await tackle.start(this._team.values().next().value, this._team, this._opp, ball, true);
  }
}