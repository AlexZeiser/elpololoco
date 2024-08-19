/**
 * Represents a player character in the game, extending {@link Character}.
 */
class Player extends Character {
    /**
     * Constructs a Player object. 
     * @param {Object} options, @param {string} options.name, @param {number} options.x, @param {number} options.y,
     * @param {number} options.width, @param {number} options.height, @param {number} options.hp,
     * @param {number} options.damage, @param {Keyboard} options.keyboard, @param {string} options.color
     */
    constructor({ name, x, y, width, height, hp, damage, keyboard, color }) {
        super(name, x, y, width, height, hp, damage);
        this.IMAGES_WALKING = [
            'img/2_character_pepe/2_walk/W-21.png', 'img/2_character_pepe/2_walk/W-22.png', 'img/2_character_pepe/2_walk/W-23.png', 'img/2_character_pepe/2_walk/W-24.png', 'img/2_character_pepe/2_walk/W-25.png', 'img/2_character_pepe/2_walk/W-26.png'
        ];
        this.IMAGES_IDLE = [
            'img/2_character_pepe/1_idle/idle/I-1.png', 'img/2_character_pepe/1_idle/idle/I-2.png', 'img/2_character_pepe/1_idle/idle/I-3.png', 'img/2_character_pepe/1_idle/idle/I-4.png', 'img/2_character_pepe/1_idle/idle/I-5.png', 'img/2_character_pepe/1_idle/idle/I-6.png', 'img/2_character_pepe/1_idle/idle/I-7.png', 'img/2_character_pepe/1_idle/idle/I-8.png', 'img/2_character_pepe/1_idle/idle/I-9.png', 'img/2_character_pepe/1_idle/idle/I-10.png',
        ];
        this.IMAGES_LONG_IDLE = [
            'img/2_character_pepe/1_idle/long_idle/I-11.png', 'img/2_character_pepe/1_idle/long_idle/I-12.png', 'img/2_character_pepe/1_idle/long_idle/I-13.png', 'img/2_character_pepe/1_idle/long_idle/I-14.png', 'img/2_character_pepe/1_idle/long_idle/I-15.png', 'img/2_character_pepe/1_idle/long_idle/I-16.png', 'img/2_character_pepe/1_idle/long_idle/I-17.png', 'img/2_character_pepe/1_idle/long_idle/I-18.png', 'img/2_character_pepe/1_idle/long_idle/I-19.png', 'img/2_character_pepe/1_idle/long_idle/I-20.png'
        ];
        this.IMAGES_JUMPING = [
            'img/2_character_pepe/3_jump/J-34.png'
        ]; this.IMAGES_FALLING = [
            'img/2_character_pepe/3_jump/J-35.png', 'img/2_character_pepe/3_jump/J-36.png', 'img/2_character_pepe/3_jump/J-37.png', 'img/2_character_pepe/3_jump/J-38.png'
        ];       
        this.IMAGES_HURT = [
            'img/2_character_pepe/4_hurt/H-41.png', 'img/2_character_pepe/4_hurt/H-42.png', 'img/2_character_pepe/4_hurt/H-43.png',
        ];
        this.IMAGES_DEAD = [
            'img/2_character_pepe/5_dead/D-51.png', 'img/2_character_pepe/5_dead/D-52.png', 'img/2_character_pepe/5_dead/D-53.png', 'img/2_character_pepe/5_dead/D-54.png', 'img/2_character_pepe/5_dead/D-55.png', 'img/2_character_pepe/5_dead/D-56.png', 'img/2_character_pepe/5_dead/D-57.png'
        ];
        this.hpStatusImages = {
            blue: ['img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', 'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png', 'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png', 'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png', 'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png', 'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
            ],
            green: ['img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png', 'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png', 'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png', 'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png', 'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png', 'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
            ],
            orange: ['img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png', 'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png', 'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png', 'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png', 'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png', 'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
            ]
        }
        this.loadImages(this.IMAGES_WALKING); this.loadImages(this.IMAGES_JUMPING); this.loadImages(this.IMAGES_FALLING);
        this.loadImages(this.IMAGES_HURT); this.loadImages(this.IMAGES_DEAD); this.loadImages(this.IMAGES_IDLE); this.loadImages(this.IMAGES_LONG_IDLE);
        this.animate(); this.idleAnimation(); this.playAnimationJumping(); this.applyGravity(); this.attack(); this.afkTimer();
        this.seconds = 0;
        this.offSetBottom = 12;
        this.offSetTop = 130;
        this.offSetLeft = 20;
        this.offSetRight = 45;
        this.walkHeight = 20;
        this.speedY = 0;
        this.jumpHeight = 55;
        this.keyboard = keyboard;
        this.hpstatusBar = new HPStatusbar(this.x, this.y - 50, this.getHpStatusImageColor(color), this.width);
        this.jumpSound = new Audio('audio/jump.mp3');
        this.moveSound = new Audio('audio/running.mp3');
        this.snoringSound = new Audio('audio/snoring.mp3');
        this.openboxSound = new Audio('audio/openbox.mp3');
        this.audioCoin = new Audio('audio/coin.mp3');
        this.audioBottle = new Audio('audio/bottle.mp3');
        this.moveSound.volume = 0.3;
        this.jumpSound.playbackRate = 2;
        this.jumpSound.volume = 0.1;
        this.openboxSound.playbackRate = 1.8;
        this.openboxSound.volume = 0.3;
        this.audioCoin.playbackRate = 3;
        this.audioCoin.volume = 0.2;
        this.audioBottle.playbackRate = 1.5;
        this.audioBottle.volume = 0.2;
        this.fontSize = 20;
        this.text = name;
        this.offsetX = 60;
        this.offsetY = 100;
        this.isClose = false;
        this.fontColor = "#FF8000";
    }

