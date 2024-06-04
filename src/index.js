import "../styles/mainStyle.css";
import World from './world';
import View from './veiw';
import Game from './game';
import levels from '../data/levels';
import Sprite from "./sprite";
import config from "../data/config";

const canvas = document.querySelector('canvas');
const sprite = new Sprite('../source/sprites3.png');
canvas.width = config.worldSize;
canvas.height = config.worldSize;
console.log(config.worldSize);

const game = new Game({
  world: new World(new levels(config), config),
  view: new View({canvas, sprite})
});

game.init().then(() => game.start());
console.log(game);