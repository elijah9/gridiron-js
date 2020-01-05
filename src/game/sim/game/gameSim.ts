import { Field } from "./field";
import { GameTeam } from './gameTeam';
import { Ball } from './ball';
import { Dictionary } from 'typescript-collections';
import { LiteEvent } from 'src/game/util/iLiteEvent';
import { GamePlayer } from './gamePlayer';
import { DummyPlayRoleResolver } from './playRoleResolver';
import { OffensePlay } from './plays/offense/offensePlay';
import { Play } from './plays/play';
import { DepthRole } from '../positionPlayer';

export class GameSim {
  private _field : Field;
  get field() : Field { return this._field; }
  private set_field(field : Field) { this._field = field; }

  private _homeScore : number = 0;
  get homeScore() : number { return this._homeScore; }
  private set_homeScore(homeScore : number) { this._homeScore = homeScore; }
  private incrementHomeScore(points : number) { this.set_homeScore(this.homeScore + points); }

  private _awayScore : number = 0;
  get awayScore() : number { return this._awayScore; }
  private set_awayScore(awayScore : number) { this._awayScore = awayScore; }
  private incrementAwayScore(points : number) { this.set_awayScore(this.awayScore + points); }

  private _home : GameTeam;
  get home() : GameTeam { return this._home; }
  private set_home(home : GameTeam) { this._home = home; }

  private _away : GameTeam;
  get away() : GameTeam { return this._away; }
  private set_away(away : GameTeam) { this._away = away; }

  private _ball : Ball;
  get ball() : Ball { return this._ball; }
  private set_ball(ball : Ball) { this._ball = ball; }

  private _homeHasBall : boolean;
  get homeHasBall() : boolean { return this._homeHasBall; }
  private set_homeHasBall(homeHasBall : boolean) { this._homeHasBall = homeHasBall; }
  
  private get offense() : GameTeam { return this.homeHasBall ? this.home : this.away; }
  private get defense() : GameTeam { return this.homeHasBall ? this.away : this.home; }

  private _lineOfScrimmage : number;
  get lineOfScrimmage() : number { return this._lineOfScrimmage; }
  private set_lineOfScrimmage(lineOfScrimmage : number) { 
    this._lineOfScrimmage = lineOfScrimmage;
    this.scrimmageLineChanged.trigger(new YardLineEventArgs(this.lineOfScrimmage));
   }

  private _firstDownLine : number;
  get firstDownLine() : number { return this._firstDownLine; }
  private set_firstDownLine(firstDownLine : number) { 
    this._firstDownLine = firstDownLine;
    this.firstDownLineChanged.trigger(new YardLineEventArgs(this.firstDownLine));
  }

  private _isDriveActive : boolean;
  get isDriveActive() : boolean { return this._isDriveActive; }
  private set_isDriveActive(isDriveActive : boolean) { this._isDriveActive = isDriveActive; }

  private _isPlayActive : boolean;
  get isPlayActive() : boolean { return this._isPlayActive; }
  private set_isPlayActive(isPlayActive : boolean) { this._isPlayActive = isPlayActive; }

  private _isPlayRunning : boolean;
  get isPlayRunning() : boolean { return this._isPlayRunning; }
  private set_isPlayRunning(isPlayRunning : boolean) { this._isPlayRunning = isPlayRunning; }

  private _isHomeOnField : boolean;
  get isHomeOnField() : boolean { return this._isHomeOnField; }
  private set_isHomeOnField(isHomeOnField : boolean) { this._isHomeOnField = isHomeOnField; }

  private _isAwayOnField : boolean;
  get isAwayOnField() : boolean { return this._isAwayOnField; }
  private set_isAwayOnField(isAwayOnField : boolean) { this._isAwayOnField = isAwayOnField; }

  private _currentOffensePlay : OffensePlay;
  private _currentOffenseRoles : Dictionary<DepthRole, GamePlayer>;
  private _currentDefensePlay : Play;
  private _currentDefenseRoles : Dictionary<DepthRole, GamePlayer>;

