export default class Snaryad {
  constructor({ typeTank, scale, spead, direction, position, grid }) {
    this.typeTank = typeTank;
    this.scale = scale * 0.85;
    this.grid = grid;
    this.spead = spead;
    this.size = 8;
    this.direction = direction;
    this.position = position;
    this.spritePosition = { x: 0, y: 0 };
  }
  update(config) {
    this.moveSnaryad(config);
  }

  getSnaryadSprireByDirection() {
    let x = 0;
    let y = 0;
    return {
      x:
        x + 320,
      y:
        y + 96
    };
  }

  render(context, sprite) {
    context.drawImage(
      sprite.image,
      this.spritePosition.x,
      this.spritePosition.y,
      this.size,
      this.size,
      this.position.x,
      this.position.y,
      this.size * this.scale,
      this.size * this.scale
    );
  }

  moveSnaryad(config) {
    switch (this.direction) {
      case "up":
        this.move("y", -this.spead, config);
        break;
      case "right":
        this.move("x", this.spead, config);
        break;
      case "left":
        this.move("x", -this.spead, config);
        break;
      case "down":
        this.move("y", this.spead, config);
        break;
    }
    this.spritePosition = this.getSnaryadSprireByDirection();
  }

  move(axis, spead, config) {
    if (this.isCanMove()) {
      return;
    }
    console.log("Is can move true")
    let checkBoard = this.position[axis] + spead;
    if (
      checkBoard >= 0 &&
      checkBoard <= config.worldSize - this.size * this.scale
    )
      this.position[axis] = checkBoard;
    else if (checkBoard < 0) this.position[axis] = 0;
    else if (checkBoard > config.worldSize - this.size * this.scale)
      this.position[axis] = config.worldSize - this.size * this.scale;
  }

  isCanMove() {
    switch (this.direction) {
      case "up":
        return (
          this.grid.isCanMove({
            nextX: this.position.x,
            nextY: this.position.y - this.spead,
          }) ||
          this.grid.isCanMove({
            nextX: this.position.x + this.size * this.scale,
            nextY: this.position.y - this.spead,
          })
        );
      case "right":
        return (
          this.grid.isCanMove({
            nextX: this.position.x + this.size * this.scale + this.spead,
            nextY: this.position.y,
          }) ||
          this.grid.isCanMove({
            nextX: this.position.x + this.size * this.scale + this.spead,
            nextY: this.position.y + this.size * this.scale,
          })
        );
      case "left":
        return (
          this.grid.isCanMove({
            nextX: this.position.x - this.spead,
            nextY: this.position.y,
          }) ||
          this.grid.isCanMove({
            nextX: this.position.x - this.spead,
            nextY: this.position.y + this.size * this.scale,
          })
        );
      case "down":
        return (
          this.grid.isCanMove({
            nextX: this.position.x,
            nextY: this.position.y + this.size * this.scale + this.spead,
          }) ||
          this.grid.isCanMove({
            nextX: this.position.x + this.size * this.scale,
            nextY: this.position.y + this.size * this.scale + this.spead,
          })
        );
    }
  }
}
