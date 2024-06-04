export default class Game {
  constructor(option) {
    this.world = option.world;
    this.view = option.view;
    this.levels = option.levels;
    this.key = '';
    this.render = this.render.bind(this);
  }
  start() {
    requestAnimationFrame(this.render);
  }
  
  async init() {
    this.view.init();
    document.addEventListener("keydown", event => {
      event.preventDefault();
      this.key = event.code;
    });
    this.view.init();
    document.addEventListener("keyup", event => {
      event.preventDefault();
      this.key = "";
    });
  }

  render() {
    this.world.update(this.key);
    this.view.update(this.world);
    requestAnimationFrame(this.render)
  }
}
