import { Component, OnInit, Input } from '@angular/core';
import * as Svg from 'svg.js';
import { GameSim } from '../../game/sim/game/gameSim';
import { genTestGame } from '../../game/builders/gameBuilder';
import { GamePlayer, OnFieldEventArgs } from '../../game/sim/game/gamePlayer';
import { GameTeam } from '../../game/sim/game/gameTeam';
import { TestOffensePlay } from '../../game/sim/game/plays/offense/testOffensePlay';
import { TestDefensePlay } from 'src/game/sim/game/plays/defense/testDefensePlay';
import { FieldPointEventArgs, IFieldPoint } from '../../game/sim/game/iFieldPoint';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit {
  
  gameActive = false;
  driveActive = false;
  playReady = false;
  playActive = false;

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
  get game() : GameSim {
    return this._game;
  }
  private set_game(game : GameSim) {
    if(this._game == null) {
      this._game = game;
    } else {
      throw new Error("Game already set");
    }
  }

  get printableYards() : number {
    if(!this.gameActive) {
      return Number.NaN;
    }
    let los = this.game.lineOfScrimmage;
    if(los >= 50) {
      return 100 - los;
    } else {
      return -los;
    }
  }

  private _scale;
  private _svg : Svg.Doc;
  private _players : Map<GamePlayer, Svg.Circle>;
  private _initialized = false;

  private readonly _fieldLength = 120;
  private readonly _fieldWidth = 160 / 3;
  private readonly _offsetYards = this._fieldWidth / 2;
  
  constructor() { 
    window.addEventListener("resize", () => this.setScale());
    this.setScale();
  }

  ngOnInit() { }

  setScale() {
    let scaleFactor = 0.7;
    let w : number = document.documentElement.clientWidth * scaleFactor;
    let h : number = document.documentElement.clientHeight * scaleFactor;
    let v : number = w <= h ? w : h;
    this._scale = w <= h ? w / this._fieldLength : h / this._fieldWidth;
    console.log("scaling to " + this._scale);
    if(typeof(this._svg) !== "undefined") {
      this._svg.scale(this._scale, this._scale);
    }
  }

  setupTestDrive() {
    this.game.setupDrive(25, true);

    this.driveActive = true;
    console.log("drive initialized");
  }

  setupTestPlay() {
    if(!this._initialized) {
      this.initPlayers();
      this.initBall();
      this._initialized = true;
    }

    this.game.setupPlay(new TestOffensePlay(), new TestDefensePlay());

    this.playReady = true;
    console.log("play initialized");
  }

  async runTestPlay() {
    this.playActive = true;
    await this.game.runCurrentPlay();

    this.playReady = false;
    this.playActive = false;
  }

  private startGame() {
    this.set_game(genTestGame());
    this.gameActive = true;

    this._svg = new Svg.Doc("gameView2D").size(this._fieldLength * this._scale, this._fieldWidth * this._scale);

    console.log("game started");
  }

  private initPlayers() {
    // initialize svg objects
    this._players = new Map<GamePlayer, Svg.Circle>();
    this.game.home.players.map((player : GamePlayer) => { this.initPlayer(player); });
    this.game.away.players.map((player : GamePlayer) => { this.initPlayer(player); });
  }

  private initPlayer(player : GamePlayer) {
    // subscribe to position and onField change
    player.onFieldChanged.subscribe((e : OnFieldEventArgs) => {
      this.updatePlayer(player, e.onField);
    });
  }

  private updatePlayer(player : GamePlayer, onField : boolean) {
    let moveHandler = (f : FieldPointEventArgs) => this.movePlayer(player, f.point);
    if(onField && !this._players.has(player)) {
      player.positionChanged.subscribe(moveHandler);

      this.drawAndAddPlayer(player);
    } else if(!onField && this._players.has(player)) {
      // remove drawing and dictionary entry
      player.positionChanged.unsubscribe(moveHandler)
      this._svg.removeElement(this._players.get(player));
      this._players.delete(player);
    }
  }

  private drawAndAddPlayer(player : GamePlayer) {
    let team = this.game.getPlayerTeam(player);
    this._players.set(player, this.genPlayerDrawing(player, team));
  }

  private genPlayerDrawing(player : GamePlayer, team : GameTeam) : Svg.Circle {
    //console.log(`drawing ${player.player.jerseyNumber}`)
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
    try {
      this._players.get(player).move(this.scaleYards(pos.yards), this.scaleOffset(pos.offset));
    } catch(TypeError) { }
  }

  private scaleYards(yards : number) : number {
    return yards * this._scale;
  }

  private scaleOffset(offset : number) : number {
    return (offset + this._offsetYards) * this._scale;
  }

  isType(value : any, type : string) : boolean {
    return typeof(value) === type;
  }

  isNaN(value : number) : boolean {
    return isNaN(value);
  }
}