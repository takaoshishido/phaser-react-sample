import { GameObjects, Scene } from 'phaser';
import { GLOBE_FRAMES, GLOBE_PALETTE, GLOBE_PIXEL_SIZE } from '../data/GlobeData';
import { EventBus } from '../EventBus';
import { PixelRenderer } from '../utils/PixelRenderer';

export class PokemonIntro extends Scene {
  private globeContainer: GameObjects.Container | null = null;
  private globeGraphics: GameObjects.Graphics | null = null;
  private monsterContainers: GameObjects.Container[] = [];
  private currentGlobeFrame = 0;
  private globeTimer: Phaser.Time.TimerEvent | null = null;

  constructor() {
    super('PokemonIntro');
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#000000');

    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // 地球儀を作成（画面中央やや下）
    this.createGlobe(centerX, centerY + 80);

    // モンスター3体を地球儀の上に配置
    this.createMonstersOnGlobe(centerX, centerY - 60);

    EventBus.emit('current-scene-ready', this);
  }

  /**
   * 回転する地球儀を作成
   */
  private createGlobe(x: number, y: number): void {
    // 初期フレームのGraphicsを作成
    this.globeGraphics = PixelRenderer.createSprite(
      this,
      GLOBE_FRAMES[0],
      GLOBE_PALETTE,
      GLOBE_PIXEL_SIZE
    );

    // 中心を原点にオフセット
    const { width, height } = PixelRenderer.getSpriteSize(GLOBE_FRAMES[0], GLOBE_PIXEL_SIZE);
    this.globeGraphics.x = -width / 2;
    this.globeGraphics.y = -height / 2;

    this.globeContainer = this.add.container(x, y, [this.globeGraphics]);

    // フェードイン
    this.globeContainer.setAlpha(0);
    this.tweens.add({
      targets: this.globeContainer,
      alpha: 1,
      duration: 800,
      ease: 'Sine.easeOut',
    });

    // 回転アニメーション（フレーム切り替え）
    this.globeTimer = this.time.addEvent({
      delay: 150,
      callback: this.updateGlobeFrame,
      callbackScope: this,
      loop: true,
    });
  }

  /**
   * 地球儀のフレームを更新して回転を表現
   */
  private updateGlobeFrame(): void {
    if (!this.globeGraphics || !this.globeContainer) return;

    this.currentGlobeFrame = (this.currentGlobeFrame + 1) % GLOBE_FRAMES.length;

    // 現在のGraphicsをクリアして再描画
    this.globeGraphics.clear();
    const frameData = GLOBE_FRAMES[this.currentGlobeFrame];

    for (let row = 0; row < frameData.length; row++) {
      for (let col = 0; col < frameData[row].length; col++) {
        const colorIndex = frameData[row][col];
        if (colorIndex !== 0) {
          this.globeGraphics.fillStyle(GLOBE_PALETTE[colorIndex], 1);
          this.globeGraphics.fillRect(
            col * GLOBE_PIXEL_SIZE,
            row * GLOBE_PIXEL_SIZE,
            GLOBE_PIXEL_SIZE,
            GLOBE_PIXEL_SIZE
          );
        }
      }
    }
  }

  /**
   * 地球儀の上に3種類のモンスターを配置
   */
  private createMonstersOnGlobe(centerX: number, baseY: number): void {
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

    // 3体の配置情報（地球儀の頂点付近に配置）
    const monstersConfig = [
      { x: centerX - 100, y: baseY + 30, palette: paletteBlue, bounce: 12, delay: 300 },
      { x: centerX, y: baseY, palette: paletteRed, bounce: 18, delay: 400 },
      { x: centerX + 100, y: baseY + 30, palette: paletteGreen, bounce: 14, delay: 500 },
    ];

    this.monsterContainers = monstersConfig.map((config) => {
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

      return container;
    });
  }

  /**
   * シーン破棄時のクリーンアップ
   */
  shutdown(): void {
    if (this.globeTimer) {
      this.globeTimer.destroy();
      this.globeTimer = null;
    }
  }
}
