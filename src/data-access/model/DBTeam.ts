export class DBTeam {
  teamID : number;
  nameShort : string;
  nameFirst : string;
  nameLast : string;
  colorMain : string;
  colorSec : string;
  conference : string;
  division : string;

  toString() : string {
    return `${this.teamID}: ${this.nameFirst} ${this.nameLast} (${this.nameShort})`;
  }
}