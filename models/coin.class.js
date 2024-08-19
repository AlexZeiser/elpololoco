/**
 * Represents a coin object in the game.
 * @extends DrawableObject
 * @extends Movable
 */
class Coin extends Character {
    /** @type {string} */
    STANDARD_IMAGE = 'img/7_statusbars/3_icons/icon_coin.png';

    /** @type {string[]} */
    MONET_ANIMATION = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Creates an instance of Coin.
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y, isGravityOn, world) {
        super(null, x, y, 115, 130, 1, 0);
        this.loadImages(this.MONET_ANIMATION);
        this.animate();
        /*  this.x = x; 
         this.y = y; 
         this.height = 130; 
         this.width = 115;  */
        this.offSetBottom = 45;
        this.offSetTop = 45;
        this.offSetLeft = 40;
        this.offSetRight = 40;
        this.world = world;

        if (isGravityOn) {
            this.applyGravity();
        }

    }
    /**
    * Updates the state of the object by checking for collisions.
     */
    update() {
        this.checkCollision();
    }

    /**
     * Initiates the animation loop for the coin.
     * Plays the animation sequence defined in MONET_ANIMATION array.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.MONET_ANIMATION);
        }, 200);
    }
}

/**
 * Mixes in the methods from the Renderable object into the Coin prototype.
 * This allows instances of Coin to use methods defined in Renderable.
 */
Object.assign(Coin.prototype, Renderable);

/**
 * Mixes in the methods from the Movable object into the Coin prototype.
 * This allows instances of Coin to use methods defined in Movable.
 */
Object.assign(Coin.prototype, Movable);