import { GameObjects, Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { PixelRenderer } from '../utils/PixelRenderer';

export class PokemonIntro extends Scene {
  private worldMap: GameObjects.Image | null = null;

  constructor() {
    super('PokemonIntro');
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#000000');

    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // ワールドマップを表示
    this.createWorldMap(centerX, centerY);

    // モンスター3体をワールドマップの上に配置
    this.createMonstersOnMap(centerX, centerY);

    EventBus.emit('current-scene-ready', this);
  }

  /**
   * ワールドマップ画像を表示
   */
  private createWorldMap(x: number, y: number): void {
    this.worldMap = this.add.image(x, y, 'world-map');
    this.worldMap.setDepth(0);

    // 画面サイズに合わせてスケーリング
    const scaleX = this.cameras.main.width / this.worldMap.width;
    const scaleY = this.cameras.main.height / this.worldMap.height;
    const scale = Math.min(scaleX, scaleY);
    this.worldMap.setScale(scale);
  }

  /**
   * ワールドマップの上に3種類のモンスターを配置
   */
  private createMonstersOnMap(centerX: number, centerY: number): void {
    const pixelSize = 6;

    // モンスターのドット絵データ（共通）
    const monsterSprite: number[][] = [
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0],
      [0, 0, 1, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 1, 0, 0],
      [0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 0],
      [0, 1, 2, 3, 3, 1, 1, 3, 3, 1, 1, 3, 3, 2, 1, 0],
      [1, 2, 2, 3, 3, 1, 4, 3, 3, 1, 4, 3, 3, 2, 2, 1],
      [1, 2, 2, 3, 3, 1, 1, 3, 3, 1, 1, 3, 3, 2, 2, 1],
      [1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1],
      [1, 2, 2, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 2, 2, 1],
      [1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1],
      [0, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1, 0],
      [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
      [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
      [0, 0, 0, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 2, 2, 1, 1, 2, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    ];

    // 3種類のパレット（より明るい色）
    const paletteBlue: Record<number, number> = {
      1: 0x404040,
      2: 0x5090d0,
      3: 0x80c0ff,
      4: 0x202020,
    };

    const paletteRed: Record<number, number> = {
      1: 0x404040,
      2: 0xd05070,
      3: 0xff8090,
      4: 0x202020,
    };

    const paletteGreen: Record<number, number> = {
      1: 0x404040,
      2: 0x50d090,
      3: 0x80ffb0,
      4: 0x202020,
    };

    // 3体の配置情報（ワールドマップの上に配置）
    const monstersConfig = [
      { x: centerX - 100, y: centerY - 30, palette: paletteBlue, bounce: 12, delay: 300 },
      { x: centerX, y: centerY - 60, palette: paletteRed, bounce: 18, delay: 400 },
      { x: centerX + 100, y: centerY - 30, palette: paletteGreen, bounce: 14, delay: 500 },
    ];

    monstersConfig.forEach((config) => {
      const container = PixelRenderer.createCenteredSprite(
        this,
        config.x,
        config.y,
        monsterSprite,
        config.palette,
        pixelSize
      );

      // フェードイン、深度を設定してモンスターを前面に
      container.setAlpha(0);
      container.setDepth(10);
      this.tweens.add({
        targets: container,
        alpha: 1,
        duration: 700,
        ease: 'Sine.easeOut',
        delay: config.delay,
      });

      // バウンスアニメーション
      this.tweens.add({
        targets: container,
        y: config.y - config.bounce,
        duration: 600,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1,
        delay: config.delay + 200,
      });
    });
  }
}
