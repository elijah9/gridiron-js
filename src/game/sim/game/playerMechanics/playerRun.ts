import { PlayerMechanic } from './playerMechanic';
import { IFieldPoint } from '../iFieldPoint';
import { MathUtils } from '../../../util/mathUtils';
import { Vector2 } from '../../../util/vector';
import { PlayerAttribute } from '../../entities/player';

export class PlayerRun extends PlayerMechanic {

  // a note on how these values were derived:
  // the fastest recorded in-game NFL runs were roughly ~21.5 mph,
  // so i decided to go roughly 22 mph for the max speed
  
  // for the min speed, i calculated the rough ratio of best 40 time
  // to worst 40 time (6.0/4.2) and used it to estimate
  
  // for agility i just completely made it up lmao

  private static readonly MinSpeed = 7.0; // yards per second
  private static readonly MaxSpeed = 11.0; // yards per second
  private static readonly DefaultAgility = 180.0; // degrees per second

  private _destination : IFieldPoint;

  constructor(destination : IFieldPoint) {
    super();
    this._destination = destination;
    this.name = "PlayerRun";
  }

  protected onStart() { }

  protected onTick() { 
    // nudge direction
    let idealDir : number = this._player.getAngleBetween(this._destination);
    let dTheta : number = PlayerMechanic.DeltaT * PlayerRun.DefaultAgility * MathUtils.DegreesToRadians;
    let angleErr : number = this._player.angle - idealDir;
    if(angleErr > dTheta) {
      this._player.angle -= dTheta;
    } else if(angleErr < -dTheta) {
      this._player.angle += dTheta;
    }

    // run
    let dPos : Vector2 = this._player.distanceVec(this._destination);
    let distance : number = dPos.length;
    let speed : number = this._player.player.attributes.getValue(PlayerAttribute.Speed);
    let scaleFactor : number = PlayerMechanic.DeltaT * 
      (PlayerRun.MinSpeed + speed * (PlayerRun.MaxSpeed - PlayerRun.MinSpeed));
    let dPosNorm : Vector2 = dPos.divide(distance).multiply(scaleFactor);
    if(distance <= scaleFactor) {
      // destination already reached
      this.done(false);
      return;
    }
    this._player.set_yards(this._player.yards + dPosNorm.x);
    this._player.set_offset(this._player.offset + dPosNorm.y);
  }
}