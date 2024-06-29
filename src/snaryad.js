export default class Snaryad {
  constructor({ typeTank, scale, spead, direction, position, grid }) {
    this.typeTank = typeTank;
    this.scale = scale * 0.85;
    this.grid = grid;
    this.spead = spead;
    this.size = 8;
    this.isMove = true;
    this.direction = direction;
    this.position = position;
    this.spritePosition = { x: 0, y: 0 };
  }
  update(key, config) {
    this.moveTank(key, config);
  }

  getTankByParameters() {
    let x = 0;
    let y = 0;
    if (this.isMove) this.animation = this.animation ? 0 : 1;
    return {
      x:
        x +
        2 * this.size * this.direction +
        this.size * this.animation +
        this.size * 8 * this.typeTank.color.kx,
      y:
        y +
        this.size * this.typeTank.level +
        this.size * 8 * this.typeTank.color.ky,
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

  moveTank(key, config) {
    switch (key) {
      case "ArrowUp":
        this.direction = config.direction.up;
        this.move("y", -this.spead, config, key);
        break;
      case "ArrowRight":
        this.direction = config.direction.right;
        this.move("x", this.spead, config, key);
        break;
      case "ArrowLeft":
        this.direction = config.direction.left;
        this.move("x", -this.spead, config, key);
        break;
      case "ArrowDown":
        this.direction = config.direction.down;
        this.move("y", this.spead, config, key);
        break;
      case "Escape":
        if (this.typeTank.level === 7) return;
        this.typeTank.level++;
        break;
      case "Space":
        if (this.typeTank.level === 0) return;
        this.typeTank.level--;
        break;
    }
    this.spritePosition = this.getTankByParameters();
  }

  move(axis, spead, config, key) {
    if (!this.isMove) return;
    if (this.isCanMove(key)) {
      return;
    }
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

  isCanMove(key) {
    switch (key) {
      case "ArrowUp":
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
      case "ArrowRight":
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
      case "ArrowLeft":
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
      case "ArrowDown":
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