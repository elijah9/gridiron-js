import { Component, OnInit, Input } from '@angular/core';
import * as Svg from 'svg.js';
import { GameSim } from '../../game/sim/game/gameSim';
import { genTestGame } from '../../game/builders/gameBuilder';
import { GamePlayer, OnFieldEventArgs } from '../../game/sim/game/gamePlayer';
import { GameTeam } from '../../game/sim/game/gameTeam';
import { TestOffensePlay } from '../../game/sim/game/plays/offense/testOffensePlay';
import { TestDefensePlay } from 'src/game/sim/game/plays/defense/testDefensePlay';
import { FieldPointEventArgs, IFieldPoint } from '../../game/sim/game/iFieldPoint';
import { Logger } from '../../game/util/logger';
import { fieldLength, fieldWidth, fieldOffsetFromTop } from '../../game/sim/game/field';
import { VisionCone } from '../../game/sim/game/playerMechanics/visionCone';

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

  get debugLog() : string { return Logger.value; }

  private _scale;
  private _svg : Svg.Doc;
  private _players : Map<GamePlayer, Svg.G>;
  private _cones : Map<GamePlayer, Svg.PolyLine>;
  private _initialized = false;
  
  constructor() { }

  ngOnInit() { 
    window.addEventListener("resize", () => this.setScale());
    this.setScale();
  }

  setScale() {
    let scaleFactor = 1.0;
    let w : number = document.getElementById("gameView2D").offsetWidth * scaleFactor;
    let h : number = document.getElementById("gameView2D").offsetHeight * scaleFactor;
    this._scale = w <= h ? w / fieldLength : h / fieldWidth;
    Logger.log("scaling to " + this._scale);
    if(typeof(this._svg) !== "undefined") {
      this._svg.scale(this._scale, this._scale);
    }
  }

  setupTestDrive() {
    this.game.setupDrive(25, true);

    this.driveActive = true;
    Logger.log("drive initialized");
  }

  setupTestPlay() {
    if(!this._initialized) {
      this.initPlayers();
      this.initBall();
      this._initialized = true;
    }

    this.game.setupPlay(new TestOffensePlay(), new TestDefensePlay());

    this.playReady = true;
    Logger.log("play initialized");
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

    this._svg = new Svg.Doc("gameView2D").size(fieldLength * this._scale, fieldWidth * this._scale);

    this.drawField();

    Logger.log("game started");
  }

  private drawField() {
    this._svg.rect(this.scaleYards(10), this.scaleOffset(54)).move(this.scaleYards(-10), 0).fill(this.game.away.team.colorMain);
    this._svg.rect(this.scaleYards(100), this.scaleOffset(54)).move(this.scaleYards(0), 0).fill("rgb(0,100,0)");
    this._svg.rect(this.scaleYards(10), this.scaleOffset(54)).move(this.scaleYards(100), 0).fill(this.game.home.team.colorMain);

    for(let i = 0; i <= 100; i += 10) {
      this.drawFieldMarkings(i);
    }
  }

  private drawFieldMarkings(yards : number) {
    let marking : string;
    if(yards % 100 == 0) {
      marking = "G";
    } else if(yards <= 50) {
      marking = yards.toString();
    } else {
      marking = (100 - yards).toString();
    }
    let color = "rgb(255,255,255)";
    this._svg.text(marking).move(this.scaleYards(yards), this.scaleOffset(-17)).fill(color);
    this._svg.text(marking).move(this.scaleYards(yards), this.scaleOffset(17)).fill(color);
  }

  private initPlayers() {
    // initialize svg objects
    this._players = new Map<GamePlayer, Svg.G>();
    this._cones = new Map<GamePlayer, Svg.PolyLine>();
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
      this._cones.get(player).remove();
      this._cones.delete(player);
    }
  }

  private drawAndAddPlayer(player : GamePlayer) {
    let team = this.game.getPlayerTeam(player);
    this._players.set(player, this.genPlayerDrawing(player, team));
  }

  private genPlayerDrawing(player : GamePlayer, team : GameTeam) : Svg.G {
    // jersey number, background circle
    let number : Svg.Text = this._svg.text(player.player.jerseyNumber.toString());
    number.move(0, -0.5).fill("rgb(255,255,255)");
    let playerDrawing : Svg.Circle = this._svg.circle(this._scale).fill(team.team.colorMain).scale(1.5);
    
    // put everything together and draw
    let group : Svg.G = this._svg.group();
    group.add(playerDrawing);
    group.add(number);
    return group.move(this.scaleYards(player.yards), this.scaleOffset(player.offset));
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

      if(player.showVisionCone) {
        let visionCone : VisionCone = player.visionCone;
        let playerPos = [this.scaleYards(player.yards), this.scaleOffset(player.offset)];
        let leftPos = [
          this.scaleYards(visionCone.leftIntersection.yards), 
          this.scaleOffset(visionCone.leftIntersection.offset)
        ];
        let rightPos = [
          this.scaleYards(visionCone.rightIntersection.yards), 
          this.scaleOffset(visionCone.rightIntersection.offset)
        ];

        if(this._cones.has(player)) {
          this._cones.get(player).remove();
          this._cones.delete(player);
        }
        this._cones.set(player, this._svg.polyline([playerPos, leftPos, rightPos, playerPos])
          .fill("none").stroke({width: 1, color: "rgb(255,255,255)"}));
      }
    } catch(TypeError) { }
  }

  private scaleYards(yards : number) : number {
    return (yards + 10) * this._scale;
  }

  private scaleOffset(offset : number) : number {
    return (offset + fieldOffsetFromTop) * this._scale;
  }

  isType(value : any, type : string) : boolean {
    return typeof(value) === type;
  }

  isNaN(value : number) : boolean {
    return isNaN(value);
  }
}