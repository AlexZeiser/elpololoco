/**
 * Movable mixin provides methods for movement and physics-related behaviors.
 */
const Movable = {
    /**
     * Moves the object to the left.
     * @param {number} speed - The speed at which to move left.
     */
    moveLeft(speed) {
        this.x -= speed;
        this.direction = 'left';
        this.isMoving = true;
    },

    /**
     * Moves the object to the right, constrained to a maximum x coordinate of 14200.
     * @param {number} speed - The speed at which to move right.
     */
    moveRight(speed) {
        if (this.x < 14200) {
            this.x += speed;
            this.direction = 'right';
            this.isMoving = true;
        }
    },

    /**
     * Initiates a jump action if the object is at its minimum y position plus an offset.
     * @param {number} speed - The speed at which to jump.
     */
    jump(speed) {
        if (this.y == this.minY + this.offSetBottom) {
            this.isMoving = true;
            this.jumped = true;
            this.speedY = speed;
        }
    },

    /**
     * Applies gravity to the object using setInterval for periodic updates.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAlive) {
                if (this.y <= this.minY + this.offSetBottom || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;

                    if (this.y >= this.minY + this.offSetBottom) {
                        this.y = this.minY + this.offSetBottom;
                        this.speedY = 0;
                    }
                }
            }
        }, 1000 / 25);
    }
};

/**
 * Damageable mixin provides methods for taking damage and handling death.
 */
const Damageable = {
    /**
     * Reduces the object's health points (hp) by a specified amount.
     * @param {number} amount - The amount of damage to take.
     */
    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.die();
        }
    },

    /**
     * Handles the death of the object.
     * Triggers animation and other effects when the object dies.
     */
    die() {
        if (this.isAlive) {
            this.isAlive = false;

            this.handleEndbossDeath();
            this.handlePlayerDeath();

            if (this.playDeathSound) {
                this.playDeathSound();
            }

            this.playDeadAnimationAndClearInterval();
        }
    },

    /**
     * Plays the death animation for the character and clears the interval after a specified time.
     * If the character is an Endboss, loads a specific image after the animation.
     */
    playDeadAnimationAndClearInterval() {
        let animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 120);

        setTimeout(() => {
            clearInterval(animationInterval);
            if (this instanceof Endboss) {
                this.loadImage('img/4_enemie_boss_chicken/5_dead/G26.png');
            }
        }, 700);
    },

    /**
     * Handles the specific actions when the character is an Endboss and dies.
     */
    handleEndbossDeath() {
        if (this instanceof Endboss) {
            setTimeout(() => won(), 2000);
        }
    },

    /**
     * Perform game over actions.
     */
    gameover() {
        let canvas = document.getElementById('canvas');
        let game_window_start = document.getElementById('game_window_start');
        let game_over = document.getElementById('game_over');
        let panel = document.getElementById('panel');

        canvas.style.opacity = '0';
        game_window_start.style.display = 'none';
        game_over.style.display = '';
        panel.style.display = 'none';
        world.audioMenu.pause();        
    },

    /**
     * Handles the specific actions when the character is a Player and dies.
     */
    handlePlayerDeath() {
        if (this instanceof Player) {
            setTimeout(() => this.gameover(), 2000);

            this.world.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss) {
                    enemy.audioMadChicken.pause();
                }
            });
        }
    }
}

/**
 * Renderable mixin provides a method for rendering the object.
 */
