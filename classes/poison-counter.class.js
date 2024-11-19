/**
 * Represents a poison counter that tracks the number of poison items collected in the game.
 * The counter increases as poison items are collected and can play a sound when collecting poison.
 */
class PoisonCounter extends MovableObject {

    /**
     * The number of poison items collected.
     * @type {number}
     */
    poisonsNumber = 0;

    /**
     * Flag to determine whether animation sounds should play when collecting poison.
     * @type {boolean}
     */
    playAnimationSounds = true;

    /**
     * The sound played when a poison item is collected.
     * @type {HTMLAudioElement}
     */
    poisonSound = new Audio('audio/game/poison_sound.mp3');

    /**
     * Creates a new instance of the PoisonCounter, inheriting from MovableObject.
     */
    constructor() {
        super();
    }

    /**
     * Increases the poison counter by 1 and plays a sound if the flag `playAnimationSounds` is true.
     */
    collectPoison() {
        this.poisonsNumber += 1;
        if (this.playAnimationSounds) {
            this.poisonSound.play();
        }
    }

    /**
     * Resets the poison counter to 0.
     */
    reset() {
        this.poisonsNumber = 0;
    }
}
