import { GamePlayer } from '../gamePlayer';
import { PlayerAttribute } from '../../entities/player';
import { MathUtils, lusolve } from '../../../util/mathUtils';
import { fieldYardsMin, fieldYardsMax, fieldOffsetMin, fieldOffsetMax } from '../field';
import { IFieldPoint, FieldPoint } from '../iFieldPoint';
import { Vector2 } from 'src/game/util/vector';
import { Logger } from '../../../util/logger';

export class VisionCone {

  private _leftIntersection : IFieldPoint;
  get leftIntersection() : IFieldPoint { return this._leftIntersection; }
  private set_leftIntersection(leftIntersection : IFieldPoint) {
    if(this._leftIntersection != leftIntersection) {
      this._leftIntersection = leftIntersection;
    }
  }

  private _rightIntersection : IFieldPoint;
  get rightIntersection() : IFieldPoint { return this._rightIntersection; }
  private set_rightIntersection(rightIntersection : IFieldPoint) {
    if(this._rightIntersection != rightIntersection) {
      this._rightIntersection = rightIntersection;
    }
  }

  private _player : GamePlayer;

  constructor(player : GamePlayer) {
    this._player = player;
    this.calculateVision();
  }

  canSee(point : IFieldPoint) : boolean {
    let leftDist : Vector2 = this.leftIntersection.distanceVec(this._player);
    let rightDist : Vector2 = this.rightIntersection.distanceVec(this._player);
    let pointDist : Vector2 = point.distanceVec(this._player);
    let lhs = [[leftDist.x, rightDist.x], [leftDist.y, rightDist.y]];
    let rhs = [pointDist.x, pointDist.y];
    let solution = lusolve(lhs, rhs); 

    // if the mapping is negative, can't see
    for(let coord of solution) {
      if(coord < 0) {
        return false;
      }
    }
    return true;
  }
  
  private calculateVision() {
    // fetch relevant attributes from player
    let attributes : Map<PlayerAttribute, number> = this._player.player.attributes;
    let awareness : number = attributes.get(PlayerAttribute.Awareness);
    let vision : number = attributes.get(PlayerAttribute.Vision);
    
    // calculate angle in either direction the player can notice another player
    let visionModifier : number = (1.0 * awareness + 1.5 * vision) / 2.5;
    let baseFov = Math.PI / 3; // radians 
    let fov : number = Math.min(Math.PI, visionModifier * baseFov);

    // calculate boundaries of field intersecting with vision cone
    this.set_leftIntersection(this.calculateIntersection(this._player.angle + fov));
    this.set_rightIntersection(this.calculateIntersection(this._player.angle - fov));
  }

  private calculateIntersection(angle : number) : IFieldPoint {
    angle = MathUtils.clampAngle(angle);
    let dir = new FieldPoint(this._player.yards + Math.cos(angle), this._player.offset + Math.sin(angle));
    
    // extend ray until one of the boundaries intersected
    while(this.inBounds(dir)) {
      dir.set_yards(dir.yards + Math.cos(angle));
      dir.set_offset(dir.offset + Math.sin(angle));
    }

    return dir;
  }

  private inBounds(point : IFieldPoint) : boolean {
    return point.yards >= fieldYardsMin && point.yards <= fieldYardsMax
      && point.offset >= fieldOffsetMin && point.offset <= fieldOffsetMax;
  }
}