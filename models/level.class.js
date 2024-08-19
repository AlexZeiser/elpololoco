/**
 * Represents a level in the game containing various game objects and entities.
 */
class Level {
    /**
     * Creates a new instance of Level.
     * 
     * @param {Array<Enemy>} enemies 
     * @param {Array<Cloud>} clouds
     * @param {Array<BackgroundObject>} backgroundObjects 
     * @param {Array<Coin>} coins 
     * @param {Array<Bottle>} bottles 
     * @param {Array<Platform>} platforms 
     * @param {Array<Flag>} flags 
     * @param {Array<Player>} players
     * @param {Array<Statusbar>} statusbars 
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles, platforms, flags, statusbars, players) {        
        this.enemies = enemies;       
        this.clouds = clouds;        
        this.backgroundObjects = backgroundObjects; 
        this.coins = coins;           
        this.bottles = bottles;       
        this.platforms = platforms;  
        this.flags = flags;           
        this.statusbars = statusbars; 
        this.players = players;       
    }
}