import { Item, Point, Layer, Path, Color  } from "paper"
import { Field } from "../sim/game/field"
import { GamePlayer } from "../sim/game/gamePlayer"

export class Field2D {
  public canvas : HTMLCanvasElement;

  private _resourcesToLoad : number = 2;
  private _pixelsPerYardX : number;
  private _pixelsPerYardY : number;
  private _fieldScale : number;
  private _fieldImg : Item;
  private _baseFieldW : number;
  private _baseFieldH : number;
  private _playerScale : number;
  private _playerImg : Item;

  constructor(canvas : HTMLCanvasElement) {
    this.canvas = canvas;

    // these lines must be after initDraw is declared, even though it makes organization worse
    this.canvas.addEventListener("field-loaded", this.initDraw, { once: true });
    this.canvas.addEventListener("players-loaded", this.initDraw, { once: true });
  }

  public loadAssets() : void {
    paper.setup(this.canvas);

    this.drawField();
    this.drawPlayers();
  }

  public updateField(field : Field) {
    // draw the player (eventually this will be drawing 22 players)
    this.updatePlayer(field.player);
  }

  public resize(w : number, h : number) {
    // reverse the existing scales
    if(this._fieldScale !== undefined) {
      this._fieldImg.scale(1 / this._fieldScale, this._fieldImg.bounds.topLeft);
    }
    if(this._playerScale !== undefined) {
      this._playerImg.scale(1 / this._playerScale, new Point(0, 0));
    }

    let ratio = this._baseFieldH / this._baseFieldW;
    this._fieldScale = h / w > ratio ? w / this._baseFieldW : h / this._baseFieldH;
    
    this._fieldImg.scale(this._fieldScale, this._fieldImg.bounds.topLeft);

    // scale player to be 3 yards wide
    let oldPlayerW = this._playerImg.bounds.width;
    this._pixelsPerYardX = this._fieldImg.bounds.width / 120.9;
    this._pixelsPerYardY = this._fieldImg.bounds.height / 54.1;
    let newPlayerW = this._pixelsPerYardX * 3;
    this._playerScale = newPlayerW / oldPlayerW;
    this._playerImg.scale(this._playerScale, new Point(0, 0));
  }

  // I believe the way paper.js works means I only have to render here (not every frame)
  private initDraw(e : Event) {
    this._resourcesToLoad--;
    if(this._resourcesToLoad > 0) { return; }

    // doesn't do anything useful right now but keeping this set up just in case
  }
  
  private drawField() {
    let fieldEvent = new Event("field-loaded");
    let fieldLayer = new Layer();
    paper.project.addLayer(fieldLayer);
    paper.project.importSVG("../../media/field2D.svg", (item : Item) => {
      this._fieldImg = item;
      this._baseFieldW = this._fieldImg.bounds.width;
      this._baseFieldH = this._fieldImg.bounds.height;
      this.canvas.dispatchEvent(fieldEvent);
    });
  }

  private drawPlayers() {
    let playersEvent = new Event("players-loaded");
    let playersLayer = new Layer();
    paper.project.addLayer(playersLayer);

    // method 1 - jersey SVG (not working right now)
    // paper.project.importSVG("../../media/jersey2.svg", (item : paper.Item) => {
    //   this._playerImg = item;
    //   this.canvas.dispatchEvent(playersEvent);
    // });

    // method 2 - just a circle
    this._playerImg = new Path.Circle({
      center: [0, 0],
      radius: 3
    });
    playersLayer.addChild(this._playerImg);
    this.canvas.dispatchEvent(playersEvent);
  }

  private updatePlayer(player : GamePlayer) {
    // should change things around so that this line isn't redundant with the identical one in fillPlayerColor()
    //this._playerImg.children.map((child : paper.Item) => { this.fillPlayerColor(player, child); });

    this._playerImg.fillColor = new Color(player.colorMain); // this line should be moved to initialization code
    this._playerImg.bounds.x = player.x * this._pixelsPerYardX;
    this._playerImg.bounds.y = player.y * this._pixelsPerYardY;

    //let x = _playerImg.bounds.x;
    //let y = _playerImg.bounds.y;
    //console.log({x, y});
  }

  private fillPlayerColor(player : GamePlayer, child : Item) {
    child.fillColor = new Color(player.colorMain);
    child.strokeColor = new Color(player.colorSec);
    if(typeof child.children !== "undefined") {
      child.children.map((child) => { this.fillPlayerColor(player, child); });
    }
  }
}
