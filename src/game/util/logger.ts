export class Logger {
  private static _value : string;
  static get value() : string { return this._value; }
  private static set_value(value : string) {
    if(this._value != value) {
      this._value = value;
    }
  }
  
  static log(s : string) {
    console.log(s);
    Logger.set_value(Logger.value + "\n" + s);
  }
}