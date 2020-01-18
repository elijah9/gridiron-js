import { LiteEvent } from 'src/game/util/iLiteEvent';
import { GamePlayer } from '../gamePlayer';
import { Ball } from '../ball';
import { DepthRole } from '../../positionPlayer';

export abstract class PlayerMechanic {
  name : string; // optional but can be useful for debugging

  private static readonly TicksPerSecond = 30;
  static readonly DeltaT = 1 / PlayerMechanic.TicksPerSecond;

  readonly mechanicComplete = new LiteEvent<MechanicCompleteEventArgs>();

  protected _player : GamePlayer;
  protected _players : Map<DepthRole, GamePlayer>;
  protected _ball : Ball;
  protected _isRunning = false;
  private _timerHandle : number;

  async start(player : GamePlayer, players : Map<DepthRole, GamePlayer>, ball : Ball) {
    if(!this._isRunning) {
      this._player = player;
      this._players = players;
      this._ball = ball;

      this.onStart();

      //console.log(`mechanic ${this.name} starting...`);
      this._isRunning = true;
      this.startMechanic();
    }
  }

  public stop() {
    if(this._isRunning) {
      window.clearInterval(this._timerHandle);
      this._isRunning = false;
      //console.log(`mechanic ${this.name} stopped`);
    }
  }

  protected done(playOver : boolean) {
    this.mechanicComplete.trigger(new MechanicCompleteEventArgs(this, playOver));
  }

  private startMechanic() {
    this._timerHandle = window.setInterval(() => {
      this.onTick()
    }, 1000 * PlayerMechanic.DeltaT);
  }

  protected abstract onStart();
  abstract onTick();
}

export class MechanicCompleteEventArgs {
  readonly mechanic : PlayerMechanic;
  readonly playOver : boolean;
  constructor(mechanic : PlayerMechanic, playOver : boolean) {
    this.mechanic = mechanic;
    this.playOver = playOver;
  }
}