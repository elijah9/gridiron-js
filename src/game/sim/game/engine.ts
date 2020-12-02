import { LoggerService } from '../../../app/services/logger.service';
export class Engine {
  
  private readonly _log : LoggerService;
  private _elapsed : number = 0;
  private _animationFrameRequest : number;
  private _time : number;
  private _dt : number;
  private _updated : boolean = false;
  private _onTick : Function;
  private _render : Function;

  constructor(dt : number, onTick : Function, render : Function, logger : LoggerService) {
    this._log = logger;
    this._dt = dt;
    this._onTick = onTick;
    this._render = render;
  }

  public handleTick = (timeStamp : number) => {
    this.tick(timeStamp);
  }

  public start() {
    this._elapsed = this._dt;
    this._time = window.performance.now();
    this._animationFrameRequest = window.requestAnimationFrame(this.handleTick);
  }

  public stop() {
    window.cancelAnimationFrame(this._animationFrameRequest); 
  }

  private tick(timeStamp : number) {
    this._elapsed += timeStamp - this._time;
    this._time = timeStamp;

    // roll back if 3 or more frames behind
    if(this._elapsed >= this._dt * 3) {
      this._log.log("rolling back frames...");
      this._elapsed = this._dt;
    }

    // run all the accumulated ticks
    while(this._elapsed >= this._dt) {
      this._elapsed -= this._dt;
      this._onTick(timeStamp);
      this._updated = true;
    }

    // only draw when necessary
    if(this._updated) {
      this._updated = false;
      this._render(timeStamp);
    }

    this._animationFrameRequest = window.requestAnimationFrame(this.handleTick);
  }
}