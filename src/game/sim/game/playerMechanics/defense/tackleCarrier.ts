import { PlayerMechanic, MechanicCompleteEventArgs } from '../playerMechanic';
import { PursueBall } from '../pursueBall';

export class TackleCarrier extends PlayerMechanic {

  private static readonly BaseTackleProbability = 1.0;
  
  private _pursuit : PursueBall;

  constructor() {
    super();
    this.name = "TackleCarrier";
  }

  protected async onStart() {
    this._pursuit = new PursueBall();
    this._pursuit.mechanicComplete.subscribe((e? : MechanicCompleteEventArgs) => {
      e.mechanic.stop();
      if(Math.random() <= TackleCarrier.BaseTackleProbability) {
        this.done(true);
      }
    });
    await this._pursuit.start(this._player, this._players, this._ball);
  }

  protected onTick() { }
}