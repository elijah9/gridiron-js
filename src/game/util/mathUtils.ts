export class MathUtils {
  static RadiansToDegrees : number = 180.0 / Math.PI;
  static DegreesToRadians : number = Math.PI / 180.0;

  static clampAngle(angle : number) : number {
    let cycle : number = 2 * Math.PI;
    if(angle < 0) {
      return this.clampAngle(angle + cycle);
    } else if(angle > cycle) {
      return this.clampAngle(angle - cycle);
    } else {
      return angle;
    }
  }

  static randInt(min : number, max : number) : number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}