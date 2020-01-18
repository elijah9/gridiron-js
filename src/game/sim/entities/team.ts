import { IPlayer } from "./player";

export interface ITeam {
  readonly nameShort : string;
  readonly activeRoster : IPlayer[];
  readonly colorMain : string;
  readonly colorSec : string;
}

export class Team implements ITeam {
  
  private _nameShort : string;
  get nameShort() : string {
    return this._nameShort;
  }
  set nameShort(v : string) {
    this._nameShort = v;
  }
  
  readonly activeRoster : IPlayer[] = [];
  
  private _colorMain : string;
  get colorMain() : string {
    return this._colorMain;
  }
  set colorMain(v : string) {
    this._colorMain = v;
  }
  
  private _colorSec : string;
  get colorSec() : string {
    return this._colorSec;
  }
  set colorSec(v : string) {
    this._colorSec = v;
  }

  constructor(nameShort : string, colorMain : string, colorSec : string) {
    this.nameShort = nameShort;
    this.colorMain = colorMain;
    this.colorSec = colorSec;
  }
}