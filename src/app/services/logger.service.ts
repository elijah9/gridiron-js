import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private _value : string;
  get value() : string { return this._value; }
  private set_value(value : string) {
    if(this._value != value) {
      this._value = value;
    }
  }
  
  log(s : string) {
    console.log(s);
    this.set_value(this.value + "\n" + s);
  }

  constructor() { }
}