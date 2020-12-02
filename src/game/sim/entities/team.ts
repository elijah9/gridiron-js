import { IPlayer } from "./player";
import { Conference, Division } from './league';

export interface ITeam {
  readonly nameShort : string;
  readonly nameFirst : string;
  readonly nameLast : string;
  readonly activeRoster : IPlayer[];
  readonly colorMain : string;
  readonly colorSec : string;
}

export class Team implements ITeam {
  
  readonly nameShort : string;
  readonly nameFirst : string;
  readonly nameLast : string;
  
  readonly activeRoster : IPlayer[] = [];
  
  readonly colorMain : string;
  readonly colorSec : string;

  readonly conference : Conference;
  readonly division : Division;

  constructor(nameShort : string, colorMain : string, colorSec : string) {
    this.nameShort = nameShort;
    this.colorMain = colorMain;
    this.colorSec = colorSec;
  }
}