import { useLayoutEffect, useRef } from 'react';
import StartMonsterGame from './game/monsterMain';

/**
 * モンスターの火を吹くアニメーションを表示するコンポーネント
 * PhaserGame.tsx とは独立した Phaser.Game インスタンスを管理
 */
export default function MonsterGame() {
    const game = useRef<Phaser.Game | null>(null);

    useLayoutEffect(() => {
        if (game.current === null) {
            game.current = StartMonsterGame('monster-container');
        }

        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = null;
            }
        };
    }, []);

    return <div id="monster-container"></div>;
}