    /**
     * Perform a left movement test and @param {number} speed - The speed of movement.
     */
    testL(speed) {
        let isBlocking = false;
        this.world.level.platforms.forEach(platform => {
            isBlocking = this.isBlockingFromSide(platform);
        });
        if (!isBlocking) {
            this.move(this.moveLeft, this.speed);
        }
    }

    /**
     * Perform a right movement test and @param {number} speed
     */
    testR(speed) {
        let isBlocking = false;
        this.world.level.platforms.forEach(platform => {
            isBlocking = this.isBlockingFromSide(platform);

        });
        if (!isBlocking) {
            this.move(this.moveRight, this.speed);
        }
    }

    /**     
     * Move the player in a given direction with a specified speed and @param {Function} moveFunc and @param {number} speed
     */
    move(moveFunc, speed) {
        let func = moveFunc.bind(this);

        func(speed);
        if (this.isStandingOnPlatform || this.isStandingOnGround()) {
            if (this.world.muteButton.isOn) {
                this.moveSound.play();
            }
        }
    }

    /**
     * Updates the player's state in the game world.
     */
    update() {
        this.speed = this.maxSpeed;
        this.checkCollision();
        this.updatePlatforms();
        this.resetFlags();
        this.handleMovement();
        this.handleJump();
        this.handleLooting();
        this.handleAttack();
        this.updateCamera();
        this.updateStatusBar();
        this.collectCoins();
        this.collectBottles();
    }

    /**
     * Updates the platforms in the game world.
     */
    updatePlatforms() {
        this.world.level.platforms.forEach(platform => {
            if (platform.isSeen && platform.isSeen(this)) { }
            if (this.isStandingOn(platform)) {
                this.isStandingOnPlatform = true;
            }
        });
    }

    /**
     * Resets flags for movement and standing on platforms.
     */
    resetFlags() {
        this.attacking = false;
        this.isMoving = false;
        this.isStandingOnPlatform = false;
    }

    /**
     * Handles player movement based on keyboard input.
     */
    handleMovement() {
        let speed = this.speed;
        this.moveSound.pause();
        if (this.keyboard.left.Status) {
            this.direction = 'left';
            this.testL(speed);
        }
        if (this.keyboard.right.Status) {
            this.direction = 'right';
            this.testR(speed);
        }
    }

    /**
     * Handles player jumping based on keyboard input.
     */
    handleJump() {
        if (this.keyboard.space.Status) {
            let speed = this.jumpHeight;
            if (this.speedY == 0) {
                this.loadImage('img/2_character_pepe/3_jump/J-33.png');
            }
            this.jump(speed);
            if (this.world.muteButton.isOn) {
                this.jumpSound.play();
            }
        }
    }

    /**
    * Handles looting of platforms.
    */
    handleLooting() {
        if (!this.keyboard.e.Status) return;
        const { platforms, coins } = this.world.level;
        platforms.forEach(platform => {
            if (platform instanceof Box && platform.isSeen(this) && !platform.isLooted) {
                const loot = platform.looting();
                if (this.world.muteButton.isOn) this.openboxSound.play();
                loot.forEach(() => coins.push(new Coin(platform.x, platform.y - 20, true, this.world)));
            }
        });
    }

    /**
     * Handles player attack based on keyboard input.
     */
    handleAttack() {
        if (this.keyboard.f.Status) {
            this.attacking = true;
        }
    }

    /**
     * Updates the camera position based on the player's position.
     */
    updateCamera() {
        if (this.world) {
            this.world.camera_x = -this.x + 800;
        }
    }

    /**
     * Updates the player's status bar position.
     */
    updateStatusBar() {
        if (this.hpstatusBar) {
            this.hpstatusBar.x = this.x;
            this.hpstatusBar.y = this.y - 10;
        }
    }

    /**
    * Collects coins and updates the coin status bar.
    */
    collectCoins() {
        const { coins, statusbars } = this.world.level;
        this.world.level.coins = coins.filter(coin => {
            if (this.isColliding(coin)) {
                if (this.world.muteButton.isOn) this.audioCoin.play();

                statusbars.forEach(statusbar => {
                    if (statusbar instanceof CoinStatusbar) statusbar.count++;
                });
                return false;
            }
            return true;
        });
    }

