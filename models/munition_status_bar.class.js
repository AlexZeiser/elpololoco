/**
 * Represents a status bar for ammunition count, extending the DrawableObject class.
 */
class MunitionStatusbar extends DrawableObject {
    /**
     * Creates a new MunitionStatusbar.
     * 
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
        this.offsetX = this.positionX + this.width - 50; 
        this.offsetY = this.positionY - 50; 
        this.count = 6;  
        this.fontColor = "blue"; 
    } 

    /**
     * Updates the status bar position relative to the world's camera position.
     * Updates the displayed text to reflect the current ammunition count.
     */
    update() {
        this.x = this.positionX - this.world.camera_x;  // Adjusts the x-coordinate based on camera position
        this.y = this.positionY - this.world.camera_y;  // Adjusts the y-coordinate based on camera position
        this.text = `${this.count}`;  // Sets the text content to display the current ammunition count
    }
}

/**
 * Mixes in the methods from the Renderable object into the MunitionStatusbar prototype.
 * This allows instances of MunitionStatusbar to use methods defined in Renderable.
 */
Object.assign(MunitionStatusbar.prototype, Renderable);

/**
 * Mixes in the methods from the HasText object into the MunitionStatusbar prototype.
 * This allows instances of MunitionStatusbar to use methods defined in HasText.
 */
Object.assign(MunitionStatusbar.prototype, HasText);