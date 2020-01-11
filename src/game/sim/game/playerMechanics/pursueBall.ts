import { PlayerMechanic, MechanicCompleteEventArgs } from './playerMechanic';
import { PlayerRun } from './playerRun';

export class PursueBall extends PlayerMechanic {
  private _run : PlayerRun;

  constructor() {
    super();
    this.name = "PursueBall";
  }

  protected async onStart() {
    this._run = new PlayerRun(this._ball);
    this._run.name = "PursueBall->PlayerRun";
    this._run.mechanicComplete.subscribe((e? : MechanicCompleteEventArgs) => {
      e.mechanic.stop();
      this.done(false);
    });

    await this._run.start(this._player, this._players, this._ball);
  }
  
  onTick() { }
}