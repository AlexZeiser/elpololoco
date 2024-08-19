/**
 * Main game variable managing the game world.
 * @type {World}
 */
let world;

/**
 * Main canvas element where the game is rendered.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Function that creates Level 1 of the game.
 * @returns {Level} A Level object representing the game environment for Level 1.
 */
function getLevel1() {
    const keyboard1 = new Keyboard('a', 'd', ' ', 'f', 'e');

    return new Level(
        getEnemies(),
        getClouds(),
        getBackgrounds(),
        getCoins(),
        getBottles(),
        getPlatforms(),
        getFlag(),
        getStatusbars(),
        getPlayers(keyboard1)
    );
}

/**
 * Function that returns the enemies for Level 1.
 * @returns {Enemy[]} An array of Enemy objects.
 */
function getEnemies() {
    return [new Chick(4900, 500), new Chick(5400, 500), new Chick(6000, 500), new Chick(7800, 500), new Chick(8400, 500), new Chick(9000, 500), new Chick(9600, 500), new Chick(10200, 500), new Chick(10800, 500), new Chick(11400, 500), new Chick(12000, 500), new Chick(12600, 500), new Chick(13200, 500), new Chicken(3030, 500), new Chicken(5500, 500), new Chicken(6000, 500), new Chicken(9200, 500), new Chicken(9050, 500), new Chicken(8800, 500), new Chicken(11000, 500), new Endboss(13000, 250)];
}

/**
 * Function that returns the clouds for Level 1.
 * @returns {Cloud[]} An array of Cloud objects.
 */
function getClouds() {
    return [new Cloud(-360, 1000, 400, true, 0.3, 'img/5_background/layers/4_clouds/1.png'), new Cloud(-370, 900, 400, false, 0.15, 'img/5_background/layers/4_clouds/1.png'), new Cloud(-370, 1000, 400, false, 0.25, 'img/5_background/layers/4_clouds/2.png'), new Cloud(-360, 800, 700, true, 0.10, 'img/5_background/layers/4_clouds/2.png'), new Cloud(-350, 1000, 400, true, 0.3, 'img/5_background/layers/4_clouds/1.png'), new Cloud(-380, 900, 400, false, 0.15, 'img/5_background/layers/4_clouds/1.png'), new Cloud(-370, 1000, 400, false, 0.25, 'img/5_background/layers/4_clouds/2.png'), new Cloud(-370, 800, 700, true, 0.10, 'img/5_background/layers/4_clouds/2.png'), new Cloud(-350, 1000, 400, true, 0.3, 'img/5_background/layers/4_clouds/1.png'), new Cloud(-365, 900, 400, false, 0.15, 'img/5_background/layers/4_clouds/1.png'), new Cloud(-355, 1000, 400, false, 0.25, 'img/5_background/layers/4_clouds/2.png'), new Cloud(-345, 800, 700, true, 0.10, 'img/5_background/layers/4_clouds/2.png')];
}

/**
 * Function that returns the background objects for Level 1.
 * @returns {BackgroundObject[]} An array of BackgroundObject objects.
 */
function getBackgrounds() {
    return [new BackgroundObject('img/5_background/layers/air.png', -1919, null, 2000), new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -1919), new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -1919), new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -1919), new BackgroundObject('img/5_background/layers/air.png', 0, null, 2000), new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0), new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0), new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0), new BackgroundObject('img/5_background/layers/air.png', 1919, null, 2000), new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 1919), new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 1919), new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 1919), new BackgroundObject('img/5_background/layers/air.png', 3838, null, 2000), new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 3838), new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 3838), new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 3838), new BackgroundObject('img/5_background/layers/air.png', 5757, null, 2000), new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 5757), new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 5757), new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 5757), new BackgroundObject('img/5_background/layers/air.png', 7676, null, 2000), new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 7676), new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 7676), new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 7676), new BackgroundObject('img/5_background/layers/air.png', 9595, null, 2000), new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 9595), new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 9595), new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 9595), new BackgroundObject('img/5_background/layers/air.png', 11514, null, 2000), new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 11514), new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 11514), new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 11514), new BackgroundObject('img/5_background/layers/air.png', 13433, null, 2000), new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 13433), new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 13433), new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 13433)];
}

/**
 * Function that returns the coins for Level 1.
 * @returns {Coin[]} An array of Coin objects.
 */
function getCoins() {
    const positions = [
        [1500, 625], [1450, 600], [1400, 575], [1375, 525], [1400, 475], [1450, 450], [1500, 475], [1550, 450], [1600, 475], [1625, 525], [1600, 575], [1550, 600], [5000, 450], [5050, 400], [5100, 350], [5150, 345], [5200, 350], [5250, 400], [5300, 450], [7725, 550], [7825, 575], [10650, 450], [10850, 450], [11050, 450], [12100, 375], [12175, 375]
    ];
    return positions.map(pos => new Coin(...pos));
}

