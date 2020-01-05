import { Vector2 } from '../../util/vector';
import { LiteEvent } from '../../util/iLiteEvent';
import { MathUtils } from '../../util/mathUtils';

export interface IFieldPoint {
  readonly yards : number;
  readonly offset : number;
  distanceVec(point : IFieldPoint) : Vector2;
  distance(point : IFieldPoint) : number;
}

export interface IDirectionalFieldPoint extends IFieldPoint {
  readonly angle : number;
  readonly angleDegrees : number;
  getAngleBetween(point : IFieldPoint) : number;
  isFacing(point : IFieldPoint) : boolean;
}

export class FieldPoint implements IFieldPoint {
  protected _yards : number;
  get yards() : number { return this._yards; }
  set_yards(yards : number) { 
    this._yards = yards;
    this.alertPositionChange();
  }

  protected _offset : number;
  get offset() : number { return this._offset; }
  set_offset(offset : number) {
    this._offset = offset;
    this.alertPositionChange();
  }

  readonly positionChanged = new LiteEvent<FieldPointEventArgs>();

  constructor(x? : number, y? : number) {
    this.set_yards(x);
    this.set_offset(y);
  }

  distanceVec(point : IFieldPoint) : Vector2 {
    return new Vector2(point.yards - this.yards, point.offset - this.offset);
  }

  distance(point : IFieldPoint) : number {
    return this.distanceVec(point).length;
  }

  protected alertPositionChange() {
    this.positionChanged.trigger(new FieldPointEventArgs(this));
  }
}

export class DirectionalFieldPoint extends FieldPoint implements IDirectionalFieldPoint {
  private static readonly DirectionThreshold : number = 0.5; // tolerance = 0.5 degrees
  
  private _angle : number;
  get angle() : number {
    return this._angle;
  }
  set angle(v : number) {
    this._angle = v;
    this._angleDegrees = this._angle * MathUtils.RadiansToDegrees;
  }

  private _angleDegrees : number;
  get angleDegrees() : number {
    return this._angleDegrees;
  }

  constructor(x? : number, y? : number, angle? : number) {
    super(x, y);
    this.angle = angle;
  }

  getAngleBetween(point : IFieldPoint) {
    let destDir : Vector2 = this.distanceVec(point).normalize();
    return MathUtils.clampAngle(Math.atan(destDir.y / destDir.x) - this.angle);
  }

  isFacing(point : IFieldPoint) {
    let threshold : number = MathUtils.DegreesToRadians * DirectionalFieldPoint.DirectionThreshold;
    return Math.abs(this.getAngleBetween(point)) < threshold;
  }
  
}

export class FieldPointEventArgs {
  readonly point : IFieldPoint;
  constructor(point : IFieldPoint) {
    this.point = point;
  }
}