/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Boom extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Flash", "./Boom/costumes/Flash.svg", {
        x: 52.48333333333329,
        y: 52.48333333333342,
      }),
      new Costume("GOD RAYS", "./Boom/costumes/GOD RAYS.svg", {
        x: 561.5446654702004,
        y: 542.9318690175693,
      }),
    ];

    this.sounds = [new Sound("pop", "./Boom/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.stage.vars.bang = [];
    while (true) {
      if (this.compare(this.stage.vars.bang.length, 0) > 0) {
        this.costume = this.itemOf(this.stage.vars.bang, 0);
        this.x = this.toNumber(this.itemOf(this.stage.vars.bang, 1));
        this.y = this.toNumber(this.itemOf(this.stage.vars.bang, 2));
        for (let i = 0; i < 3; i++) {
          this.stage.vars.bang.splice(0, 1);
          yield;
        }
        this.createClone();
      }
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    this.direction = this.random(-180, 180);
    yield* this.wait(0);
    if (this.costumeNumber === 2) {
      for (let i = 0; i < 3; i++) {
        this.direction += 1;
        yield;
      }
    }
    for (let i = 0; i < 4; i++) {
      this.effects.ghost += 25;
      this.direction += 1;
      yield;
    }
    this.deleteThisClone();
  }
}
