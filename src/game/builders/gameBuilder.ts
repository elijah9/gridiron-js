import { GameSim } from '../sim/game/gameSim';
import { GameTeam } from '../sim/game/gameTeam';
import { genTestTeam, genTestTeam2 } from './teamBuilder';

export class GameBuilder implements IBuilder<GameSim> {
  readonly value : GameSim;

  constructor(home : GameTeam, away : GameTeam) {
    this.value = new GameSim(home, away);
  }
}

export function genTestGame() : GameSim {
  let home = new GameTeam(genTestTeam());
  let away = new GameTeam(genTestTeam2());
  let builder = new GameBuilder(home, away);
  return builder.value;
}