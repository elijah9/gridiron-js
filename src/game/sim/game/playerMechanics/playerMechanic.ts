import { LiteEvent } from 'src/game/util/iLiteEvent';
import { GamePlayer } from '../gamePlayer';
import { Ball } from '../ball';
import { DepthRole } from '../../positionPlayer';
import { LoggerService } from '../../../../app/services/logger.service';

export abstract class PlayerMechanic {
  name : string; // optional but can be useful for debugging

  private static readonly TicksPerSecond = 30;
  static readonly DeltaT = 1 / PlayerMechanic.TicksPerSecond;

  readonly mechanicComplete = new LiteEvent<MechanicCompleteEventArgs>();

  protected readonly _logger : LoggerService;
  protected _player : GamePlayer;
  protected _team : Map<DepthRole, GamePlayer>;
  protected _opp : Map<DepthRole, GamePlayer>;
  protected _ball : Ball;
  protected _isRunning = false;
  private _timerHandle : number;

  protected constructor(logger : LoggerService) {
    this._logger = logger;
  }

  async start(player : GamePlayer, team : Map<DepthRole, GamePlayer>, 
    opp : Map<DepthRole, GamePlayer>, ball : Ball, showCone = false) {

    if(!this._isRunning) {
      this._player = player;
      this._team = team;
      this._opp = opp;
      this._ball = ball;

      if(showCone) {
        this._player.showVisionCone = true;
        this.mechanicComplete.subscribe(() => this._player.showVisionCone = false);
      }
      this.onStart();

      //Logger.log(`mechanic ${this.name} starting...`);
      this._isRunning = true;
      this.startMechanic();
    }
  }

  public stop() {
    if(this._isRunning) {
      window.clearInterval(this._timerHandle);
      this._isRunning = false;
      //Logger.log(`mechanic ${this.name} stopped`);
    }
  }

  protected done(playOver : boolean) {
    this.mechanicComplete.trigger(new MechanicCompleteEventArgs(this, playOver));
  }

  private showCone() {
    this._player.showVisionCone = true;
    this.mechanicComplete.subscribe(() => this._player.showVisionCone = false);
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