/**
 * Represents a platform in the game world.
 * Extends {@link DrawableObject}.
 */
class Platform extends DrawableObject {
    /**
     * Creates a platform object.
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height
     * @param {boolean} isblocking 
     * @param {string} [image] 
     */
    constructor(x, y, width, height, isblocking, image) {
        super();
        if (image) {
            this.loadImage(image);
        }

        /**
         * The x-coordinate of the platform.
         * @type {number}
         */
        this.x = x;

        /**
         * The y-coordinate of the platform.
         * @type {number}
         */
        this.y = y;

        /**
         * The width of the platform.
         * @type {number}
         */
        this.width = width;

        /**
         * The height of the platform.
         * @type {number}
         */
        this.height = height;

        /**
         * Indicates if the platform is blocking movement.
         * @type {boolean}
         */
        this.isblocking = isblocking;
    }
}

/**
 * Mixes in the methods from the Renderable object into the Platform prototype.
 * This allows instances of Platform to use methods defined in Renderable.
 */
Object.assign(Platform.prototype, Renderable);