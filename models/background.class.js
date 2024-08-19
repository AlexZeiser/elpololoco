/**
 * Represents a background object that extends a drawable object.
 * @extends DrawableObject
 */
class BackgroundObject extends DrawableObject {
    /**
     * Creates an instance of BackgroundObject.
     * @param {string} imagePath 
     * @param {number} x
     * @param {number} [width] 
     * @param {number} [height]
     * @param {number} [speed=1]
     */
    constructor(imagePath, x, width, height, speed) {
        super().loadImage(imagePath);
        this.speed = speed || 1;
        this.x = x;
        this.width = 1920;
        this.height = 1080;

        if (width) {
            this.width = width;
        }
        if (height) {
            this.height = height;
        }
        this.y = 1080 - this.height;
    }
}

/**
 * Mixes in the methods from the Movable object into the BackgroundObject prototype.
 * This allows instances of BackgroundObject to use methods defined in Movable.
 */
Object.assign(BackgroundObject.prototype, Movable);

/**
 * Mixes in the methods from the Renderable object into the BackgroundObject prototype.
 * This allows instances of BackgroundObject to use methods defined in Renderable.
 */
Object.assign(BackgroundObject.prototype, Renderable);