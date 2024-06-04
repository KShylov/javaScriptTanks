import tiles from "../src/enum.json" assert { type: "json" };

export default class Levels {
  constructor() {
    this.scale = 3;
  this.level = [
    0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 1,
    0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,1,2,3,4,5,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,1,0,1,0,0,0,0,0,
    0,0,0,0,0,0,1,0,0,0,0,0,0,
    0,0,0,0,0,1,0,1,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,
    0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 1,
  ];
  this.field = this.getlevel();
  }
  

  getlevel() {
    let arr = Array(tiles)[0].tiles;
    let i = 0;
    let field = this.level.map((el) => {
      let tile = { ...(arr.find((t) => t.id === el))};
      if (tile) {
        tile.px = i % 13;
        tile.py = Math.floor(i / 13);
        console.log("py = " + tile.py);
      }
      i++;
      return tile || el;
    });
    return field;
  }

  render(context, sprite) {
    this.field.forEach(element => {
      if(element.id === 4) return;
      context.drawImage(
        sprite.image,
        element.x,
        element.y,
        element.size,
        element.size,
        element.px * element.size * this.scale,
        element.py * element.size * this.scale,
        element.size * this.scale,
        element.size * this.scale
      );
    });
  }
  renderWood(context, sprite) {
    this.field.forEach(element => {
      if(element.id !== 4) return;
      context.drawImage(
        sprite.image,
        element.x,
        element.y,
        element.size,
        element.size,
        element.px * element.size * this.scale,
        element.py * element.size * this.scale,
        element.size * this.scale,
        element.size * this.scale
      );
    });
  }
  isCanMove({nextX, nextY}) {
    let actualTiles = this.field.find((tile) =>  tile.name !== "wood" &&
      tile.name !== "ice" &&
      this.isContactWithPoint(tile, nextX, nextY));
    console.log("actualTiles " + actualTiles);
    return actualTiles;
  }

  isContactWithPoint(tile, nextX, nextY) {
    let tileX = tile.px * tile.size * this.scale;
    let tileY = tile.py * tile.size * this.scale;
    let tileXsize = tileX + tile.size * this.scale;
    let tileYsize = tileY + tile.size * this.scale;
  
    return tileX <= nextX &&
    tileXsize >= nextX &&
    tileY <= nextY &&
    tileYsize >= nextY;
  }
}
