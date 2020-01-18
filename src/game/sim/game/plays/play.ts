import { IDirectionalFieldPoint, DirectionalFieldPoint } from '../iFieldPoint';
import { LiteEvent } from "../../../util/iLiteEvent";
import { MathUtils } from "../../../util/mathUtils";
import { GamePlayer } from '../gamePlayer';
import { Ball } from '../ball';
import { PlayerMechanic, MechanicCompleteEventArgs } from '../playerMechanics/playerMechanic';
import { DepthRole as DepthRole, Position } from '../../positionPlayer';

export abstract class Play {

  readonly initialPositions = new Map<DepthRole, IDirectionalFieldPoint>();

  protected _players : Map<DepthRole, GamePlayer>;
  private _activeMechanics : PlayerMechanic[];
  private _isRunning = false;

  readonly playOver = new LiteEvent<Play>();
  
  protected initializeRole(position : Position, posDepth : number, depth : number,
    offset : number, angle : number) : DepthRole {

    let role = new DepthRole(position, posDepth);
    this.initialPositions.set(role, new DirectionalFieldPoint(depth, offset,
      angle * MathUtils.DegreesToRadians));
    return role;
  }

  initialize(players : Map<DepthRole, GamePlayer>, startLine : number) {
    this._players = players;
    this._activeMechanics = [];
    this.initializePlayerLocations(startLine);
    for(let player of players.values()) {
      player.onField = true;
    }
  }

  protected addMechanic(mechanic : PlayerMechanic, beforeStopping? : Function) {
    mechanic.mechanicComplete.subscribe((e? : MechanicCompleteEventArgs) => {
      if(beforeStopping != null) {
        beforeStopping();
      }

      if(e.playOver) {
        this.stop();
        return;
      }

      mechanic.stop();
      this._activeMechanics;
    });
    this._activeMechanics.push(mechanic);
  }

  private initializePlayerLocations(startLine : number) {
    for(let role of this.initialPositions.keys()) {
      let point : IDirectionalFieldPoint = this.initialPositions.get(role);
      let player : GamePlayer = this._players.get(role);
      player.set_yards(point.yards + startLine);
      player.set_offset(point.offset);
      player.angle = point.angle;
    }
  }

  async start(ball : Ball) {
    this._isRunning = true;
    this.runPlay(ball);
  }

  stop() {
    // console.log("stopping play");
    // console.log(this);
    this._activeMechanics.forEach(mechanic => {
      mechanic.stop();
    });

    if(this._isRunning) {
      this._isRunning = false;
      this.playOver.trigger(this);
    }
  }

  abstract async runPlay(ball : Ball);
}