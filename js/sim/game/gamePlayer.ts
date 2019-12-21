export class GamePlayer {

  public colorMain : string = "#ff0000"; // move to Player
  public colorSec : string = "rgba(100, 100, 100)"; // move to Player
  public x : number = 15;
  public y : number = 25;
  public vx : number = 0;
  public vy : number = 0;
  
  constructor() { }

  public moveLeft() {
    this.vx -= 0.1;
  }

  public moveRight() {
    this.vx += 0.1;
  }

  public moveUp() {
    this.vy -= 0.1;
  }

  public moveDown() {
    this.vy += 0.1;
  }

  public update() {
    this.x += this.vx;
    this.y += this.vy;
  }
}