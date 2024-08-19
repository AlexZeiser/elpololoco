/**
 * Represents the game world that manages rendering, updating, and interaction of game elements.
 */
class World {
    ctx;
    canvas;
    level;
    camera_x = 0;
    camera_y = 0;
    throwableObjects = [];
    muteButton;

    constructor(canvas, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.level = level;
        this.muteButton = new MuteButton('soundStummButton');
        this.setBackgroundMusic();
        this.setWorld();
        this.draw();
        this.menuAudio();
    }

    /**
     * Associates players, enemies, and status bars with the world instance.
     */
    setWorld() {
        this.level.players.forEach(player => player.world = this);
        this.level.enemies.forEach(enemy => enemy.world = this);
        this.level.statusbars.forEach(statusbar => statusbar.world = this);
        this.muteButton.world = this;
        this.level.coins.forEach(coin => coin.world = this);
    }

    /**
     * Initializes the background music for the game.
     */
    setBackgroundMusic() {
        this.audioMenu = new Audio('audio/audio.game.mp3');
        this.audioMenu.loop = true;
        this.audioMenu.volume = 0.2;
    }

    /**
     * Updates the state of all game elements in the world.
     */
    update() {
        this.level.clouds.forEach(cloud => cloud.update && cloud.update());
        this.level.backgroundObjects.forEach(bgo => bgo.update && bgo.update());
        this.level.platforms.forEach(platform => platform.update && platform.update());
        this.level.flags.forEach(flag => flag.update && flag.update());
        this.throwableObjects.forEach(throwableObject => throwableObject.update && throwableObject.update());
        this.level.players.forEach(player => player.isAlive && player.update && player.update());
        this.level.statusbars.forEach(statusbar => statusbar.update && statusbar.update());
        this.level.enemies.forEach(enemy => enemy.update && enemy.update());
        this.level.coins.forEach(coin => coin.update && coin.update());
        this.level.bottles.forEach(bottle => bottle.update && bottle.update());
    }

    /**
    * Controls the playback of the menu audio based on the state of the mute button.
    * If the mute button is on, the menu audio plays.
    * If the mute button is off, the menu audio pauses and resets to the beginning.
    */
    menuAudio() {
        if (this.muteButton.isOn) {
            this.audioMenu.play();
        } else {
            this.audioMenu.pause();
            this.audioMenu.currentTime = 0;
        }
    }    

    /**
     * Renders all game elements on the canvas.
     */
    render() {
        this.ctx.translate(this.camera_x, this.camera_y);
        this.level.backgroundObjects.forEach(background => background.render(this.ctx));
        this.ctx.translate(-this.camera_x, -this.camera_y);
        this.ctx.translate(this.camera_x, this.camera_y);
        this.level.clouds.forEach(cloud => cloud.render(this.ctx));
        this.level.platforms.forEach(platform => platform.render(this.ctx));
        this.level.coins.forEach(coin => coin.render(this.ctx));
        this.level.bottles.forEach(bottle => bottle.render(this.ctx));
        this.throwableObjects.forEach(throwableObject => throwableObject.render(this.ctx));
        this.level.flags.forEach(flag => flag.render(this.ctx));
        this.level.enemies.forEach(enemy => { enemy.render(this.ctx); enemy.hpstatusBar && enemy.isAlive && enemy.hpstatusBar.render(this.ctx) });
        this.level.players.forEach(player => { player.render(this.ctx); player.hpstatusBar && player.isAlive && player.hpstatusBar.render(this.ctx) });
        this.ctx.translate(-this.camera_x, -this.camera_y);
        this.ctx.translate(this.camera_x, this.camera_y);
        this.level.statusbars.forEach(statusbar => statusbar.render(this.ctx));
        this.ctx.translate(-this.camera_x, -this.camera_y);
    }

    /**
     * Clears the canvas, updates game state, renders game elements, and requests the next animation frame.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.update();
        this.render();
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }
}