/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class AllAudio extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./AllAudio/costumes/costume1.svg", {
        x: 0,
        y: 0,
      }),
    ];

    this.sounds = [
      new Sound(
        "n-Dimensions (Main Theme - Retro",
        "./AllAudio/sounds/n-Dimensions (Main Theme - Retro.wav"
      ),
      new Sound(
        "marshmello - FinD Me.mp3",
        "./AllAudio/sounds/marshmello - FinD Me.mp3.wav"
      ),
      new Sound("Laser_Shoot16", "./AllAudio/sounds/Laser_Shoot16.wav"),
      new Sound("Explosion6", "./AllAudio/sounds/Explosion6.wav"),
      new Sound("Explosion2", "./AllAudio/sounds/Explosion2.wav"),
      new Sound("Explosion18", "./AllAudio/sounds/Explosion18.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];

    this.vars.music = 2;
  }

  *whenGreenFlagClicked() {
    while (true) {
      this.vars.music = this.random(1, 2);
      if (this.toNumber(this.vars.music) === 1) {
        yield* this.playSoundUntilDone("n-Dimensions (Main Theme - Retro");
      }
      if (this.toNumber(this.vars.music) === 2) {
        yield* this.playSoundUntilDone("marshmello - FinD Me.mp3");
      }
      yield;
    }
  }
}
