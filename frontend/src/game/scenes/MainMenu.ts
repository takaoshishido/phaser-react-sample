import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        const llama = this.add.sprite(512, 384, 'llama', 0)
        .setDepth(100);

        llama.setScale(2);
        llama.play('llama-walk');  
        EventBus.emit('current-scene-ready', this);
    }
}
