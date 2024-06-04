import Tank from "./tank";
import data from "../data/tankColors.json" assert { type: "json" };

export default class World {
  constructor(level, config) {
    this.grid = level;
    this.config = config;
    this.scale = config.scale;
    this.playerTank1 = new Tank({
      typeTank: {
        color: data.gold,
        level: 0,
      },
      direction: 0,
      scale: config.scale,
      spead: 3,
      size: config.size,
      position: {
        x: 100,
        y: config.worldSize - config.size * this.scale - 50,
      },
      grid: this.grid
    });
    this.playerTank2 = null;
    this.enemyTanks = [];
  }
  

  update(key) {
    this.playerTank1.update(key, this.config);
  }
  render(context, sprite) {
    this.grid.render(context, sprite)
    this.playerTank1.render(context, sprite);
    this.grid.renderWood(context, sprite);
  }
}