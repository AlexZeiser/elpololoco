/**
 * Represents a cloud object in the game.
 * @extends DrawableObject
 */
class Cloud extends DrawableObject {
    /** @type {boolean} */
    direction;

    /** @type {number} */
    speed;

    /**
     * Creates an instance of Cloud.
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {boolean} direction
     * @param {number} speed 
     * @param {string} image
     */
    constructor(y, width, height, direction, speed, image) {
        super();
        this.x = 500 + Math.random() * 12000;
        this.y = y;
        this.height = height; 
        this.width = width;
        this.direction = direction; 
        this.speed = speed; 
        this.loadImage(image);
    }

    /**
     * Updates the position of the cloud based on its direction and speed.
     */
    update() {
        if (this.direction) {
            this.x -= this.speed; 
        } else {
            this.x += this.speed; 
        }
    }
}

/**
 * Mixes in the methods from the Renderable object into the Cloud prototype.
 * This allows instances of Cloud to use methods defined in Renderable.
 */
Object.assign(Cloud.prototype, Renderable);