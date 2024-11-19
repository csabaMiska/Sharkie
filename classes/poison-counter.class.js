class PoisonCounter extends MovableObject {
    poisonsNumber = 0;
    playAnimationSounds = true;

    poisonSound = new Audio('audio/game/poison_sound.mp3');

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
