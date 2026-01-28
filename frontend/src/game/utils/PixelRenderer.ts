import { GameObjects, Scene } from 'phaser';

/**
 * ドット絵描画のユーティリティクラス
 * どのシーンからでも呼び出し可能な静的メソッドを提供
 */
export class PixelRenderer {
  /**
   * ドット絵データからGraphicsオブジェクトを生成
   * @param scene - Phaserシーン
   * @param spriteData - 2次元配列のドット絵データ（0は透明）
   * @param palette - カラーインデックスと色のマッピング
   * @param pixelSize - 1ピクセルあたりのサイズ
   * @returns 描画済みのGraphicsオブジェクト（原点は左上）
   */
  static createSprite(
    scene: Scene,
    spriteData: number[][],
    palette: Record<number, number>,
    pixelSize: number
  ): GameObjects.Graphics {
    const graphics = scene.add.graphics();

    for (let row = 0; row < spriteData.length; row++) {
      for (let col = 0; col < spriteData[row].length; col++) {
        const colorIndex = spriteData[row][col];
        if (colorIndex !== 0) {
          graphics.fillStyle(palette[colorIndex], 1);
          graphics.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
        }
      }
    }

    return graphics;
  }

  /**
   * ドット絵をContainerでラップし、中心を原点に設定
   * @param scene - Phaserシーン
   * @param x - 配置X座標
   * @param y - 配置Y座標
   * @param spriteData - 2次元配列のドット絵データ
   * @param palette - カラーインデックスと色のマッピング
   * @param pixelSize - 1ピクセルあたりのサイズ
   * @returns 中心を原点としたContainer
   */
  static createCenteredSprite(
    scene: Scene,
    x: number,
    y: number,
    spriteData: number[][],
    palette: Record<number, number>,
    pixelSize: number
  ): GameObjects.Container {
    const graphics = this.createSprite(scene, spriteData, palette, pixelSize);

    // 中心を原点にするためにオフセット
    const width = spriteData[0].length * pixelSize;
    const height = spriteData.length * pixelSize;
    graphics.x = -width / 2;
    graphics.y = -height / 2;

    return scene.add.container(x, y, [graphics]);
  }

  /**
   * スプライトデータのサイズを取得
   * @param spriteData - 2次元配列のドット絵データ
   * @param pixelSize - 1ピクセルあたりのサイズ
   * @returns { width, height }
   */
  static getSpriteSize(
    spriteData: number[][],
    pixelSize: number
  ): { width: number; height: number } {
    return {
      width: spriteData[0].length * pixelSize,
      height: spriteData.length * pixelSize,
    };
  }
}
