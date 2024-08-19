/**
 * Represents a normal chicken enemy.
 * @extends Enemy
 */
class Chicken extends Enemy {
    /** @type {string} */
    STANDART_IMAGE = 'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png';

    /** @type {string[]} */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    /** @type {string[]} */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Creates an instance of Chicken.
     * @param {number} x
     * @param {number} y 
     */
    constructor(x, y) {
        let audioDead = 'audio/chicken.dead.mp3';
        super(x, y, 95, 120, 30, 90, audioDead);
        this.loadImage(this.STANDART_IMAGE); 
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD); 
        this.animate(); 
        this.applyGravity(); 
        this.maxSpeed = 0.6 + Math.random() * 1.2; 
        this.direction = "left"; 
        this.walkHeight = 20;       
        this.offSetBottom = 10;
        this.offSetTop = 5;
        this.offSetLeft = 5;
        this.offSetRight = 5;
    }    
}
