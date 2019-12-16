import Set from "../../../node_modules/typescript-collections/dist/lib/Set"
import { IPlayer } from "./player";

export interface ITeam {
  readonly nameShort : string;
  readonly activeRoster : Set<IPlayer>;
}

export class Team implements ITeam {
  
  private _nameShort : string;
  public get nameShort() : string {
    return this._nameShort;
  }
  public set nameShort(v : string) {
    this._nameShort = v;
  }
  
  public readonly activeRoster : Set<IPlayer> = new Set<IPlayer>();

  public constructor(nameShort : string) {
    this.nameShort = nameShort;
  }

}