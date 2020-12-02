import { PlayerMechanic, MechanicCompleteEventArgs } from './playerMechanic';
import { PlayerRun } from './playerRun';
import { LoggerService } from '../../../../app/services/logger.service';

export class PursueBall extends PlayerMechanic {
  private _run : PlayerRun;

  constructor(logger : LoggerService) {
    super(logger);
    this.name = "PursueBall";
  }

  protected async onStart() {
    this._run = new PlayerRun(this._logger, this._ball);
    this._run.name = "PursueBall->PlayerRun";
    this._run.mechanicComplete.subscribe((e? : MechanicCompleteEventArgs) => {
      e.mechanic.stop();
      this.done(false);
    });

    await this._run.start(this._player, this._team, this._opp, this._ball);
  }
  
  onTick() { }
}