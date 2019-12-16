import { IPlayer, Player, PlayerAttribute } from "../sim/entities/player";

export class PlayerBuilder implements IBuilder<IPlayer> {
  public readonly value : IPlayer;

  public constructor() {
    this.value = new Player();
  }

  public withNumber(num : number) {
    this.value.jerseyNumber = num;
  }

  public withPrimaryPosition(position : PositionGroup) {
    this.value.primaryPosition = position;
  }

  public withAttribute(attribute : PlayerAttribute, value : number) {
    this.value.attributes.setValue(attribute, value);
  }

  public static genTestPlayer(num : number, position : PositionGroup) : IPlayer {
    let builder = new PlayerBuilder();
    builder.withNumber(num);
    builder.withPrimaryPosition(position);
    
    for(let attribute in PlayerAttribute) {
      builder.withAttribute((<any>PlayerAttribute)[attribute], Math.random());
    }
    return builder.value;
  }
}