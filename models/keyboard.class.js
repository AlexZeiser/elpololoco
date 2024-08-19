/**
 * Represents a keyboard input handler.
 */
class Keyboard {
    /**
     * Creates an instance of Keyboard.
     * @param {string} left 
     * @param {string} right      
     * @param {string} space 
     * @param {string} f 
     * @param {string} e 
     */
    constructor(left, right, space, f, e) {
        this.left = {
            Key: left,
            Status: false
        };
        this.right = {
            Key: right,
            Status: false
        };        
        this.space = {
            Key: space,
            Status: false
        };
        this.f = {
            Key: f,
            Status: false
        };
        this.e = {
            Key: e,
            Status: false
        };        

        /**
        * Adds an event listener to the window object for the 'keydown' event,
        * which triggers the keyDownHandler method of the current instance.
         */
        window.addEventListener('keydown', (event) => this.keyDownHandler(event));

        /**
         * Adds an event listener to the window object for the 'keyup' event,
         * which triggers the keyUpHandler method of the current instance.
         */
        window.addEventListener('keyup', (event) => this.keyUpHandler(event));

    }

    /**
     * Handles the keydown event to update the status of associated keys.
     * @param {KeyboardEvent} event - The keydown event object.
     */
    keyDownHandler(event) {
        switch (event.key) {
            case this.left.Key:
                this.left.Status = true;
                break;
            case this.right.Key:
                this.right.Status = true;
                break;            
            case this.space.Key:
                this.space.Status = true;
                break;
            case this.f.Key:
                this.f.Status = true;
                break;
            case this.e.Key:
                this.e.Status = true;
                break;            
            default:
                break;
        }
    }

    /**
     * Handles the keyup event to update the status of associated keys.
     * @param {KeyboardEvent} event - The keyup event object.
     */
    keyUpHandler(event) {
        switch (event.key) {
            case this.left.Key:
                this.left.Status = false;
                break;
            case this.right.Key:
                this.right.Status = false;
                break;            
            case this.space.Key:
                this.space.Status = false;
                break;
            case this.f.Key:
                this.f.Status = false;
                break;
            case this.e.Key:
                this.e.Status = false;
                break;            
            default:
                break;
        }
    }
}