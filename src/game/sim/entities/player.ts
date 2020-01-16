import { Dictionary } from "typescript-collections"
import { PositionGroup } from '../positionPlayer';

export enum PlayerAttribute {
  Speed, Tackle
}

export interface IPlayer {
  jerseyNumber : number;
  primaryPosition : PositionGroup;
  readonly attributes : Dictionary<PlayerAttribute, number>;
}

export class Player implements IPlayer {

  private _jerseyNumber : number;
  public get jerseyNumber() : number {
    return this._jerseyNumber;
  }
  public set jerseyNumber(v : number) {
    this._jerseyNumber = v;
  }
  
  private _primaryPosition : PositionGroup;
  public get primaryPosition() : PositionGroup {
    return this._primaryPosition;
  }
  public set primaryPosition(v : PositionGroup) {
    this._primaryPosition = v;
  }
  
  public readonly attributes : Dictionary<PlayerAttribute, number> = new Dictionary<PlayerAttribute, number>();
}

