import { GameTeam } from './gameTeam';
import { Ball } from './ball';
import { LiteEvent } from 'src/game/util/iLiteEvent';
import { GamePlayer } from './gamePlayer';
import { DummyPlayRoleResolver } from './playRoleResolver';
import { OffensePlay } from './plays/offense/offensePlay';
import { Play } from './plays/play';
import { DepthRole } from '../positionPlayer';
import { has } from '../../util/dataStructures';

export class GameSim {
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
  private set_homeHasBall(homeHasBall : boolean) { 
    if(this._homeHasBall != homeHasBall) {
      this._homeHasBall = homeHasBall;
      
      // set players to not on field
      for(let player of this.home.players) {
        player.onField = false;
      }
      for(let player of this.away.players) {
        player.onField = false;
      }
    }
  }
  
  private get offense() : GameTeam { return this.homeHasBall ? this.home : this.away; }
  private get defense() : GameTeam { return this.homeHasBall ? this.away : this.home; }

  private _lineOfScrimmage : number;
  get lineOfScrimmage() : number { return this._lineOfScrimmage; }
  private set_lineOfScrimmage(lineOfScrimmage : number) { 
    this._lineOfScrimmage = lineOfScrimmage;
    this.scrimmageLineChanged.trigger(new YardLineEventArgs(this.lineOfScrimmage));
  }

  private _down : number;
  get down() : number { return this._down; }
  private set_down(down : number) {
    if(this._down != down) {
      if(down > 4 || down < 1) {
        throw new Error(`Can't have ${down}th down...`);
      }
      this._down = down;
    }
  }

  private _distance : number;
  get distance() : number { return this._distance; }
  private set_distance(distance : number) {
    if(this._distance != distance) {
      this._distance = distance;
    }
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

  private _currentOffensePlay : OffensePlay;
  private _currentOffenseRoles : Map<DepthRole, GamePlayer>;
  private _currentDefensePlay : Play;
  private _currentDefenseRoles : Map<DepthRole, GamePlayer>;
  private _playFinishCounter : number;

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

    this._currentOffensePlay.playOver.subscribe((play : Play) => this.onPlayFinished(play));
    this._currentDefensePlay.playOver.subscribe((play : Play) => this.onPlayFinished(play));
    
    let resolver = new DummyPlayRoleResolver();
    this._currentOffenseRoles = resolver.resolveRoles(this._currentOffensePlay, this.offense.players);
    this._currentDefenseRoles = resolver.resolveRoles(this._currentDefensePlay, this.defense.players);

    this._currentOffensePlay.initialize(this._currentOffenseRoles, this.lineOfScrimmage);
    this._currentDefensePlay.initialize(this._currentDefenseRoles, this.lineOfScrimmage);

    this.ball.carrier = this._currentOffenseRoles.get(this._currentOffensePlay.snapper);

    this.set_isPlayActive(true);
    this._playFinishCounter = 0;
  }

  getPlayerTeam(player : GamePlayer) : GameTeam {
    return this.isPlayerHome(player) ? this.home : this.away;
  }

  isPlayerHome(player : GamePlayer) : boolean {
    return has(this.home.team.activeRoster, player.player);
  }

  async runCurrentPlay() {
    await this._currentOffensePlay.start(this.ball);
    await this._currentDefensePlay.start(this.ball);
    this.set_isPlayRunning(true);
  }

  private firstAnd10(home : boolean, yards : number) {
    this.set_homeHasBall(home);
    this.set_down(1);
    this.set_lineOfScrimmage(yards);
    this.set_firstDownLine(this.lineOfScrimmage + 10);
    this.set_distance(this.firstDownLine - this.lineOfScrimmage);
  }

  private onPlayFinished(play? : Play) {
    if(this._currentOffensePlay != null) {
      this._currentOffensePlay.stop();
      this._currentOffensePlay = null;
    }

    if(this._currentDefensePlay != null) {
      this._currentDefensePlay.stop();
      this._currentDefensePlay = null;
    }

    if(this._currentOffensePlay == null && this._currentDefensePlay == null) {
      this.set_isPlayRunning(false);
      this.set_isPlayActive(false);
      ++this._playFinishCounter;

      if(this._playFinishCounter == 2) {
        if(this.ball.yards > 0 && this.ball.yards < 100) {
          this.set_lineOfScrimmage(this.ball.yards);
          if(this.lineOfScrimmage >= this.firstDownLine) {
            // first down
            this.firstAnd10(this.homeHasBall, this.lineOfScrimmage);
          } else if(this.down == 4) {
            // turnover on downs
            this.firstAnd10(!this.homeHasBall, 100 - this.lineOfScrimmage);
          } else {
            // next down
            this.set_down(this.down + 1);
          }
          this.set_distance(this.firstDownLine - this.lineOfScrimmage);
        } else {
          // either a touchdown or safety...The Choice Is Yours ;-)
          this.onEndzonePlayFinish();
        }
      }
    }
  }

  private onEndzonePlayFinish() {
    this.set_isDriveActive(false);
    if(this.ball.yards >= 100) {
      // touchdown
      if(this.homeHasBall) {
        this.incrementHomeScore(6);
        this.setupDrive(25, false);
      } else {
        this.incrementAwayScore(6);
        this.setupDrive(25, true);
      }
    } else if(this.ball.yards <= 0) {
      // safety
      if(this.homeHasBall) {
        this.incrementAwayScore(2);
        this.setupDrive(30, false);
      } else {
        this.incrementHomeScore(2);
        this.setupDrive(30, true);
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
