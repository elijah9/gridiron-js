import { PlayerMechanic } from '../playerMechanic';
import { Position } from 'src/game/sim/positionPlayer';

export class SnapBall extends PlayerMechanic {
  constructor() {
    super();
    this.name = "SnapBall";
  }

  protected onStart() { }

  onTick() {
    if(this._ball.carrier != this._player) {
      throw new Error("center doesn't have the ball, how'd u manage that lol");
    }

    for(let position of this._players.keys()) {
      if(position.role == Position.QB) {
        this._ball.carrier = this._players.get(position);
        this.done(false);
      }
    }
  }
}