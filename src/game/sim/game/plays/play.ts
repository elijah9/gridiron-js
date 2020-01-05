import { IDirectionalFieldPoint, DirectionalFieldPoint } from '../iFieldPoint';
import { LiteEvent } from "../../../util/iLiteEvent";
import { MathUtils } from "../../../util/mathUtils";
import { GamePlayer } from '../gamePlayer';
import { Dictionary, LinkedList } from 'typescript-collections';
import { Ball } from '../ball';
import { PlayerMechanic, MechanicCompleteEventArgs } from '../playerMechanics/playerMechanic';
import { DepthRole as DepthRole, Position } from '../../positionPlayer';

export abstract class Play {

  public readonly initialPositions = new Dictionary<DepthRole, IDirectionalFieldPoint>();

  protected _players : Dictionary<DepthRole, GamePlayer>;
  private _activeMechanics : LinkedList<PlayerMechanic>;

  public readonly playOver = new LiteEvent<void>();
  
  protected initializeRole(position : Position, posDepth : number, depth : number,
    offset : number, angle : number) : DepthRole {

    let role = new DepthRole(position, posDepth);
    this.initialPositions.setValue(role, new DirectionalFieldPoint(depth, offset,
      angle * MathUtils.DegreesToRadians));
    return role;
  }

  public initialize(players : Dictionary<DepthRole, GamePlayer>, startLine : number) {
    this._players = players;
    this._activeMechanics = new LinkedList<PlayerMechanic>();
    this.initializePlayerLocations(startLine);
    players.values().forEach((player : GamePlayer) => {
      player.onField = true;
    });
  }

  public async start(ball : Ball) {
    await this.runPlay(ball);
  }

  protected addMechanic(mechanic : PlayerMechanic, beforeStopping? : Function) {
    mechanic.mechanicComplete.subscribe((e? : MechanicCompleteEventArgs) => {
      if(beforeStopping != null) {
        beforeStopping.call(this);
      }

      if(e.playOver) {
        this.stop();
        return;
      }

      e.mechanic.stop();
      this._activeMechanics;
    });
    this._activeMechanics.add(mechanic);
  }

  private initializePlayerLocations(startLine : number) {
    this.initialPositions.forEach(role => {
      let point : IDirectionalFieldPoint = this.initialPositions.getValue(role);
      let player : GamePlayer = this._players.getValue(role);
      player.set_yards(point.yards + startLine);
      player.set_offset(point.offset);
      player.angle = point.angle;
    });
  }

  public stop() {
    this._activeMechanics.forEach(mechanic => {
      mechanic.stop();
    });

    this.playOver.trigger();
  }

  protected abstract async runPlay(ball : Ball);
}