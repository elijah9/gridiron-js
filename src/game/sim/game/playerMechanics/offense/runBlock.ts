import { PlayerMechanic, MechanicCompleteEventArgs } from '../playerMechanic';
import { PlayerRun } from '../playerRun';
import { PlayerAttribute } from '../../../entities/player';
import { GamePlayer } from '../../gamePlayer';
import { VisionCone } from '../visionCone';
import { IFieldPoint, FieldPoint } from '../../iFieldPoint';

export class RunBlock extends PlayerMechanic {
  private _run : PlayerRun;
  private _target : IFieldPoint;

  constructor() {
    super();
    this.name = "RunBlock";
  }

  protected async onStart() { 
    this._player.showVisionCone = true;
    this.mechanicComplete.subscribe(() => this._player.showVisionCone = false);
  }
  
  onTick() { 
    this.setTarget(this.findBlockTarget());
  }

  private findBlockTarget() : IFieldPoint {
    // fetch relevant attributes from player
    let attributes : Map<PlayerAttribute, number> = this._player.player.attributes;
    let awareness : number = attributes.get(PlayerAttribute.Awareness);
    let situational : number = attributes.get(PlayerAttribute.Situational);

    // go through all players on field, determine which are visible
    let noticeModifier : number = (1.5 * awareness + 0.5 * situational) / 2;
    let baseNoticeThreshold : number = 0; // it's not that hard to see someone
    //let baseNoticeThreshold : number = 0.2; // it's not that hard to see someone
    let visionCone : VisionCone = this._player.visionCone;
    let visible : GamePlayer[] = [];
    for(let opp of this._opp.values()) {
      if(visionCone.canSee(opp)) {
        let noticeRoll : number = Math.random();
        if(noticeRoll * noticeModifier > baseNoticeThreshold) {
          visible.push(opp);
        }
      }
    }

    // sort visible players by distance weighted by proximity to ball
    let unsorted : [GamePlayer, number][] = [];
    for(let player of visible) {
      unsorted.push([player, player.distance(this._player) + player.distance(this._ball)]);
    }

    let sorted = unsorted.sort((a, b) => {
      let aCast : [GamePlayer, number] = <[GamePlayer, number]>(a);
      let bCast : [GamePlayer, number] = <[GamePlayer, number]>(b);
      let aVal : number = aCast[1];
      let bVal : number = bCast[1];

      return aVal === bVal ? 0 : (aVal >= bVal ? -1 : 1);
    });

    if(sorted.length > 0) {
      return sorted[0][0];
    } else {
      return new FieldPoint(101, this._player.offset);
    }
  }

  private async setTarget(player : IFieldPoint) {
    if(player != this._target) {
      this._target = player;

      if(this._run) {
        this._run.stop();
      }

      this._run = new PlayerRun(this.findBlockTarget());
      this._run.name = "PursueBall->PlayerRun";
      this._run.mechanicComplete.subscribe((e? : MechanicCompleteEventArgs) => {
        e.mechanic.stop();

        // logic for engaging defender

        // successful block
        this._target = null;
        this._run = null;
      });

      await this._run.start(this._player, this._team, this._opp, this._ball);
    }
  }
}