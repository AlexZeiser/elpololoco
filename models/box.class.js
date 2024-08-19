/**
 * Represents a box object that extends a platform.
 * @extends Platform
 */
class Box extends Platform {

    /**
     * Creates an instance of Box.
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {boolean} isLooted 
     * @param {string} imageOpen 
     * @param {string} imageClose 
     * @param {any} loot 
     */
    constructor(x, y, width, height, isLooted, imageOpen, imageClose, loot) {
        super(x, y, width, height, !isLooted);
        this.loadImage(imageOpen);
        this.loadImage(imageClose);
        this.isLooted = isLooted;
        this.loot = loot;
        this.IMAGE_OPEN = imageOpen;
        this.IMAGE_CLOSE = imageClose;

        if(this.isLooted){
            this.loadImage(this.IMAGE_OPEN);
        }else {
            this.loadImage(this.IMAGE_CLOSE);
        }
    }    
}

/**
 * Mixes in the methods from the Lootable object into the Box prototype.
 * This allows instances of Box to use methods defined in Lootable.
 */
Object.assign(Box.prototype, Lootable);