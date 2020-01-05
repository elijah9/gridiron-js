import { Component, OnInit, Input } from '@angular/core';
import * as Svg from 'svg.js';
import { GameSim } from '../../game/sim/game/gameSim';
import { genTestGame } from '../../game/builders/gameBuilder';
import { GamePlayer, OnFieldEventArgs } from '../../game/sim/game/gamePlayer';
import { GameTeam } from '../../game/sim/game/gameTeam';
import { TestOffensePlay } from '../../game/sim/game/plays/offense/testOffensePlay';
import { TestDefensePlay } from 'src/game/sim/game/plays/defense/testDefensePlay';
import { Dictionary } from 'typescript-collections';
import { FieldPointEventArgs, IFieldPoint } from '../../game/sim/game/iFieldPoint';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit {
  
  private _hidden : boolean;
  get hidden() : boolean {
    return this._hidden;
  }
  @Input() set hidden(v : boolean) {
    this._hidden = v;
    if(!v) {
      this.startGame();
    }
  }

  private _game : GameSim;
  private get game() : GameSim {
    return this._game;
  }
  private set game(game : GameSim) {
    if(this._game == null) {
      this._game = game;
    } else {
      throw new Error("Game already set");
    }
  }

  private _svg : Svg.Doc;
  private _home : Dictionary<GamePlayer, Svg.Circle>;
  private _away : Dictionary<GamePlayer, Svg.Circle>;

  private readonly _scale = 12;
  private readonly _fieldLength = 120;
  private readonly _fieldWidth = 160 / 3;
  private readonly _offsetYards = this._fieldWidth / 2;
  
  constructor() { }

  ngOnInit() { }

  setupTestDrive() {
    this.game.setupDrive(25, true);

    console.log("drive initialized");
  }

  setupTestPlay() {
    this.game.setupPlay(new TestOffensePlay(), new TestDefensePlay());

    this.initPlayers();
    this.initBall();

    console.log("play initialized");
  }

  async runTestPlay() {
    await this.game.runCurrentPlay();
  }

  private startGame() {
    this.game = genTestGame();

    this._svg = new Svg.Doc("gameView2D").size(this._fieldLength * this._scale, this._fieldWidth * this._scale);

    console.log("game started");
  }

  private initPlayers() {
    // initialize svg objects
    this._home = new Dictionary<GamePlayer, Svg.Circle>();
    this._away = new Dictionary<GamePlayer, Svg.Circle>();
    this.game.home.players.map((player : GamePlayer) => { this.initPlayer(player); });
    this.game.away.players.map((player : GamePlayer) => { this.initPlayer(player); });
  }

  private initPlayer(player : GamePlayer) {
    if(player.onField) {
      this.drawAndAddPlayer(player);
    }

    // subscribe to position and onField change
    player.onFieldChanged.subscribe((e : OnFieldEventArgs) => {
      let moveHandler = (e : FieldPointEventArgs) => this.movePlayer(player, e.point);
      if(e.onField) {
        player.positionChanged.subscribe(moveHandler);

        this.drawAndAddPlayer(player);
      } else {
        player.positionChanged.unsubscribe(moveHandler)

        // remove drawing and dictionary entry
        let team = this.getPlayerTeamDrawing(player);
        team.getValue(player).remove();
        team.remove(player);
      }
    });
  }

  private getPlayerTeamDrawing(player : GamePlayer) : Dictionary<GamePlayer, Svg.Circle> {
    return this.game.isPlayerHome(player) ? this._home : this._away;
  }

  private drawAndAddPlayer(player : GamePlayer) {
    let teamDrawing = this.getPlayerTeamDrawing(player);
    let team = this.game.getPlayerTeam(player);
    teamDrawing.setValue(player, this.genPlayerDrawing(player, team));
  }

  private genPlayerDrawing(player : GamePlayer, team : GameTeam) : Svg.Circle {
    let color = team.team.colorMain;
    return this._svg.circle(this._scale).move(this.scaleYards(player.yards), 
      this.scaleOffset(player.offset)).fill(color);
  }

  private initBall() {
    let ball = this._svg.ellipse(this._scale, 0.5 * this._scale)
      .move(this.scaleYards(this.game.ball.yards), this.scaleOffset(this.game.ball.offset))
      .fill("rgb(40,10,5)");

    this.game.ball.positionChanged.subscribe((e : FieldPointEventArgs) => {
      ball.move(this.scaleYards(e.point.yards), this.scaleOffset(e.point.offset));
    })
  }
  
  private movePlayer(player : GamePlayer, pos : IFieldPoint) {
    this.getPlayerTeamDrawing(player).getValue(player)
      .move(this.scaleYards(pos.yards), this.scaleOffset(pos.offset));
  }

  private scaleYards(yards : number) : number {
    return yards * this._scale;
  }

  private scaleOffset(offset : number) : number {
    return (offset + this._offsetYards) * this._scale;
  }
}