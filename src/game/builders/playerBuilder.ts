import { IPlayer, Player, PlayerAttribute } from "../sim/entities/player";
import { PositionGroup } from '../sim/positionPlayer';
import { Dictionary } from 'typescript-collections';

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

export function genTestPlayer(num : number, position : PositionGroup, 
  attributes : Dictionary<PlayerAttribute, number> = new Dictionary<PlayerAttribute, number>()) : IPlayer {
    
  let builder = new PlayerBuilder();
  builder.withNumber(num);
  builder.withPrimaryPosition(position);
  
  for(let attributeStr in PlayerAttribute) {
    let attribute = <any>PlayerAttribute[attributeStr];
    let attributeVal = attributes.containsKey(attribute) ? attributes.getValue(attribute) : Math.random();
    builder.withAttribute(attribute, attributeVal);
  }
  return builder.value;
}