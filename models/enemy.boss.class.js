/**
 * Represents the Endboss enemy character in the game.
 * Extends the Enemy class.
 */
class Endboss extends Enemy {    
    /**
     * Standard image path for the Endboss when standing.
     */
    STANDART_IMAGE = 'img/4_enemie_boss_chicken/1_walk/G4.png';   

    /**
     * Array of image paths for the Endboss when walking.
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
   
    /**
     * Array of image paths for the Endboss when in alert state.
     */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    
    /**
     * Array of image paths for the Endboss when hurt.
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    /**
     * Array of image paths for the Endboss when dead.
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Creates a new Endboss instance.
     * @param {number} x - The x-coordinate of the Endboss.
     * @param {number} y - The y-coordinate of the Endboss.
     */
    constructor(x, y) {
        super(x, y, 445, 470, 300, 130).loadImage(this.STANDART_IMAGE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.applyGravity();
        this.speed = 15;
        this.direction = "left";
        let images = this.getHpStatusImageColor("orange");
        this.hpstatusBar = new HPStatusbar(this.x, this.y - 200, images, this.width);
        this.audioMadChicken = new Audio('audio/mad.chicken.mp3');
        this.audioDead = new Audio('audio/boss.dead.mp3');
        this.audioMadChicken.volume = 0.1;
        this.audioDead.volume = 0.3;
        this.text = "";
        this.offSetBottom = 40;
        this.offSetTop = 80;
        this.offSetLeft = 20;
        this.offSetRight = 40;
    }

    /**
     * Updates the state of the Endboss, including checking collisions, direction changes, 
     * playing sounds, and updating the HP status bar position.
     */
    update() {
        this.checkCollision();
        this.handleDirectionChange();
        this.handlePlayerInteraction();
        this.updateHPStatusBar();
    }

    /**
     * Handles direction changes based on platform collisions.
     */
    handleDirectionChange() {
        this.world.level.platforms.forEach(platform => {
            if (this.isBlockingFromRight(platform)) {
                this.direction = "left";
            }
            if (this.isBlockingFromLeft(platform)) {
                this.direction = "right";
            }
        });
    }

    /**
     * Handles interactions with players, including playing audio based on visibility and life state.
     */
    handlePlayerInteraction() {
        this.world.level.players.forEach(player => {
            this.seenRadius = 800;
            this.audioDead.pause();
            if (this.isSeen(player) && this.isAlive && player.isAlive) {
                this.handleSeenPlayer();
            } else {
                this.handleUnseenPlayer();
            }
        });
    }

    /**
     * Plays the hurt animation of the Endboss.
     */
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT, () => {
            setTimeout(() => {
                // Hurt animation actions (if any)
            }, 3000);
        });
    }

    /**
     * Handles actions when the player is seen by the Endboss.
     */
    handleSeenPlayer() {
        if (this.world.muteButton.isOn && this.isAlive) {
            this.audioMadChicken.play();
        }
    }

    /**
     * Handles actions when the player is not seen by the Endboss or when the Endboss is not alive.
     */
    handleUnseenPlayer() {
        this.audioMadChicken.pause();
        if (!this.isAlive) {
            this.playDeadSound();
        }
    }

    /**
     * Plays the death sound of the Endboss if the mute button is on.
     */
    playDeadSound() {
        if (this.world.muteButton.isOn) {
            this.audioDead.play();
        }
        setTimeout(() => {
            this.audioDead.pause();
            this.audioDead.currentTime = 0;
        }, 1800);
    }

    /**
     * Updates the position of the HP status bar based on the Endboss's position.
     */
    updateHPStatusBar() {
        if (this.hpstatusBar) {
            this.hpstatusBar.x = this.x;
            this.hpstatusBar.y = this.y - 50;
        }
    }

    /**
     * Animates the Endboss by moving it and playing the appropriate animations based on its state.
     */
    animate() {
        this.startMovementAnimation();
        this.startStateAnimation();
    }

    /**
     * Starts the movement animation of the Endboss.
     */
    startMovementAnimation() {
        setInterval(() => {
            if (this.isAlive && this.isSeenBool) {
                if (this.direction == "left") {
                    this.moveLeft(this.speed);
                } else {
                    this.moveRight(this.speed);
                }
            }
        }, 1000 / 17);
    }

    /**
     * Starts the state animation of the Endboss (walking or alert).
     */
    startStateAnimation() {
        setInterval(() => {
            if (this.isAlive) {
                if (this.isSeenBool) {
                    this.playAnimation(this.IMAGES_WALKING);
                } else {
                    this.playAnimation(this.IMAGES_ALERT);
                }
            } else {
                this.handleDeath();
            }
        }, 120);
    }

    /**
     * Handles actions when the Endboss dies, such as removing the HP status bar.
     */
    handleDeath() {
        if (this.hpstatusBar) {
            this.hpstatusBar = null;
        }
        this.isAlive = false;
    }

    /**
     * Retrieves the appropriate HP status bar images based on the specified color.
     * @param {string} color - The color of the HP status bar ('blue', 'green', or 'orange').
     * @returns {string[]} An array of image paths for the HP status bar.
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
