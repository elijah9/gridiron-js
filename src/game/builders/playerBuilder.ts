import { IPlayer, Player, PlayerAttribute } from "../sim/entities/player";
import { PositionGroup } from '../sim/positionPlayer';

export class PlayerBuilder implements IBuilder<IPlayer> {
  readonly value : IPlayer;

  constructor() {
    this.value = new Player();
  }

  withNumber(num : number) {
    this.value.jerseyNumber = num;
  }

  withPrimaryPosition(position : PositionGroup) {
    this.value.primaryPosition = position;
  }

  withAttribute(attribute : PlayerAttribute, value : number) {
    this.value.attributes.setValue(attribute, value);
  }
}

export function genTestPlayer(num : number, position : PositionGroup) : IPlayer {
  let builder = new PlayerBuilder();
  builder.withNumber(num);
  builder.withPrimaryPosition(position);
  
  for(let attribute in PlayerAttribute) {
    builder.withAttribute((<any>PlayerAttribute)[attribute], Math.random());
  }
  return builder.value;
}