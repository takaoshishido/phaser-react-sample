import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');
        this.load.atlas('llama', 'llama.png', 'llama.json');
    }

    create ()
    {
        this.anims.create({
            key: 'llama-walk',
            frames: this.anims.generateFrameNames('llama', {
              prefix: 'llama',
              start: 0,
              end: 5,
              suffix: '.png'
            }),
            frameRate: 8,
            repeat: -1,
          });        
          this.scene.start('MainMenu');
    }
}
