import { PlayerMechanic, MechanicCompleteEventArgs } from '../playerMechanic';
import { PursueBall } from '../pursueBall';
import { PlayerAttribute } from 'src/game/sim/entities/player';

export class TackleCarrier extends PlayerMechanic {

  private static readonly BaseTackleProbability = 1.0;
  private static readonly BaseTackleThreshold = 0.0;
  
  private _pursuit : PursueBall;

  constructor() {
    super();
    this.name = "TackleCarrier";
  }

  protected async onStart() {
    this._pursuit = new PursueBall();
    this._pursuit.mechanicComplete.subscribe((e? : MechanicCompleteEventArgs) => {
      e.mechanic.stop();
      let roll = TackleCarrier.BaseTackleProbability * Math.random() * this._player.player.attributes.getValue(PlayerAttribute.Tackle);
      if(roll >= TackleCarrier.BaseTackleThreshold) {
        this.done(true);
      }
    });
    await this._pursuit.start(this._player, this._players, this._ball);
  }

  onTick() { }
}