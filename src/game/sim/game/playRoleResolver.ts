import { GamePlayer } from './gamePlayer';
import { Play } from './plays/play';
import { IDirectionalFieldPoint } from './iFieldPoint';
import { DepthRole, positionGroupContainsRole } from '../positionPlayer';
import { hasValue } from '../../util/dataStructures';

export interface IPlayRoleResolver {
  resolveRoles(play : Play, players : GamePlayer[]) : Map<DepthRole, GamePlayer>;
}

export class DummyPlayRoleResolver implements IPlayRoleResolver {
  resolveRoles(play : Play, players : GamePlayer[]) : Map<DepthRole, GamePlayer> {
    let positions = new Map<DepthRole, GamePlayer>();
    play.initialPositions.forEach((point : IDirectionalFieldPoint, role : DepthRole) => {
      let found = false;
      for(let player of players) {
        if(positionGroupContainsRole(player.player.primaryPosition, role.role) 
          && !hasValue(positions, player)) {

          positions.set(role, player);
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