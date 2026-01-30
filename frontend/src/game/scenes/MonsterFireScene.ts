import { Scene } from 'phaser';

/**
 * モンスターが火を吹くアニメーションを表示するシーン
 * monster-heat.png スプライトシート（3列×2行）の下段を使用
 */
export class MonsterFireScene extends Scene {
    constructor() {
        super('MonsterFireScene');
    }

    preload() {
        this.load.setPath('assets');

        this.load.atlas(
          'monsterHeat',
          'monster-heat.png',
          'monster-heat.json'
        );    }

    create() {
        // 下段3フレーム（3,4,5）で火を吹くアニメーションを定義
        this.anims.create({
            key: 'fire-breath',
            frames: this.anims.generateFrameNames('monsterHeat', {
              start: 3,
              end: 5,
              prefix: 'monster-heat',
              suffix: '.png'
            }),
            frameRate: 2,
            repeat: -1,
          });
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const monster = this.add.sprite(centerX, centerY, 'monsterHeat', 'monster-heat3.png');
        monster.play('fire-breath');
    }
}
