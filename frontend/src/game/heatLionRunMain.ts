import { AUTO, Game } from 'phaser';
import { HeatLionRunScene } from './scenes/HeatLionRunScene';

/**
 * MonsterFireScene 専用の Phaser.Game 設定
 */
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 400,
    height: 300,
    parent: 'heat-lion-run-container',
    backgroundColor: '#1a1a2e',
    scene: [HeatLionRunScene],
    mode: Phaser.Scale.FIT,
    pixelArt: true
};

const StartHeatLionRunScene = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartHeatLionRunScene;
