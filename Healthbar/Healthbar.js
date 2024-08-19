/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Healthbar extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("h1", "./Healthbar/costumes/h1.svg", { x: 21.25, y: 3.5 }),
      new Costume("h2", "./Healthbar/costumes/h2.svg", { x: 21.25, y: 3.5 }),
      new Costume("h3", "./Healthbar/costumes/h3.svg", { x: 21.25, y: 3.5 }),
      new Costume("h4", "./Healthbar/costumes/h4.svg", { x: 21.25, y: 3.5 }),
      new Costume("h5", "./Healthbar/costumes/h5.svg", { x: 21.25, y: 3.5 }),
      new Costume("h6", "./Healthbar/costumes/h6.svg", { x: 21.25, y: 3.5 }),
      new Costume("h7", "./Healthbar/costumes/h7.svg", { x: 21.25, y: 3.5 }),
      new Costume("h8", "./Healthbar/costumes/h8.svg", { x: 21.25, y: 3.5 }),
      new Costume("h9", "./Healthbar/costumes/h9.svg", { x: 21.25, y: 3.5 }),
      new Costume("h10", "./Healthbar/costumes/h10.svg", { x: 21.25, y: 3.5 }),
      new Costume("h11", "./Healthbar/costumes/h11.svg", { x: 21.25, y: 3.5 }),
    ];

    this.sounds = [new Sound("pop", "./Healthbar/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.stage.vars.healths = [];
  }

  *startAsClone() {
    this.x = this.toNumber(this.itemOf(this.stage.vars.healths, 0));
    this.y = this.toNumber(this.itemOf(this.stage.vars.healths, 1));
    this.costume = 10 * this.toNumber(this.itemOf(this.stage.vars.healths, 2));
    this.stage.vars.healths.splice(0, 1);
    this.stage.vars.healths.splice(0, 1);
    this.stage.vars.healths.splice(0, 1);
    if (!this.touching("edge")) {
      this.moveAhead();
      this.visible = true;
      yield* this.wait(0);
    }
    this.deleteThisClone();
  }

  *showHealthbarOfOffestY(health, max, y) {
    this.stage.vars.healths.push(this.x);
    this.stage.vars.healths.push(this.y + this.toNumber(y));
    this.stage.vars.healths.push(this.toNumber(health) / this.toNumber(max));
    this.sprites["Healthbar"].createClone();
  }
}
