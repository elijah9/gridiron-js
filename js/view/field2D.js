const Field2D = function(canvas) {
  
  this.buffer = document.createElement("canvas").getContext("2d");
  this.context = canvas.getContext("2d");
  // todo: dynamically set tileSize based on window size
  this.tileSize = 8;
  this.tilesheetCols = 1;
  // todo: gridW and gridH also defined in field.js, this should be fixed
  this.gridW = 120;
  this.gridH = 54;
  this.tilesheet = new Field2D.Tilesheet(this.tileSize, this.tilesheetCols);
  this.scale = undefined;

  this.drawField = function(field) {
    // draw the field itself
    for(let i = field.map.length - 1; i > -1; --i) {
      let value = field.map[i];
      let scaledTilesize = this.tileSize * this.scale;
      let sourceX = (value % this.tilesheet.numColumns) * this.tileSize;
      let sourceY = Math.floor(value / this.tilesheet.numColumns) * this.tileSize;
      let destX = (i % this.gridW) * scaledTilesize;
      let destY = Math.floor(i / this.gridW) * scaledTilesize;
      this.buffer.drawImage(this.tilesheet.image, sourceX, sourceY,
        this.tileSize, this.tileSize, destX, destY, scaledTilesize, scaledTilesize);
    }

    // draw the player (eventually this will be drawing 22 players)
    this.drawPlayer(field.player);
  };

  this.drawPlayer = function(player) {
    let scaledTileSize = this.tileSize * this.scale;
    this.buffer.fillStyle = player.colorMain;
    this.buffer.fillRect(Math.floor(player.x * scaledTileSize), 
      Math.floor(player.y * scaledTileSize), scaledTileSize, scaledTileSize);
  }
  
  this.fill = function(color) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
  }

  this.render = function() {
    this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width,
      this.buffer.canvas.height, 0, 0, this.context.canvas.width,
      this.context.canvas.height);
  };

  this.resize = function(w, h) {
    let ratio = this.gridH / this.gridW;
    let unscaledW = this.tileSize * this.gridW;
    let unscaledH = this.tileSize * this.gridH;
    if(h / w > ratio) {
      this.context.canvas.height = w * ratio;
      this.context.canvas.width = w;
      this.scale = w / unscaledW;
    } else {
      this.context.canvas.height = h;
      this.context.canvas.width = h / ratio;
      this.scale = h / unscaledH;
    }

    this.buffer.canvas.height = this.context.canvas.height;
    this.buffer.canvas.width = this.context.canvas.width;

    this.context.imageSmoothingEnabled = false;
  };
};

Field2D.prototype = {
  constructor: Field2D
};

Field2D.Tilesheet = function(tileSize, nCol) {
  this.image = new Image();
  this.image.src = "../media/field-tiles.png";
  this.tileSize = tileSize;
  this.numColumns = nCol;
}

Field2D.Tilesheet.prototype = {};