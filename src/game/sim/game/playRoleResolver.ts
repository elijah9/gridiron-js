import { Dictionary } from 'typescript-collections';
import { GamePlayer } from './gamePlayer';
import { Play } from './plays/play';
import { IDirectionalFieldPoint } from './iFieldPoint';
import { DepthRole, positionGroupContainsRole } from '../positionPlayer';

export interface IPlayRoleResolver {
  resolveRoles(play : Play, players : GamePlayer[]) : Dictionary<DepthRole, GamePlayer>;
}

export class DummyPlayRoleResolver implements IPlayRoleResolver {
  resolveRoles(play : Play, players : GamePlayer[]) : Dictionary<DepthRole, GamePlayer> {
    let positions = new Dictionary<DepthRole, GamePlayer>();
    play.initialPositions.forEach((role : DepthRole, point : IDirectionalFieldPoint) => {
      let found = false;
      for(let player of players) {
        if(positionGroupContainsRole(player.player.primaryPosition, role.role) &&
          !positions.values().includes(player)) {
            positions.setValue(role, player);
            found = true;
            break;
          }
      }
      if(!found) {
        throw new Error("no suitable role player found for " + role.toString());
      }
    });
    return positions;
  }
}