/**
 * Function that returns the bottles for Level 1.
 * @returns {Bottle[]} An array of Bottle objects.
 */
function getBottles() {
    return [
        new Bottle(1300, 888), new Bottle(2450, 900), new Bottle(2550, 900), new Bottle(3300, 800), new Bottle(3500, 900), new Bottle(3550, 904), new Bottle(4000, 885), new Bottle(4300, 890), new Bottle(5599, 900), new Bottle(6200, 905), new Bottle(8200, 900), new Bottle(9100, 820), new Bottle(9200, 870), new Bottle(9500, 900), new Bottle(10000, 870), new Bottle(11111, 905), new Bottle(11166, 880),
    ]
}

/**
 * Function that returns the platforms for Level 1.
 * @returns {Platform[]} An array of Platform objects.
 */
function getPlatforms() {
    return [
        new Platform(-600, 100, 700, 1000, true, 'img/statue.png'), new Platform(13585, -795, 1500, 1710, false, 'img/tower.png'), new Platform(10300, 150, 300, 800, false, 'img/cactus.png'), new Box(2900, 835, 80, 80, false, 'img/open.chest.png', 'img/close.chest.png', [new Coin(), new Coin()]), new Box(4565, 835, 80, 80, true, 'img/open.chest.png', 'img/close.chest.png', [new Coin(), new Coin(), new Coin(), new Coin()]), new Box(9850, 835, 80, 80, false, 'img/open.chest.png', 'img/close.chest.png', [new Coin(), new Coin(), new Coin(),]), new Box(13900, 720, 250, 250, false, 'img/open.chest.png', 'img/close.chest.png', [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin()]),

    ]
}

/**
 * Function that returns the flag for Level 1.
 * @returns {Flag[]} An array of Flag objects.
 */
function getFlag() {
    return [
        new Flag(14000, 200, 670, 128, 'img/flag.png'),
    ]
}

/**
 * Function that returns the status bars for Level 1.
 * @returns {Statusbar[]} An array of Statusbar objects.
 */
function getStatusbars() {
    return [
        new MunitionStatusbar(50, 110, 'img/7_statusbars/3_icons/icon_salsa_bottle.png', 60, 80),
        new CoinStatusbar(50, 180, 'img/7_statusbars/3_icons/icon_coin.png', 60, 80),
    ]
}

/**
 * Function that returns the players for Level 1.
 * @param {Keyboard} keyboard1 The keyboard configuration for player 1.
 * @returns {Player[]} An array of Player objects.
 */
function getPlayers(keyboard1) {
    return [
        new Player({
            name: "Alex",
            x: 200,
            y: 600,
            width: 150,
            height: 300,
            hp: 10000,
            damage: 10,
            keyboard: keyboard1,
            color: "blue"
        }),
    ]
}

/**
 * Function that starts the game.
 * Initializes the game world and starts rendering.
 */
function startGame() {
    let game_window_start = document.getElementById('game_window_start');
    let game_over = document.getElementById('game_over');
    let soundStummButton = document.getElementById('soundStummButton');
    let fullscreenButton = document.getElementById('fullscreenButton');
    let level = getLevel1();
    let youwon = document.getElementById('you_won');
    let btnOpen = document.getElementById('btnOpen');
    let btnThrow = document.getElementById('btnThrow');
    let btnJump = document.getElementById('btnJump');
    let btnRight = document.getElementById('btnRight');
    let btnLeft = document.getElementById('btnLeft');
    let toMenu = document.getElementById('toMenu');
   
    toMenu.style.display = 'flex';
    btnOpen.style.display = 'flex';
    btnThrow.style.display = 'flex';
    btnJump.style.display = 'flex';
    btnRight.style.display = 'flex';
    btnLeft.style.display = 'flex';
    youwon.style.display = 'none';
    soundStummButton.style.display = 'flex';
    fullscreenButton.style.display = 'flex';
    canvas = document.getElementById('canvas');
    world = new World(canvas, level);
    document.getElementById('panel').style.display = "";
    canvas.style.opacity = '1';
    game_window_start.style.display = 'none';
    game_over.style.display = 'none';   
}

/**
 * Function that toggles fullscreen mode for the game.
 */
