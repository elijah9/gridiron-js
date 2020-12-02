import { PlayerMechanic } from '../playerMechanic';
import { Position } from 'src/game/sim/positionPlayer';
import { LoggerService } from '../../../../../app/services/logger.service';

export class SnapBall extends PlayerMechanic {
  constructor(logger : LoggerService) {
    super(logger);
    this.name = "SnapBall";
  }

  protected onStart() { }

  onTick() {
    if(this._ball.carrier != this._player) {
      throw new Error("center doesn't have the ball, how'd u manage that lol");
    }

    for(let position of this._team.keys()) {
      if(position.role == Position.QB) {
        this._ball.carrier = this._team.get(position);
        this.done(false);
      }
    }
  }
}