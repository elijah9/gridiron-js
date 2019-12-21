import { Field } from "./field";

export class GameSim {
  public field : Field = new Field();
  
  public update() {
    this.field.update();
  }
}

