const Field2D = function(canvas) {
  
  // initialize state variables
  this.canvas = canvas;
  let _resourcesToLoad = 2;
  let _pixelsPerYardX = undefined;
  let _pixelsPerYardY = undefined;
  let _fieldScale = null;
  let _fieldImg = undefined;
  let _playerScale = null;
  let _playerImg = undefined;
  let _baseFieldW = undefined;
  let _baseFieldH = undefined;
  let _basePlayerW = undefined;
  let _basePlayerH = undefined;

  this.loadAssets = function() {
    paper.setup(this.canvas);

    drawField(this.canvas);
    drawPlayers(this.canvas);
  };

  this.updateField = function(field) {
    // draw the player (eventually this will be drawing 22 players)
    updatePlayer(field.player);
  };

  this.resize = function(w, h) {
    // reverse the existing scale
    if(_fieldScale !== null) {
      _fieldImg.scale(1 / _fieldScale, _fieldImg.bounds.topLeft);
    }
    if(_playerScale !== null) {
      _playerImg.scale(1 / _playerScale, new paper.Point(0, 0));
    }

    let ratio = _baseFieldH / _baseFieldW;
    _fieldScale = h / w > ratio ? w / _baseFieldW : h / _baseFieldH;
    
    _fieldImg.scale(_fieldScale, _fieldImg.bounds.topLeft);

    // scale player to be 3 yards wide
    let oldPlayerW = _playerImg.bounds.width;
    _pixelsPerYardX = _fieldImg.bounds.width / 120.9;
    _pixelsPerYardY = _fieldImg.bounds.height / 54.1;
    let newPlayerW = _pixelsPerYardX * 3;
    _playerScale = newPlayerW / oldPlayerW;
    _playerImg.scale(_playerScale, new paper.Point(0, 0));
  };

  // I believe the way paper.js works means I only have to render here (not every frame)
  let initDraw = function(e) {
    _resourcesToLoad--;
    if(_resourcesToLoad > 0) { return; }

    paper.view.draw();
  };
  // these lines must be after initDraw is declared, even though it makes organization worse
  this.canvas.addEventListener("field-loaded", initDraw, { once: true });
  this.canvas.addEventListener("players-loaded", initDraw, { once: true });

  let drawField = function(canvas) {
    let fieldEvent = new Event("field-loaded");
    let fieldLayer = new paper.Layer();
    paper.project.addLayer(fieldLayer);
    paper.project.importSVG("../../media/field2D.svg", (item) => {
      _fieldImg = item;
      _baseFieldW = _fieldImg.bounds.width;
      _baseFieldH = _fieldImg.bounds.height;
      canvas.dispatchEvent(fieldEvent);
    });
  };

  let drawPlayers = function(canvas) {
    let playersEvent = new Event("players-loaded");
    let playersLayer = new paper.Layer();
    paper.project.addLayer(playersLayer);

    // method 1 - jersey SVG (not working right now)
    // paper.project.importSVG("../../media/jersey2.svg", (item) => {
    //   _playerImg = item;
    //   _basePlayerW = _playerImg.bounds.width;
    //   _basePlayerH = _playerImg.bounds.height;
    //   this.canvas.dispatchEvent(playersEvent);
    // });

    // method 2 - just a circle
    _playerImg = new paper.Path.Circle({
      center: [0, 0],
      radius: 3
    });
    playersLayer.addChild(_playerImg);
    canvas.dispatchEvent(playersEvent);
  };

  let updatePlayer = function(player) {
    // should change things around so that this line isn't redundant with the identical one in fillPlayerColor()
    //_playerImg.children.map(function(child) { fillPlayerColor(player, child); });

    _playerImg.fillColor = player.colorMain; // this line should be moved to initialization code eventually
    _playerImg.bounds.x = player.x * _pixelsPerYardX;
    _playerImg.bounds.y = player.y * _pixelsPerYardY;

    //let x = _playerImg.bounds.x;
    //let y = _playerImg.bounds.y;
    //console.log({x, y});
  };

  let fillPlayerColor = function(player, child) {
    child.fillColor = player.colorMain;
    child.strokeColor = player.colorSec;
    if(typeof child.children !== "undefined") {
      child.children.map(function(child) { fillPlayerColor(player, child); });
    }
  };
};

Field2D.prototype = {
  constructor: Field2D
};