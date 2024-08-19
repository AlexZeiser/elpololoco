/**
 * Represents a small chicken enemy.
 * @extends Enemy
 */
class Chick extends Enemy {
    /** @type {string} */
    STANDART_IMAGE = 'img/3_enemies_chicken/chicken_small/1_walk/1_w.png';

    /** @type {string[]} */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    /** @type {string[]} */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates an instance of Chick.
     * @param {number} x - The initial x-coordinate of the chick.
     * @param {number} y - The initial y-coordinate of the chick.
     */
    constructor(x, y) {
        let audioDead = 'audio/chick.dead.mp3';
        super(x, y, 45, 70, 10, 0, audioDead);
        this.loadImage(this.STANDART_IMAGE);
        this.loadImages(this.IMAGES_WALKING); 
        this.loadImages(this.IMAGES_DEAD); 
        this.animate(); 
        this.applyGravity();
        this.maxSpeed = 0.2 + Math.random() * 0.9; 
        this.direction = "left";
        this.offSetBottom = 7;     
        this.offSetBottom = 5;
        this.offSetTop = 5;
        this.offSetLeft = 5;
        this.offSetRight = 5;
    }
}