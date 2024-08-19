/**
 * Represents a throwable object in the game, extending the Character class.
 */
class ThrowableObject extends Character {

    /**
     * Array of paths to animation images for the throwable object.
     * @type {string[]}
     */
    IMAGES_ANIMATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Array of paths to hit/splash images for the throwable object.
     * @type {string[]}
     */
    IMAGES_HIT = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Constructs a new ThrowableObject.
     * @param {number} x 
     * @param {number} y 
     * @param {World} world 
     * @param {string} direction 
     */

    constructor(x, y, world, direction) {
        super(null, x, y, 65, 80, null, 50); 
        this.loadImages(this.IMAGES_ANIMATION); 
        this.loadImages(this.IMAGES_HIT); 
        this.applyGravity(); 
        this.world = world;
        this.speedY = 40; 
        this.direction = direction;
        this.animated = true; 
        this.throw(); 
        this.update();
        this.offSetBottom = 10;
        this.offSetTop = 15;
        this.offSetLeft = 30;
        this.offSetRight = 15;
    }

    /**
     * Updates the state of the throwable object.
     * Checks for collisions and handles object removal when it reaches the minimum y-coordinate.
     */
    update() {
        this.checkCollision();       
        if (this.y == this.minY + this.offSetBottom && this.isAlive) {
            this.world.level.bottles.push(new Bottle(this.x, this.y));
            const index = this.world.throwableObjects.indexOf(this);
            if (index > -1) {
                this.world.throwableObjects.splice(index, 1);
            }
        }
    }

    /**
     * Initiates the throw animation based on the object's direction.
     * Moves the object horizontally and plays the animation.
     */
    throw() {
        setInterval(() => {
            if (this.animated) {
                if (this.direction == 'right') {
                    this.x += 40; 
                } else {
                    this.x -= 40;
                }
                this.playAnimation(this.IMAGES_ANIMATION); 
            }
        }, 50); 
    }
}