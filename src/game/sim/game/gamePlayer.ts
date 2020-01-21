import { IPlayer } from "../entities/player";
import { DirectionalFieldPoint } from './iFieldPoint';
import { genTestPlayer } from '../../builders/playerBuilder';
import { PositionGroup } from '../positionPlayer';
import { LiteEvent } from 'src/game/util/iLiteEvent';
import { VisionCone } from './playerMechanics/visionCone';

export class GamePlayer extends DirectionalFieldPoint {

  readonly player : IPlayer;
  
  private _onField : boolean;
  get onField() : boolean {
    return this._onField;
  }
  set onField(v : boolean) {
    this._onField = v;
    this.onFieldChanged.trigger(new OnFieldEventArgs(v));
  }

  get visionCone() : VisionCone {
    return new VisionCone(this);
  }

  showVisionCone = false;

  readonly onFieldChanged = new LiteEvent<OnFieldEventArgs>();
  
  constructor(player : IPlayer) { 
    super();
    this.player = player;
  }

  static genTestGamePlayer(position : PositionGroup, 
    number : number, yards : number, offset : number, angle : number) {

    let player = new GamePlayer(genTestPlayer(number, position));
    player.set_yards(yards);
    player.set_offset(offset);
    player.angle = angle;
    return player;
  }
}

export class OnFieldEventArgs {
  readonly onField : boolean;
  constructor(onField : boolean) {
    this.onField = onField;
  }
}