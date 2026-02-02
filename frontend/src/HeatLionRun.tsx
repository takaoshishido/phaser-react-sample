import { useLayoutEffect, useRef } from 'react';
import StartHeatLionRunScene from './game/heatLionRunMain';

export default function HeatLionRun() {
    const game = useRef<Phaser.Game | null>(null);

    useLayoutEffect(() => {
        if (game.current === null) {
            game.current = StartHeatLionRunScene('heat-lion-run-container');
        }

        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = null;
            }
        };
    }, []);

    return <div id="heat-lion-run-container"></div>;
}
