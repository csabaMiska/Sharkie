class PoisonCounter extends MovableObject {
    poisonsNumber = 0;
    playAnimationSounds = true;

    poisonSound = new Audio('audio/game/poison_sound.mp3');

    constructor() {
        super();
    }

    collectPoison() {
        this.poisonsNumber += 1;
        if (this.playAnimationSounds) {
            this.poisonSound.play();
        }
    }

    reset() {
        this.poisonsNumber = 0;
    }
}