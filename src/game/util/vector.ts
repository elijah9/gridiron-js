interface IVector {
  readonly length : number;
  get(i : number) : number;
}

abstract class Vector implements IVector {
  readonly length : number;
  abstract get(i : number) : number;
}

export class Vector2 extends Vector {
  readonly x : number;
  readonly y : number;
  get length() : number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  constructor(x : number, y : number) {
    super();
    this.x = x;
    this.y = y;
  }

  get(i: number) : number {
    if(i == 0) {
      return this.x;
    } else if(i == 1) {
      return this.y;
    } else {
      return null;
    }
  }

  normalize() : Vector2 {
    let length = this.length;
    return new Vector2(this.x / length, this.y / length);
  }

  add(v : Vector2) : Vector2 {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  multiply(m : number) : Vector2 {
    return new Vector2(this.x * m, this.y * m);
  }

  divide(d : number) : Vector2 {
    return new Vector2(this.x / d, this.y / d);
  }
}