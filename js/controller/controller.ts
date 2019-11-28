class Controller {

  public down : ButtonInput = new ButtonInput();
  public left : ButtonInput = new ButtonInput();
  public right : ButtonInput = new ButtonInput();
  public up : ButtonInput = new ButtonInput();

  constructor() { }

  public onKeyEvent(type : string, keyCode : number) {
    let down = type === "keydown";
    switch(keyCode) {
      case 37:
        this.left.handleInput(down);
        break;
      case 38:
        this.up.handleInput(down);
        break;
      case 39:
        this.right.handleInput(down);
        break;  
      case 40:
        this.down.handleInput(down);
    }
  }
}

class ButtonInput {
  
  public active : boolean = false;
  public down : boolean = false;

  constructor() { }

  public handleInput(down : boolean) {
    if(this.down != down) {
      this.active = down;
    }
    this.down = down;
  }
}