  readonly scrimmageLineChanged = new LiteEvent<YardLineEventArgs>();
  readonly firstDownLineChanged = new LiteEvent<YardLineEventArgs>();
  
  constructor(home : GameTeam, away : GameTeam) {
    this.set_home(home);
    this.set_away(away);
    this.set_ball(new Ball());
  }

  setupDrive(startLine : number, homeHasBall : boolean) {
    this.firstAnd10(homeHasBall, startLine);
    this.set_isDriveActive(true);
  }

  setupPlay(offensePlay : OffensePlay, defensePlay : Play) {
    this._currentOffensePlay = offensePlay;
    this._currentDefensePlay = defensePlay;

    this._currentOffensePlay.playOver.subscribe(this.onPlayFinished);
    this._currentDefensePlay.playOver.subscribe(this.onPlayFinished);

    let resolver = new DummyPlayRoleResolver();
    this._currentOffenseRoles = resolver.resolveRoles(this._currentOffensePlay, this.offense.players);
    this._currentDefenseRoles = resolver.resolveRoles(this._currentDefensePlay, this.defense.players);

    this._currentOffensePlay.initialize(this._currentOffenseRoles, this.lineOfScrimmage);
    this._currentDefensePlay.initialize(this._currentDefenseRoles, this.lineOfScrimmage);

    this.ball.carrier = this._currentOffenseRoles.getValue(this._currentOffensePlay.snapper);

    this.showPlayers();
    this.set_isPlayActive(true);
  }

  getPlayerTeam(player : GamePlayer) : GameTeam {
    return this.isPlayerHome(player) ? this.home : this.away;
  }

  isPlayerHome(player : GamePlayer) : boolean {
    return this.home.team.activeRoster.contains(player.player);
  }

  private showPlayers() {
    this.set_isHomeOnField(true);
    this.set_isAwayOnField(true);
  }

  async runCurrentPlay() {
    await this._currentOffensePlay.start(this.ball);
    await this._currentDefensePlay.start(this.ball);
    this.set_isPlayRunning(true);
  }

  private firstAnd10(home : boolean, yards : number) {
    this.set_homeHasBall(home);
    this.set_lineOfScrimmage(yards);
    this.set_firstDownLine(this.lineOfScrimmage + 10);

  }

  private onEndzonePlayFinish() {
    this.set_isDriveActive(false);
    if(this.ball.yards >= 100) {
      if(this.homeHasBall) {
        // touchdown
        this.incrementHomeScore(6);
        this.setupDrive(75, false);
      } else {
        // safety
        this.incrementHomeScore(2);
        this.setupDrive(30, false);
      } 
    } else if(this.ball.yards <= 0) {
      if(!this.homeHasBall) {
        // touchdown
        this.incrementAwayScore(6);
        this.setupDrive(25, true);
      } else {
        // safety
        this.incrementAwayScore(2);
        this.setupDrive(70, false);
      }
    }
  }

  private onPlayFinished(data? : void) {
    console.log("play finished");
    if(this._currentOffensePlay != null && this._currentDefensePlay != null) {
      this._currentOffensePlay.stop();
      this._currentDefensePlay.stop();
      this.set_isPlayRunning(false);
      this.set_isHomeOnField(false);
      this.set_isAwayOnField(false);
      this._currentOffensePlay = null;
      this._currentDefensePlay = null;
      this.set_isPlayActive(false);

      if(this.ball.yards > 0 && this.ball.yards < 100) {
        this.set_lineOfScrimmage(this.ball.yards);
        if(this.lineOfScrimmage >= this.firstDownLine) {
          this.set_firstDownLine(Math.min(this.lineOfScrimmage + 10, 100));
        }
      } else {
        this.onEndzonePlayFinish();
      }
    }
  }
}

class YardLineEventArgs {
  readonly yards : number;
  constructor(yards : number) {
    this.yards = yards;
  }
}

