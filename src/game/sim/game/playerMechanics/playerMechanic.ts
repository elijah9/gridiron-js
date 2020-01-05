import { LiteEvent } from 'src/game/util/iLiteEvent';
import { GamePlayer } from '../gamePlayer';
import { Dictionary } from 'typescript-collections';
import { Ball } from '../ball';
import { DepthRole } from '../../positionPlayer';

export abstract class PlayerMechanic {
  name : string; // optional but can be useful for debugging

  private static readonly TicksPerSecond = 30;
  protected static readonly DeltaT = 1 / PlayerMechanic.TicksPerSecond;

  readonly mechanicComplete = new LiteEvent<MechanicCompleteEventArgs>();

  protected _player : GamePlayer;
  protected _players : Dictionary<DepthRole, GamePlayer>;
  protected _ball : Ball;
  protected _isRunning = false;
  private _timerHandle : number;

  async start(player : GamePlayer, players : Dictionary<DepthRole, GamePlayer>, ball : Ball) {
    if(!this._isRunning) {
      this._player = player;
      this._players = players;
      this._ball = ball;

      this.onStart();

      this._timerHandle = await new Promise(() => window.setTimeout(this.onTick(), 1000 / PlayerMechanic.DeltaT));
      this._isRunning = true;
      console.log(`mechanic ${this.name} started`);
    }
  }

  public stop() {
    if(this._isRunning) {
      window.clearTimeout(this._timerHandle);
      this._isRunning = false;
      console.log(`mechanic ${this.name} stopped`);
    }
  }

  protected done(playOver : boolean) {
    this.mechanicComplete.trigger(new MechanicCompleteEventArgs(this, playOver));
  }

  protected abstract onStart();
  protected abstract onTick();
}

export class MechanicCompleteEventArgs {
  readonly mechanic : PlayerMechanic;
  readonly playOver : boolean;
  constructor(mechanic : PlayerMechanic, playOver : boolean) {
    this.mechanic = mechanic;
    this.playOver = playOver;
  }
}