    /**
    * Collects bottles and updates the ammunition status bar.
    */
    collectBottles() {
        const { bottles, statusbars } = this.world.level;
        this.world.level.bottles = bottles.filter(bottle => {
            if (this.isColliding(bottle)) {
                if (this.world.muteButton.isOn) this.audioBottle.play();
                statusbars.forEach(statusbar => {
                    if (statusbar instanceof MunitionStatusbar) statusbar.count++;
                });
                return false;
            }
            return true;
        });
    }

    /**
    * Determines and plays the appropriate animation based on the player's state.
    */
    playAppropriateAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);

        } else if (this.isHurt) {
            this.playAnimation(this.IMAGES_HURT);
            this.seconds = 0;
        } else if (this.y != this.minY + this.offSetBottom && this.speedY > 0) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.seconds = 0;
        } else {
            this.playIdleOrWalkingAnimation();
        }

        if (!this.snoringSound.paused && this.seconds < 5) {
            this.snoringSound.pause();
            this.snoringSound.currentTime = 0;
        }
    }
    /**
    * Determines and plays the Jumping animation.
    */
    playAnimationJumping() {
        setInterval(() => {
            if (this.y != this.minY + this.offSetBottom && this.speedY < 0) {
                this.playAnimation(this.IMAGES_FALLING);
            }
        }, 150);
    }

    /**
    * Plays the appropriate animation based on the character's state. If moving or jumping, plays walking animation and stops snoring sound. If idle for more than 5 seconds and alive, plays idle animation and handles snoring sound.
    */
    playIdleOrWalkingAnimation() {
        if (this.isMoving && this.speedY == 0) {
            this.playAnimation(this.IMAGES_WALKING);
            this.seconds = 0;            
        } else if (this.seconds >= 5 && this.isAlive) {
            this.handleIdleState();
        }        
    }

    handleIdleState() {
        this.isIdle = true;
        this.playAnimation(this.IMAGES_LONG_IDLE);
        if (this.world.muteButton.isOn && this.snoringSound.paused) {
            this.snoringSound.play();
        } else if (!this.world.muteButton.isOn && !this.snoringSound.paused) {
            this.snoringSound.pause();
            this.snoringSound.currentTime = 0;
        }
    }

    /**
     * Sets up an interval to periodically update the player's animation.
     */
    animate() {
        setInterval(() => {
            this.isIdle = false;
            this.playAppropriateAnimation();
        }, 76.6667);
    }

    /**
    * Checks the status of the down key and determines if the player is standing on a blocking platform.
    * @returns {Object} An object containing the status of whether the player is standing on a platform and if a platform was found.
    */
    checkDownKeyStatus() {
        const { platforms } = this.world.level;
        const sortedPlatforms = platforms.slice().sort((a, b) => a.y - b.y);
        let isStandingOnPlatform = sortedPlatforms.some(platform => this.isOver(platform) && (platform.isblocking && true));
        let foundPlatform = sortedPlatforms.some(platform => this.isOver(platform));
        return { isStandingOnPlatform, foundPlatform };
    }

    /**
    * Initiates an idle animation loop for the player character.Checks periodically if the player is standing still and plays the idle animation if true.
    * @returns {number} The interval ID for the setInterval function.
    */
    idleAnimation() {
        return setInterval(() => {
            if (this.isStanding()) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 250);
    }

    /**
     * Timer for tracking inactivity (AFK).
     */
    afkTimer() {
        setInterval(() => {
            this.seconds++;
        }, 1000);
    }

    /**
     * Perform attack action.
     */
    attack() {
        setInterval(() => {
            if (!this.attacking) return;
            this.seconds = 0;
            this.world.level.statusbars
                .filter(statusbar => statusbar instanceof MunitionStatusbar && statusbar.count > 0).forEach(statusbar => (statusbar.count--, this.world.throwableObjects.push(new ThrowableObject(this.x + this.width / 2, this.y + this.height / 2, this.world, this.direction))));
        }, 200);
    }

    /**
     * Check if the player is standing (not moving, not hurt, not idle).     
     * @returns {boolean} True if the player is standing; false otherwise.
     */
    isStanding() {
        return !this.isMoving && this.y == this.minY + this.offSetBottom && this.isAlive && !this.isHurt && !this.isIdle;
    }

    /**
    * Get the health status bar images based on color.
    * @param {string} color - The color of the health status bar ("blue", "green", "orange") and @returns {string[]} Array of image paths for the health status bar corresponding to the color.
    */
    getHpStatusImageColor(color) {
        return this.hpStatusImages[color];
    }
};

/**
 * Mixes in the methods from the Damageable object and from the HasText object into the Player prototype.This allows instances of Player to use methods defined in Damageable and in HasText.
 */
Object.assign(Player.prototype, Damageable);
Object.assign(Player.prototype, HasText);