const Renderable = {
    /**
     * Renders the object using the provided 2D rendering context (ctx).
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    render(ctx) {
        this.addToMap(ctx);
    }
};
/**
 * Collision mixin provides methods for detecting collisions and blockings with other objects.
 */
const Collision = {
    /**
     * Checks if this object is blocking the specified object vertically.
     * @param {object} object - The object to check against for vertical blocking.
     * @returns {boolean} True if this object is blocking vertically, false otherwise.
     */
    isBlocking(object) {
        return this.y < object.y + object.height && this.y + this.height > object.y;
    },

    /**
     * Checks if this object is blocking from the left side of the specified object.
     * @param {object} object - The object to check against for left side blocking.
     * @returns {boolean} True if this object is blocking from the left, false otherwise.
     */
    isBlockingFromLeft(object) {
        let isBlockedFromLeft = this.x >= object.x + object.width && object.x + object.width >= this.x - this.maxSpeed;
        let isBlocking = false;
        let isBlocked = isBlockedFromLeft && this.isBlocking(object) && object.isblocking;
        let platformHeight = this.y + this.height - object.y;

        if (isBlocked) {
            if (platformHeight > this.walkHeight) {
                this.speed = this.x - object.width - object.x;
                if (this.speed <= 0) {
                    isBlocking = true;
                }
            } else {
                this.y -= platformHeight;
                this.x -= 2;
            }
        }

        return isBlocking;
    },

    /**
 * Checks if the object is blocking the character from the right.
 * 
 * @param {Object} object - The object to check for blocking.
 * @returns {boolean} - True if the character is being blocked from the right, otherwise false.
 */
    isBlockingFromRight(object) {
        let isBlockedFromRight = this.x + this.width <= object.x && this.x + this.width >= object.x - this.maxSpeed;
        let isBlocking = false;
        let isBlocked = isBlockedFromRight && this.isBlocking(object) && object.isblocking;
        let platformHeight = this.y + this.height - object.y;

        if (isBlocked) {
            isBlocking = this.handleBlocking(platformHeight, object);
        }

        return isBlocking;
    },

    /**
     * Handles the blocking logic based on platform height and updates the character's position and speed.
     * 
     * @param {number} platformHeight - The height of the platform relative to the character.
     * @param {Object} object - The object that might be blocking the character.
     * @returns {boolean} - True if the character's speed is less than or equal to 0 and is being blocked, otherwise false.
     */
    handleBlocking(platformHeight, object) {
        if (platformHeight > this.walkHeight) {
            this.speed = object.x - this.x - this.width;
            if (this.speed <= 0) {
                return true;
            }
        } else {
            this.y -= platformHeight;
            this.x += 2;
        }
        return false;
    },

    /**
     * Checks if this object is blocking from either side (left or right) of the specified object.
     * @param {object} object - The object to check against for side blocking.
     * @returns {boolean} True if this object is blocking from the side, false otherwise.
     */
    isBlockingFromSide(object) {
        let isBlocked = false;
        let platformHeight = this.y + this.height - object.y;

        if (this.direction === 'left') {
            isBlocked = this.isBlockingFromLeft(object);
        } else if (this.direction === 'right') {
            isBlocked = this.isBlockingFromRight(object);
        }

        return isBlocked && this.isBlocking(object) && object.isblocking;
    },

    /**
     * Checks if this object is blocking from above the specified platform.
     * @param {object} platform - The platform object to check against.
     * @returns {boolean} True if this object is blocking from above, false otherwise.
     */
    isBlockingFromAbove(platform) {
        const playerBottom = this.y;
        const playerLeft = this.x;
        const playerRight = this.x + this.width;
        const platformTop = platform.y + platform.height;
        const platformLeft = platform.x;
        const platformRight = platform.x + platform.width;

        return (
            platformTop <= playerBottom &&
            platformLeft < playerRight &&
            platformRight > playerLeft
        );
    },


    /**
 * Checks if this bottle is colliding with another object.
 * @param {DrawableObject} object - The other object to check collision with.
 * @returns {boolean} True if this bottle is colliding with the object, otherwise false.
 */
    isColliding(object) {
        let x1 = this.x + this.offSetLeft;
        if (this.direction === 'left') {
            x1 = this.x + this.offSetRight;
        }

        let y1 = this.y + this.offSetTop;
        let width1 = this.width - this.offSetLeft - this.offSetRight;
        let height1 = this.height - this.offSetTop - this.offSetBottom;

        let x2 = object.x + object.offSetLeft;
        if (object.direction === 'left') {
            x2 = object.x + object.offSetRight;
        }

        let y2 = object.y + object.offSetTop;
        let width2 = object.width - object.offSetLeft - object.offSetRight;
        let height2 = object.height - object.offSetTop - object.offSetBottom;
        let xCollision = x1 < x2 + width2 && x1 + width1 > x2;
        let yCollision = y1 < y2 + height2 && y1 + height1 > y2;
        return xCollision && yCollision;
    },

    /**
     * Checks if this object is positioned over the specified object.
     * @param {object} object - The object to check against.
     * @returns {boolean} True if this object is over the specified object, false otherwise.
     */
    isOver(object) {
        let overObjectY = this.y + this.height - this.offSetBottom <= object.y + 2;
        let overObjectX = this.x + this.width > object.x && this.x < object.x + object.width;

        return overObjectX && overObjectY;
    },

    /**
     * Checks if this object is standing directly on top of the specified object.
     * @param {object} object - The object to check against.
     * @returns {boolean} True if this object is standing on the specified object, false otherwise.
     */
    isStandingOn(object) {
        let overObjectY = this.y + this.height == object.y;
        let overObjectX = this.x + this.width > object.x && this.x < object.x + object.width;

        return overObjectX && overObjectY;
    },

    /**
     * Checks if this object is standing on the ground at y coordinate 900.
     * @returns {boolean} True if this object is standing on the ground, false otherwise.
     */
    isStandingOnGround() {
        let groundY = 900;

        return this.y + this.height == groundY;
    }
}

/**
 * Lootable mixin provides methods for handling loot interactions.
 */
const Lootable = {
    isSeenBool: false,
    offsetX: 15,
    offsetY: -10,
    seenRadius: 20,
    text: "Press E",

    /**
     * Handles the looting action when the loot is interacted with.
     * @returns {object} The loot object.
     */
    looting() {
        this.isLooted = true;
        this.isblocking = false;
        this.loadImage(this.IMAGE_OPEN);

        return this.loot;
    },

    /**
     * Checks if the loot is within the character's visibility range.
     * @param {object} character - The character object to check against.
     * @returns {boolean} True if the loot is seen by the character, false otherwise.
     */
    isSeen(character) {
        const isWithinX = character.x + character.width >= this.x - this.seenRadius && character.x <= this.x + this.seenRadius + this.width;
        const isWithinY = character.y + character.height >= this.y - this.seenRadius && character.y <= this.y + this.seenRadius + this.height;

        if (isWithinX && isWithinY) {
            this.isSeenBool = true;
            return true;
        } else {
            this.isSeenBool = false;
            return false;
        }
    }
};

/**
 * HasText mixin provides properties for rendering text.
 */
const HasText = {
    isSeenBool: false,
    offsetX: 0,
    offsetY: 0,
    seenRadius: 20,
    text: "",
    fontSize: 200,
    fontColor: 'green',
    fontFamily: 'Arial',
};