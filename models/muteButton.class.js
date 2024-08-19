/**
 * Represents a mute button that toggles sound on and off.
 */
class MuteButton {
    /**
     * @type {string} IMAGE_ON - The path to the image representing sound on.
     * @type {string} IMAGE_OFF - The path to the image representing sound off.
     * @type {boolean} isOn - Indicates whether the sound is currently on (true) or off (false).
     */
    IMAGE_ON = 'img/soundOn.png';
    IMAGE_OFF = 'img/soundOff.png';
    isOn = true;

    /**
     * Creates a new MuteButton instance.
     * 
     * @param {string} id - The ID of the HTML element representing the mute button.
     */
    constructor(id, playerInstance) {

        this.id = id;
        this.player = playerInstance;
        this.setIcon();
    }

    /**
     * Toggles the mute state and updates the button's appearance accordingly.
     */
    click() {
        this.isOn = !this.isOn;
        this.setIcon();
        this.world.menuAudio();
    }    
    
    /**
    * Setzt das Icon des Elements basierend auf dem aktuellen Zustand.
    * @function setIcon
    * @memberof ClassName
    * @instance
    * 
    * @description
    * Diese Methode ändert die Hintergrundbild-URL des HTML-Elements, um den Zustand anzuzeigen.
    * Je nach Wert von `this.isOn` wird entweder das Bild für den eingeschalteten oder ausgeschalteten Zustand gesetzt.
     * 
    * @returns {void}
    */
    setIcon() {
        let image = document.getElementById(this.id);

        if (this.isOn) {
            image.style.backgroundImage = `url('${this.IMAGE_ON}')`;
        } else {
            image.style.backgroundImage = `url('${this.IMAGE_OFF}')`;
        }
    }
}