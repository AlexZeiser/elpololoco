/**
 * Represents a character in the game, extending from DrawableObject.
 * @extends DrawableObject
 */
class Character extends DrawableObject {
    /** @type {string} */
    name;
    /** @type {number} */
    acceleration;
    /** @type {number} */
    speed;
    /** @type {number} */
    speedY;
    /** @type {number} */
    maxSpeed;
    /** @type {number} */
    minY;
    /** @type {string} */
    STANDART_IMAGE;
    /** @type {number} */
    hp;
    /** @type {number} */
    maxHp;
    /** @type {boolean} */
    isMoving;
    /** @type {number} */
    jumpHeight;
    /** @type {World} */
    world;
    /** @type {number} */
    walkHeight;
    /** @type {boolean} */
    isStandingOnPlatform;
    /** @type {number} */
    walkHeight = 0;
    /** @type {number} */
    offSetTop = 0;
    /** @type {number} */
    offSetBottom = 0;
    /** @type {number} */
    offSetLeft = 0;
    /** @type {number} */
    offSetRight = 0;

    /**
     * Creates an instance of Character.
     * @param {string} name 
     * @param {number} x
     * @param {number} y 
     * @param {number} width 
     * @param {number} height
     * @param {number} hp 
     * @param {number} damage
     */
    constructor(name, x, y, width, height, hp, damage) {
        super();
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.acceleration = 5;
        this.maxSpeed = 8;
        this.speed = this.maxSpeed;
        this.speedY = 0;
        this.minY = y + this.offSetBottom;
        this.isAlive = true;
        this.hp = hp;
        this.damage = damage;
        this.maxHp = hp;
        this.direction = 'right';
    }

    /**
     * Checks collision interactions between the character and enemies, platforms.
     */
    checkCollision() {
        let maxPlatformY = 910 + this.offSetBottom - this.height;
        this.isHurt = false;
        this.world.level.enemies.forEach(enemy => {
            if (this.isOver(enemy) && enemy.isAlive && this instanceof Player) {
                maxPlatformY = this.handleEnemyCollision(enemy, maxPlatformY);
            } else if (this.isColliding(enemy) && enemy.isAlive) {
                this.handlePlayerCollidingEnemy(enemy);
                if (this instanceof ThrowableObject && this.isAlive) {
                    this.handleThrowableObject(enemy);
                }
            }
        });
        this.updateMinYAndHandlePlatformCollisions(maxPlatformY);
    }

    /**
    * Updates the minimum Y-coordinate based on the maximum platform Y-coordinate and handles platform collisions.
    * 
    * @param {number} maxPlatformY - The maximum Y-coordinate of the platforms.
    */
    updateMinYAndHandlePlatformCollisions(maxPlatformY) {
        this.world.level.platforms.forEach(platform => {
            this.handlePlatformCollision(platform);
        });
        this.minY = maxPlatformY;
    }

    /**
     * Checks if the character is dead.
     * @returns {boolean} True if the character's health points are zero or below, otherwise false.
     */
    isDead() {
        return this.hp <= 0;
    }

    /**
     * Checks if the character is above the ground.
     * @returns {boolean} True if the character's feet are above the ground level, otherwise false.
     */
    isAboveGround() {
        return this.y + this.height <= 900 - this.offSetBottom;
    }
    test() {
        const index = this.world.throwableObjects.indexOf(this);
        let list = this.world.throwableObjects;
        this.playFullAnimationOnce(this.IMAGES_HIT, function () {
            if (index > -1) {
                list.splice(index, 1);
            }
        });
    }
    /**
     * Handles the case where a throwable object hits an enemy.
     * @param {Enemy} enemy
     */
    handleThrowableObject(enemy) {
        enemy.takeDamage(this.damage);
        this.animated = false;
        this.isAlive = false;
        if (this.damage > 0) {
            enemy.isHurt = true;
            if (enemy instanceof Endboss) {
                enemy.playHurtAnimation();
            }
            this.test();
        }
        if (enemy.hpstatusBar) {
            enemy.hpstatusBar.setPercentage(enemy.hp / enemy.maxHp * 100);
        }
    }

    /**
     * Handles the case where the player is colliding with an enemy.
     * @param {Enemy} enemy
     */
    handlePlayerCollidingEnemy(enemy) {
        if (this instanceof Player) {
            this.takeDamage(enemy.damage);
            if (enemy.damage > 0) {
                this.isHurt = true;
            }
            if (this.hpstatusBar) {
                this.hpstatusBar.setPercentage(this.hp / this.maxHp * 100);
            }
        }
    }

    /**
     * Handles collision interactions between the character and an enemy.
     * @param {Enemy} enemy 
     * @param {number} maxPlatformY
     */
    handleEnemyCollision(enemy, maxPlatformY) {
        const platformTopY = enemy.y - this.height;
        if (platformTopY < maxPlatformY) {
            maxPlatformY = platformTopY;
            if (this.y == maxPlatformY + this.offSetBottom) {
                enemy.takeDamage(this.damage);
            }
        }
        return maxPlatformY;
    }

    /**
     * Handles collision interactions between the character and a platform.
     * @param {Platform} platform
     */
    handlePlatformCollision(platform) {
        if (this.isOver(platform) && !(this instanceof ThrowableObject) && this.y + this.height == platform.y) {
            this.takeDamage(platform.damage);
            if (platform.damage > 0) {
                this.isHurt = true;
            }
            if (this.hpstatusBar) {
                this.hpstatusBar.setPercentage(this.hp / this.maxHp * 100);
            }
        }
    }
}

/**
 * Mixes in the methods from the Movable object into the Character prototype.
 * This allows instances of Character to use methods defined in Movable.
 */
Object.assign(Character.prototype, Movable);

/**
 * Mixes in the methods from the Renderable object into the Character prototype.
 * This allows instances of Character to use methods defined in Renderable.
 */
Object.assign(Character.prototype, Renderable);

/**
 * Mixes in the methods from the Collision object into the Character prototype.
 * This allows instances of Character to use methods defined in Collision.
 */
Object.assign(Character.prototype, Collision);