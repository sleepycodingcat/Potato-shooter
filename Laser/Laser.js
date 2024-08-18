/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Laser extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Laser/costumes/costume1.svg", {
        x: 21.333333333333343,
        y: 9.444444444444457,
      }),
    ];

    this.sounds = [
      new Sound("Laser_Shoot16", "./Laser/sounds/Laser_Shoot16.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *startAsClone() {
    yield* this.startSound("Laser_Shoot16");
    this.goto(this.sprites["Player"].x, this.sprites["Player"].y);
    this.direction = this.sprites["Player"].direction;
    this.visible = true;
    while (!this.touching("edge")) {
      this.move(11);
      yield;
    }
    this.deleteThisClone();
  }

  *startAsClone2() {
    while (!this.touching(this.sprites["Potato"].andClones())) {
      yield;
    }
    yield* this.wait(0);
    this.deleteThisClone();
  }
}
