export default class View {
  constructor(option) {
    this.canvas = option.canvas;
    this.context = option.canvas.getContext("2d");
    this.sprite = option.sprite;
  }
  async init() {
    await this.sprite.load();
  }
  update(world) {
    this.clearScrean();
    this.render(world);
  }
  render(world) {
    world.render(this.context, this.sprite);
  }
  clearScrean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
