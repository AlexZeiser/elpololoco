/**
 * Represents an enemy character in the game.
 */
class Enemy extends Character {

    /**
     * Constructs an instance of Enemy.
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {number} hp
     * @param {number} damage 
     * @param {string} audio 
     */
    constructor(x, y, width, height, hp, damage, audio) {
        super(null, x, y, width, height, hp, damage);
        this.chickenDieSound = new Audio(audio);
        this.chickenDieSound.volume = 0.077;   
    }

    /**
     * Updates the state of the enemy.
     */
    update() {
        this.checkCollision();
        this.speed = this.maxSpeed;
        this.handleDirectionChange();
        this.updateHPStatusBar();
    }

    /**
     * Handles direction changes based on platform collisions.
     */
    handleDirectionChange() {
        this.world.level.platforms.forEach(platform => {
            if (this.direction == "right" && this.isBlockingFromRight(platform)) {
                this.direction = "left";
            }
            
            if (this.direction == "left" && this.isBlockingFromLeft(platform)) {
                this.direction = "right";
            }
        });
    }

    /**
     * Updates the position of the HP status bar based on the enemy's position.
     */
    updateHPStatusBar() {
        if (this.hpstatusBar) {
            this.hpstatusBar.x = this.x;
            this.hpstatusBar.y = this.y - 50;
        }
    }

    /**
     * Initiates the animation loop for the enemy.
     */
    animate() {
        this.startMovementAnimation();
        this.startStateAnimation();
    }

    /**
     * Starts the movement animation of the enemy.
     */
    startMovementAnimation() {
        setInterval(() => {
            if (this.isAlive) {
                if (this.direction == "left") {
                    this.moveLeft(this.speed);
                } else {
                    this.moveRight(this.speed);
                }
            }
        }, 1000 / 17);
    }

    /**
     * Starts the state animation of the enemy (walking animation).
     */
    startStateAnimation() {
        setInterval(() => {
            if (this.isAlive) {
                this.playAnimation(this.IMAGES_WALKING);                
            } 
        }, 120);
    }

    /**
     * Plays the death sound of the enemy.
     */
    playDeathSound(){
        if (this.world.muteButton.isOn) {
            this.chickenDieSound.play();
        }
    }

    /**
     * Returns an array of health status bar image paths based on the given color.
     * @param {string} color - The color of the health status bar (blue, green, or orange).
     * @returns {string[]} Array of image paths for the health status bar.
     */
    getHpStatusImageColor(color) {
        if (color == "blue") {
            return [
                'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
                'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
                'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
                'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
                'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
                'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
            ];
        } else if (color == "green") {
            return [
                'img/7_statusbars/2_statusbar_endboss/green/green0.png',
                'img/7_statusbars/2_statusbar_endboss/green/green20.png',
                'img/7_statusbars/2_statusbar_endboss/green/green40.png',
                'img/7_statusbars/2_statusbar_endboss/green/green60.png',
                'img/7_statusbars/2_statusbar_endboss/green/green80.png',
                'img/7_statusbars/2_statusbar_endboss/green/green100.png',
            ];
        } else if (color == "orange") {
            return [
                'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
                'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
                'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
                'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
                'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
                'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
            ];
        }
    }
}

/**
 * Mixes in the methods from the Damageable object into the Enemy prototype.
 * This allows instances of Enemy to use methods defined in Damageable.
 */
Object.assign(Enemy.prototype, Damageable);

/**
 * Mixes in the methods from the Lootable object into the Enemy prototype.
 * This allows instances of Enemy to use methods defined in Lootable.
 */
Object.assign(Enemy.prototype, Lootable);
