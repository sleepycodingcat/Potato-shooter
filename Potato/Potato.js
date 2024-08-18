/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Potato extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Potato/costumes/1.svg", {
        x: 43.281088552779295,
        y: 30.641011174067586,
      }),
      new Costume("2", "./Potato/costumes/2.svg", {
        x: 40.7156781637411,
        y: 36.34125280427094,
      }),
      new Costume("3", "./Potato/costumes/3.svg", {
        x: 43.28107727279189,
        y: 30.641009888524053,
      }),
      new Costume("4", "./Potato/costumes/4.svg", {
        x: 44.16603951545133,
        y: 33.45058977407862,
      }),
      new Costume("BIG", "./Potato/costumes/BIG.svg", {
        x: 421.1711711711712,
        y: 272.8730008695217,
      }),
    ];

    this.sounds = [
      new Sound("Explosion6", "./Potato/sounds/Explosion6.wav"),
      new Sound("Explosion2", "./Potato/sounds/Explosion2.wav"),
      new Sound("Explosion18", "./Potato/sounds/Explosion18.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
    ];

    this.vars.dir = 29;
    this.vars.speed = 1;
    this.vars.potato = 1;
    this.vars.health = 10;
  }

  *whenGreenFlagClicked() {
    this.stage.vars.score = 0;
    this.costume = 1;
    this.moveBehind();
    this.size = 150;
    this.visible = false;
    yield* this.wait(2);
    while (true) {
      yield* this.newEnemy();
      yield* this.wait(7);
      yield;
    }
  }

  *newEnemy() {
    this.vars.potato = this.random(1, 4);
    this.costume = "BIG";
    this.goto(0, 0);
    this.vars.dir = this.random(-180, 180);
    this.direction = this.toNumber(this.vars.dir);
    this.move(-350);
    this.costume = this.vars.potato;
    this.vars.speed = 1;
    this.vars.health = 10;
    this.createClone();
  }

  *startAsClone() {
    this.visible = true;
    while (true) {
      this.effects.brightness = 0;
      if (this.touching(this.sprites["Laser"].andClones())) {
        yield* this.enemyHit();
      }
      this.costume = "BIG";
      this.x +=
        this.toNumber(this.vars.speed) *
        Math.sin(this.degToRad(this.toNumber(this.vars.dir)));
      this.y +=
        this.toNumber(this.vars.speed) *
        Math.cos(this.degToRad(this.toNumber(this.vars.dir)));
      this.x += this.toNumber(this.stage.vars.shakeDx);
      this.y += this.toNumber(this.stage.vars.shakeDy);
      this.direction += 5;
      yield* this.wrapAround();
      this.costume = this.vars.potato;
      yield;
    }
  }

  *wrapAround() {
    if (this.compare(this.x, 350) > 0) {
      this.x = -350;
    } else {
      if (this.compare(this.x, -350) < 0) {
        this.x = 350;
      }
    }
    if (this.compare(this.y, 280) > 0) {
      this.y = -280;
    } else {
      if (this.compare(this.y, -280) < 0) {
        this.y = 280;
      }
    }
  }

  *enemyHit() {
    if (this.compare(this.vars.health, 0) > 0) {
      this.stage.vars.score++;
      yield* this.startSound("Explosion2");
      this.vars.health--;
      this.effects.brightness = 100;
      return;
    }
    if (this.compare(this.size, 100) > 0) {
      this.stage.vars.score++;
      yield* this.startSound("Explosion18");
      this.vars.health = 3;
      this.stage.vars.bang.push(2);
      this.broadcast("shake");
    } else {
      this.stage.vars.score++;
      yield* this.startSound("Explosion6");
      this.stage.vars.bang.push(1);
    }
    this.stage.vars.bang.push(this.x);
    this.stage.vars.bang.push(this.y);
    this.size = this.size / 2;
    if (this.compare(this.size, 35) < 0) {
      this.deleteThisClone();
    }
    this.vars.speed = this.toNumber(this.vars.speed) * 1.5;
    this.vars.dir += this.random(0, 180);
    this.vars.potato = this.random(1, 4);
    this.createClone();
    this.costume = this.vars.potato;
    this.vars.dir += 120;
    this.vars.potato = this.random(1, 4);
    this.createClone();
    this.vars.dir += 120;
    this.costume = this.vars.potato;
  }
}
