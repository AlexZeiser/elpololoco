/**
 * Represents a flag platform in the game.
 */
class Flag extends Platform {
    
    /**
     * Constructs an instance of Flag.
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {string} image 
     * @param {object} loot 
     */
    constructor(x, y, width, height, image, loot) {
        super(x, y, width, height, true, image); 
        this.isLooted = false; 
        this.loot = loot; 
    }    
}

/**
 * Mixes in the methods from the Renderable object into the Flag prototype.
 * This allows instances of Flag to use methods defined in Renderable.
 */
Object.assign(Flag.prototype, Renderable);

/**
 * Mixes in the methods from the Lootable object into the Flag prototype.
 * This allows instances of Flag to use methods defined in Lootable.
 */
Object.assign(Flag.prototype, Lootable);