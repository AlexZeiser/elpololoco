/**
 * Represents a status bar for displaying the coin count in the game.
 * @extends DrawableObject
 * @extends HasText
 */
class CoinStatusbar extends DrawableObject {
    /** @type {number} */
    percentage;

    /** @type {World} */
    world;

    /**
     * Creates an instance of CoinStatusbar.
     * @param {number} positionX 
     * @param {number} positionY 
     * @param {string} image 
     * @param {number} width 
     * @param {number} height
     */
    constructor(positionX, positionY, image, width, height) {
        super();
        this.IMAGE = image;
        this.loadImage(this.IMAGE); 
        this.positionX = positionX; 
        this.positionY = positionY; 
        this.width = width; 
        this.height = height; 
        this.fontSize = 40; 
        this.fontColor = "orange";
        this.offsetX = this.positionX + this.width - 50; 
        this.offsetY = this.positionY - 120; 
        this.count = 0;
    }

    /**
     * Updates the position of the status bar relative to the world's camera.
     * Also updates the text content to display the current coin count.
     */
    update() {
        this.x = this.positionX - this.world.camera_x; 
        this.y = this.positionY - this.world.camera_y; 
        this.text = `${this.count}`;
    }
}

/**
 * Mixes in the methods from the Renderable object into the CoinStatusbar prototype.
 * This allows instances of CoinStatusbar to use methods defined in Renderable.
 */
Object.assign(CoinStatusbar.prototype, Renderable);

/**
 * Mixes in the methods from the HasText object into the CoinStatusbar prototype.
 * This allows instances of CoinStatusbar to use methods defined in HasText.
 */
Object.assign(CoinStatusbar.prototype, HasText);