import { Scene } from 'phaser';

export class HeatLionRunScene extends Scene {
    constructor() {
        super('HeatLionRunScene');
    }

    preload() {
        this.load.setPath('assets');

        this.load.atlas(
          'heatLionRun',
          'heat-lion-run.png',
          'heat-lion-run.json'
        );    }

    create() {
        this.anims.create({
            key: 'heat-lion-run',
            frames: this.anims.generateFrameNames('heatLionRun', {
              start: 0,
              end: 3,
              prefix: 'heat-lion-run',
              suffix: '.png'
            }),
            frameRate: 2,
            repeat: -1,
          });
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const monster = this.add.sprite(centerX, centerY, 'heatLionRun', 'heat-lion-run0.png');
        monster.setScale(5)
        monster.play('heat-lion-run');
    }
}
