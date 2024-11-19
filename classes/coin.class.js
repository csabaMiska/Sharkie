class Coin extends MovableObject {
    IMAGES = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png'
    ];

    offset = {
        top: 8,
        bottom: 8,
        left: 8,
        right: 8
    };

    constructor(x, y) {
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 70;

        this.loadImages(this.IMAGES);
        this.animate();
    }

    /**
     * Animates the coin by cycling through its images at a regular interval.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 150);
    }
}
