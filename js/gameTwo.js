/**
 * Function that restarts the game by reloading the page.
 */
function restartGame() {
    let optionen = document.getElementById('optionen');
    let canvas = document.getElementById('canvas');
    let game_window_start = document.getElementById('game_window_start');
    let game_over = document.getElementById('game_over');
    let soundStummButton = document.getElementById('soundStummButton');
    let fullscreenButton = document.getElementById('fullscreenButton');
    let impressum = document.getElementById('impressum');
    let datenschutz = document.getElementById('datenschutz');
    let youwon = document.getElementById('you_won');
    let btnOpen = document.getElementById('btnOpen');
    let btnThrow = document.getElementById('btnThrow');
    let btnJump = document.getElementById('btnJump');
    let btnRight = document.getElementById('btnRight');
    let btnLeft = document.getElementById('btnLeft');    
    let toMenu = document.getElementById('toMenu');
   
    toMenu.style.display = 'none';
    btnOpen.style.display = 'none';
    btnThrow.style.display = 'none';
    btnJump.style.display = 'none';
    btnRight.style.display = 'none';
    btnLeft.style.display = 'none';
    youwon.style.display = 'none';
    datenschutz.style.display = 'none';
    impressum.style.display = 'none';
    soundStummButton.style.display = 'none';
    fullscreenButton.style.display = 'none';
    document.getElementById('panel').style.display = "";
    game_window_start.style.display = '';
    game_over.style.display = 'none';
    optionen.style.display = 'none';
    canvas.style.opacity = '0';
    
    toMenu.blur();

    if (world && world.muteButton) {
        world.muteButton.isOn = false;
        world.menuAudio();
    }    
}

/**
 * Function that closes the game window.
 */
function quitGame() {
    window.close();
}

/**
 * Function that shows the game options.
 * Displays the options panel and hides other elements.
 */
function showOptions() {
    let optionen = document.getElementById('optionen');
    let canvas = document.getElementById('canvas');
    let game_window_start = document.getElementById('game_window_start');
    let btnOpen = document.getElementById('btnOpen');
    let btnThrow = document.getElementById('btnThrow');
    let btnJump = document.getElementById('btnJump');
    let btnRight = document.getElementById('btnRight');
    let btnLeft = document.getElementById('btnLeft');

    btnOpen.style.display = 'none';
    btnThrow.style.display = 'none';
    btnJump.style.display = 'none';
    btnRight.style.display = 'none';
    btnLeft.style.display = 'none';
    optionen.style.display = '';
    canvas.style.opacity = '0';
    game_window_start.style.display = 'none';
}

/**
 * Function that hides the game options.
 * Hides the options panel.
 */
function closeOptions() {
    document.getElementById('optionen').style.display = 'none';
}

/**
 * Displays the "You won" screen when the player wins the game.
 * Hides the game canvas and other game elements except for the "You won" message.
 * Updates the total number of collected coins on the screen.
 */
function won() {
    let canvas = document.getElementById('canvas');
    let game_window_start = document.getElementById('game_window_start');
    let won = document.getElementById('you_won');
    let coinsCount = document.getElementById('coinsCount');
    let panel = document.getElementById('panel');
    let toMenu = document.getElementById('toMenu');

    toMenu.style.display = 'none';
    canvas.style.opacity = '0';
    game_window_start.style.display = 'none';
    won.style.display = '';
    panel.style.display = 'none';
    world.level.statusbars.forEach(statusbar => {
        if (statusbar instanceof CoinStatusbar) {
            let text = `${statusbar.count} Coins gesammelt`;
            coinsCount.innerHTML = text;
        }
    });
    
    world.audioMenu.pause();
    world.muteButton.isOn = false;
};

/**
 * Displays the "Impressum" screen when the user selects the "Impressum" option.
 * Hides other game elements and displays the Impressum (imprint) information.
 */
function impressum() {
    let optionen = document.getElementById('optionen');
    let canvas = document.getElementById('canvas');
    let game_window_start = document.getElementById('game_window_start');
    let impressum = document.getElementById('impressum');
    let btnOpen = document.getElementById('btnOpen');
    let btnThrow = document.getElementById('btnThrow');
    let btnJump = document.getElementById('btnJump');
    let btnRight = document.getElementById('btnRight');
    let btnLeft = document.getElementById('btnLeft');

    btnOpen.style.display = 'none';
    btnThrow.style.display = 'none';
    btnJump.style.display = 'none';
    btnRight.style.display = 'none';
    btnLeft.style.display = 'none';
    optionen.style.display = 'none';
    canvas.style.opacity = '0';
    game_window_start.style.display = 'none';
    impressum.style.display = 'flex';
}

/**
 * Displays the "Datenschutz" screen when the user selects the "Datenschutz" option.
 * Hides other game elements and displays the Datenschutz (imprint) information.
 */
function datenschutz() {
    let optionen = document.getElementById('optionen');
    let canvas = document.getElementById('canvas');
    let game_window_start = document.getElementById('game_window_start');
    let datenschutz = document.getElementById('datenschutz');
    let btnOpen = document.getElementById('btnOpen');
    let btnThrow = document.getElementById('btnThrow');
    let btnJump = document.getElementById('btnJump');
    let btnRight = document.getElementById('btnRight');
    let btnLeft = document.getElementById('btnLeft');

    btnOpen.style.display = 'none';
    btnThrow.style.display = 'none';
    btnJump.style.display = 'none';
    btnRight.style.display = 'none';
    btnLeft.style.display = 'none';
    optionen.style.display = 'none';
    canvas.style.opacity = '0';
    game_window_start.style.display = 'none';
    datenschutz.style.display = 'flex';
}