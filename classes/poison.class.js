class Poison extends MovableObject {
    IMAGES = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png'
    ];

    offset = {
        top: 56,
        bottom: 8,
        left: 24,
        right: 24
    }

    constructor(pufferFish_x, pufferFish_y) {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.x = this.returnX(pufferFish_x);
        this.y = this.returnY(pufferFish_y);
        this.width = 100;
        this.height = 120;
        this.loadImages(this.IMAGES);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 150);
    }

    returnX(pufferFish_x) {
        if(pufferFish_x > 0) {
            return pufferFish_x;
        } else {
            return 700 + Math.random() * 1920
        }
    }

    returnY(pufferFish_y) {
        if (pufferFish_y > 0) {
            this.applyGravity();
            return pufferFish_y
        } else {
            return 850 + Math.random() * 80
        }
    }
}