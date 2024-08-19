import {
  Project,
  Sprite,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Player from "./Player/Player.js";
import Laser from "./Laser/Laser.js";
import AllAudio from "./AllAudio/AllAudio.js";
import Potato from "./Potato/Potato.js";
import Boom from "./Boom/Boom.js";
import Score from "./Score/Score.js";
import Healthbar from "./Healthbar/Healthbar.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Player: new Player({
    x: 0,
    y: 0,
    direction: -1.5911402711946039,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 7,
  }),
  Laser: new Laser({
    x: 36,
    y: 28,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 2,
  }),
  AllAudio: new AllAudio({
    x: 36,
    y: 28,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 3,
  }),
  Potato: new Potato({
    x: 36.58496214367867,
    y: 348.0826633788957,
    direction: -174,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 150,
    visible: false,
    layerOrder: 1,
  }),
  Boom: new Boom({
    x: -93.66228036509301,
    y: 164.22154795203645,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 4,
  }),
  Score: new Score({
    x: 225,
    y: 127,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 11,
    size: 75,
    visible: false,
    layerOrder: 5,
  }),
  Healthbar: new Healthbar({
    x: 36,
    y: 28,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 7,
    size: 100,
    visible: false,
    layerOrder: 6,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
