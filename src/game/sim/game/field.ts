export class Field {
  readonly friction : number;
  readonly gridW : number = 120;
  readonly gridH : number = 54;

  constructor(friction : number = 0.9) {
    this.friction = friction;
  }
}