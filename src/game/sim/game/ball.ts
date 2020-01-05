import { FieldPoint, FieldPointEventArgs } from './iFieldPoint';
import { GamePlayer } from './gamePlayer';

export class Ball extends FieldPoint { 
  private _carrier : GamePlayer;
  get carrier() : GamePlayer {
    return this._carrier;
  }
  set carrier(v : GamePlayer) {
    let handler = (e : FieldPointEventArgs) => this.alertPositionChange();
    if(this._carrier != null) {
      this._carrier.positionChanged.unsubscribe(handler)
    }

    this._carrier = v;
    this._carrier.positionChanged.subscribe(handler)
  }
  
  get yards() : number { return this.hasCarrier() ? this.carrier.yards : this._yards; }
  get offset() : number { return this.hasCarrier() ? this.carrier.offset : this._offset; }

  private hasCarrier() : boolean {
    return this.carrier != null;
  }
}