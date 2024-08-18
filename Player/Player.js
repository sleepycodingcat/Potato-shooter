/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Player/costumes/costume1.svg", {
        x: 21.604105000000033,
        y: 19.350000000000023,
      }),
    ];

    this.sounds = [new Sound("pop", "./Player/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];

    this.vars.speedX = -1.0695918406120232e-13;
    this.vars.speedY = -1.6440828890345206e-13;
    this.vars.fireRate = 0;
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.moveAhead();
    this.vars.speedX = 0;
    this.vars.speedY = 0;
    while (true) {
      yield* this.moveY(
        this.toNumber(this.keyPressed("up arrow")) -
          this.toNumber(this.keyPressed("down arrow"))
      );
      yield* this.moveX(
        this.toNumber(this.keyPressed("right arrow")) -
          this.toNumber(this.keyPressed("left arrow"))
      );
      yield* this.moveX(
        this.toNumber(this.keyPressed("d")) -
          this.toNumber(this.keyPressed("a"))
      );
      yield* this.moveY(
        this.toNumber(this.keyPressed("w")) -
          this.toNumber(this.keyPressed("s"))
      );
      this.direction = this.radToScratch(
        Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
      );
      yield* this.shoot();
      yield;
    }
  }

  *moveX(joystickX) {
    this.vars.speedX += 0.9 * this.toNumber(joystickX);
    this.vars.speedX = 0.9 * this.toNumber(this.vars.speedX);
    this.x += this.toNumber(this.vars.speedX);
  }

  *moveY(joystickY) {
    this.vars.speedY += 0.9 * this.toNumber(joystickY);
    this.vars.speedY = 0.9 * this.toNumber(this.vars.speedY);
    this.y += this.toNumber(this.vars.speedY);
  }

  *shoot() {
    if (this.compare(this.vars.fireRate, 0) > 0) {
      this.vars.fireRate--;
    } else {
      if (this.keyPressed("space") || this.mouse.down) {
        this.sprites["Laser"].createClone();
        this.vars.fireRate = 2;
      }
    }
  }
}
