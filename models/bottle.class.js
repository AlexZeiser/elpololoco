/**
 * Represents a bottle object that extends a drawable object.
 * @extends DrawableObject
 */
class Bottle extends DrawableObject {

    /**
     * Creates an instance of Bottle.
     * @param {number} [x]
     * @param {number} [y]
     */
    constructor(x, y) {
        super();
        this.x = 300 + Math.random() * 13500;
        this.y = 800 + Math.random() * 100;
        this.height = 80;
        this.width = 65;
        this.STANDARD_IMAGE = 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png';
        this.offSetBottom = 10;
        this.offSetTop = 15;
        this.offSetLeft = 30;
        this.offSetRight = 15;
        
        if (x) {
            this.x = x;
        }
        if (y) {
            this.y = y;
        }

        this.loadImage(this.STANDARD_IMAGE);
    }
}

/**
 * Mixes in the methods from the Renderable object into the Bottle prototype.
 * This allows instances of Bottle to use methods defined in Renderable.
 */
Object.assign(Bottle.prototype, Renderable);

/**
 * Mixes in the methods from the Movable object into the Bottle prototype.
 * This allows instances of Bottle to use methods defined in Movable.
 */
Object.assign(Bottle.prototype, Movable);