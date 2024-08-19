/**
 * Represents a drawable object in the game.
 */
class DrawableObject {
    /** @type {HTMLImageElement} */
    img = null;
    /** @type {Object<string, HTMLImageElement>} */
    ImageCache = {};
    /** @type {number} */
    currentImage = 0;
    /** @type {number} */
    x;
    /** @type {number} */
    y;
    /** @type {number} */
    height;
    /** @type {number} */
    width;
    /** @type {HTMLElement} */
    div = null;
    /** @type {string} */
    direction;

    /**
     * Plays an animation sequence for the object.
     * @param {string[]} images - Array of image paths to animate through.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.ImageCache[path];
        this.currentImage++;
    }        

    /**
     * Plays a full animation sequence once.
     * @param {string[]} images - Array of image paths to animate through.
     * @param {Function} func - Optional callback function to execute after animation completes.
     */
    playFullAnimationOnce(images, func) {
        let index = 0;
        let animationInterval = setInterval(() => {
            if (index < images.length) {
                this.img = this.ImageCache[images[index]];
                index++;
            } else {
                clearInterval(animationInterval);
                if (func) {
                    func();
                }
            }
        }, 25);
    }

    /**
     * Loads an image from a given path and assigns it to this.img.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */
    draw(ctx) {
        try {
            if (this.img) {
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            }
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('Could not load Image', this.img.src);
        }
    }

    /**
     * Draws a frame around the object on the canvas context.
     * Also displays position information.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */
    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.font = "20px Arial";
        ctx.fillText("y" + this.y.toFixed(0), this.x - 50, this.y - 10);
        ctx.fillText("x" + this.x.toFixed(0), this.x - 50, this.y + this.height + 20);
        ctx.fillText("y" + (this.y + this.height).toFixed(0), this.x + this.width, this.y + this.height + 20);
    }

    /**
    * Draws the real frame of the object on the canvas context.
    * Adjusts for offsets and direction when drawing.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
    */
    drawRealFrame(ctx) {        
        let x = this.x + this.offSetLeft;
        let y = this.y + this.offSetTop;
        let width = this.width - this.offSetLeft - this.offSetRight;
        let height = this.height - this.offSetTop - this.offSetBottom;
        if (this.direction == 'left') {
            x = this.x + this.offSetRight;
        }
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'green';
        ctx.rect(x, y, width, height);
        ctx.stroke();
    }

    /**
     * Draws text associated with the object on the canvas context if visible.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */
    drawText(ctx) {
        if (this.text && this.isSeenBool) {
            ctx.font = "16px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(this.text, this.x + this.offsetX, this.y + this.offsetY);
        }
    }

    /**
     * Draws the name of the object on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */
    drawName(ctx) {
        ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        ctx.fillStyle = this.fontColor;
        ctx.fillText(this.text, this.x + this.offsetX, this.y + this.offsetY);
    }

    /**
     * Loads multiple images from an array of paths into the ImageCache.
     * @param {string[]} arr - Array of image paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.ImageCache[path] = img;
        });
    }

    /**
     * Adds the object to the canvas map by rendering it on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */
    addToMap(ctx) {
        ctx.save();
        if (this.isSeenBool) {
            this.drawText(ctx);
        }
        if (this.hasFrame) {
            this.drawFrame(ctx);
            this.drawRealFrame(ctx);
        }
        if (this.text && this.fontSize && this.text != "") {
            this.drawName(ctx);
        }
        if (this.direction == 'left' && this instanceof Player || this.direction == "right" && !(this instanceof Player)) {
            this.flipImage(ctx);
        }
        this.draw(ctx);
        ctx.restore();
    }

    /**
     * Flips the image horizontally on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */
    flipImage(ctx) {
        ctx.translate(this.x + this.width / 2, 0);
        ctx.scale(-1, 1);
        ctx.translate(-(this.x + this.width / 2), 0);
    }

    /**
     * Restores the canvas context after flipping an image.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */
    flipImageBack(ctx) {
        ctx.restore();
    }
}