import { AUTO, Game } from 'phaser';
import { MonsterFireScene } from './scenes/MonsterFireScene';

/**
 * MonsterFireScene 専用の Phaser.Game 設定
 */
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 400,
    height: 300,
    parent: 'monster-container',
    backgroundColor: '#1a1a2e',
    scene: [MonsterFireScene]
};

const StartMonsterGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartMonsterGame;
