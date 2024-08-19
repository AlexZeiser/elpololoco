/**
 * Represents a health status bar that displays different images based on percentage.
 */
class HPStatusbar extends DrawableObject {
    percentage;

    /**
     * Constructs an instance of HPStatusbar.
     * @param {number} x 
     * @param {number} y 
     * @param {string[]} images 
     * @param {number} width 
     */
    constructor(x, y, images, width) {
        super();
        this.IMAGES = images;
        this.loadImages(this.IMAGES);
        this.setPercentage(100); 
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 60;
    }

    /**
     * Sets the current percentage of the status bar and updates the displayed image accordingly.
     * @param {number} percentage - The current percentage of the health.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.ImageCache[path];
    }

    /**
     * Resolves the index of the image based on the current percentage.
     * @returns {number} - The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}

/**
 * Mixes in the methods from the Renderable object into the HPStatusbar prototype.
 * This allows instances of HPStatusbar to use methods defined in Renderable.
 */
Object.assign(HPStatusbar.prototype, Renderable);