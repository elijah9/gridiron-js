class Field {

  public player : Player = new Player();

  private _friction : number;
  private _gridW : number = 120;
  private _gridH : number = 54;

  constructor(friction : number = 0.9) {
    this._friction = friction;
  }

  public update() {
    this.player.update();

    this.player.vx *= this._friction;
    this.player.vy *= this._friction;

    this.collideObject(this.player);
  }

  private collideObject(object : Player) {
    if(object.x < 0) {
      object.x = 0;
      object.vx = 0;
    } else if(object.x > this._gridW) {
      object.x = this._gridW;
      object.vx = 0;
    }

    if(object.y < 0) {
      object.y = 0;
      object.vy = 0;
    } else if(object.y > this._gridH) {
      object.y = this._gridH;
      object.vy = 0;
    }
  }
}