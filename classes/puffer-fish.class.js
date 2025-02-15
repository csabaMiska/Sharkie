class PufferFish extends MovableObject {
    width = 180;
    height = 180;
    pufferFishIsDead = false;
    playObjectAnimation = true;
    playAnimationSounds = true;
    soundPlayed = false;

    IMAGES_SWIMMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png'
    ];
    IMAGES_DEAD = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png'
    ];

    offset = {
        top: 16,
        bottom: 45,
        left: 10,
        right: 24
    }

    deadSound = new Audio('audio/game/puffer_fish_dead_sound.mp3');

    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500 + Math.random() * (7000 - 2500);
        this.y = 100 + Math.random() * 750;
        this.speed = 1 + Math.random() * 6;
        this.animate();
        this.swimm();
    }

    /**
     * Starts the animation of the PufferFish by playing swimming and dead animations.
     * The animation cycle runs every 140ms.
     */
    animate() {
        setInterval(() => {
            if (this.playObjectAnimation) {
                this.playSwimmAnimation();
                this.playDeadAnimation();
            }
        }, 140)
    }

    /**
     * Makes the PufferFish swim to the left at its current speed.
     * The movement cycle runs every 1/60th of a second.
     */
    swimm() {
        setInterval(() => {
            if (!this.pufferFishIsDead && this.playObjectAnimation) {
                this.swimmLeft(this.speed);
            }
        }, 1000 / 60);
    }

    /**
     * Plays the swimming animation for the PufferFish if it is not dead.
     */
    playSwimmAnimation() {
        if (!this.pufferFishIsDead) {
            this.playAnimation(this.IMAGES_SWIMMING);
        }
    }

    /**
     * Plays the dead animation for the PufferFish if it is dead, and applies gravity to its movement.
     * Plays the death sound and updates the image to the final death image.
     */
    playDeadAnimation() {
        if (this.pufferFishIsDead) {
            this.playAnimation(this.IMAGES_DEAD);
            this.applyGravity();
            this.playDeadSound();
            this.loadImage('img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png');
        }
    }

    /**
     * Plays the death sound of the PufferFish once.
     * The sound is only played once to avoid repetition.
     */
    playDeadSound() {
        if (this.playAnimationSounds && !this.soundPlayed) {
            this.deadSound.play();
            this.soundPlayed = true;
        }
    }
}