function fullscreen() {
    let canvasDiv = document.getElementById('canvasDiv');
    let fullscreenButton = document.getElementById('fullscreenButton');

    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        if (canvasDiv.requestFullscreen) {
            canvasDiv.requestFullscreen();
        } else if (canvasDiv.mozRequestFullScreen) {
            canvasDiv.mozRequestFullScreen();
        } else if (canvasDiv.webkitRequestFullscreen) {
            canvasDiv.webkitRequestFullscreen();
        } else if (canvasDiv.msRequestFullscreen) {
            canvasDiv.msRequestFullscreen();
        }
    }
    fullscreenButton.blur();
}

/**
 * Function that toggles the game audio on/off.
 * Mutes or unmutes the game world audio.
 */
function setAudio() {
    let muteButton = document.getElementById('soundStummButton');

    world.muteButton.click();
    muteButton.blur();
}

/**
 * @fileoverview This script prevents default behavior for certain events on buttons with the class 'btns prevent-default'.
 * 
 * Once the DOM is fully loaded, it adds event listeners to all buttons with the class 'btns prevent-default'
 * to prevent the default actions for 'contextmenu', 'touchstart', and 'touchend' events.
 */
document.addEventListener('DOMContentLoaded', (e) => {
    const buttons = document.querySelectorAll('.btns.prevent-default');
    let canvas = document.getElementById('canvas');
    buttons.forEach(button => {
        button.addEventListener('contextmenu', (e) => e.preventDefault());
        button.addEventListener('touchstart', (e) => {
            if (e.cancelable) {
                e.preventDefault();
            }
        });
        button.addEventListener('touchend', (e) => {
            if (e.cancelable) {
                e.preventDefault();
            }
        });
    });

    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
});

/**
 * Functions for handling left movement start and end events for players.
 */
function leftStart() {
    world.level.players.forEach(player => {
        let btnLeft = document.getElementById('btnLeft');
        if (player.isAlive) {
            player.keyboard.left.Status = true;
            btnLeft.blur();
        }
        
    });
}

function leftEnd() {
    world.level.players.forEach(player => {        
        if (player.isAlive) {
            player.keyboard.left.Status = false;
        }
    });
}

/**
 * Functions for handling right movement start and end events for players.
 */
function rightStart() {
    world.level.players.forEach(player => {
        let btnRight = document.getElementById('btnRight');
        if (player.isAlive) {
            player.keyboard.right.Status = true;
            btnRight.blur();
        }
    });
}

function rightEnd() {
    world.level.players.forEach(player => {
        if (player.isAlive) {
            player.keyboard.right.Status = false;
        }
    });
}

/**
 * Functions for handling jump action start and end events for players.
 */
function jumpStart() {
    world.level.players.forEach(player => {
        let btnJump = document.getElementById('btnJump');
        if (player.isAlive) {
            player.keyboard.space.Status = true;
            btnJump.blur();
        }
    });
}

function jumpEnd() {
    world.level.players.forEach(player => {
        if (player.isAlive) {
            player.keyboard.space.Status = false;
        }
    });
}

/**
 * Functions for handling throw action start and end events for players.
 */
function throwStart() {
    world.level.players.forEach(player => {
        let btnThrow = document.getElementById('btnThrow');
        if (player.isAlive) {
            player.keyboard.f.Status = true;
            btnThrow.blur();
        }
    });
}

function throwEnd() {
    world.level.players.forEach(player => {
        if (player.isAlive) {
            player.keyboard.f.Status = false;
        }
    });
}

/**
 * Functions for handling open action start and end events for players.
 */
function openStart() {
    world.level.players.forEach(player => {
        let btnOpen = document.getElementById('btnOpen');
        if (player.isAlive) {
            player.keyboard.e.Status = true;
            btnOpen.blur();
        }
    });
}

function openEnd() {
    world.level.players.forEach(player => {
        if (player.isAlive) {
            player.keyboard.e.Status = false;
        }
    });
}

/**
 * Checks the orientation of the window and adjusts display properties accordingly.
 * If the window height is greater than the width, displays a landscape message.
 * Otherwise, displays the game canvas and hides the landscape message.
 */
function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        document.getElementById('landscape-message').style.display = 'flex';
        document.getElementById('canvasDiv').style.opacity = '0'
    } else {
        document.getElementById('landscape-message').style.display = 'none';
        document.getElementById('canvasDiv').style.opacity = '1'
    }
}

/**
 * Adds an event listener to the window object for the 'resize' event,
 * which triggers the checkOrientation function when the window is resized.
 */
window.addEventListener('resize', checkOrientation);

/**
 * Adds an event listener to the window object for the 'load' event,
 * which triggers the checkOrientation function when the window finishes loading.
 */
window.addEventListener('load', checkOrientation);