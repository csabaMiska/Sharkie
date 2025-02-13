class EndBossBar extends DrawableObject {
    IMAGES = [
        'img/4. Marcadores/orange/end_boss_bar_0.png',
        'img/4. Marcadores/orange/end_boss_bar_20.png',
        'img/4. Marcadores/orange/end_boss_bar_40.png',
        'img/4. Marcadores/orange/end_boss_bar_60.png',
        'img/4. Marcadores/orange/end_boss_bar_80.png',
        'img/4. Marcadores/orange/end_boss_bar_100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 710;
        this.y = -20;
        this.width = 500;
        this.height = 150;

        this.setPercentage(100);
    }

    /**
     * Updates the health bar's percentage and changes the displayed image accordingly.
     * 
     * @param {number} percentage - The current health percentage (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imgCache[imagePath];
    }

    /**
     * Resolves the index of the appropriate image based on the current health percentage.
     * 
     * @returns {number} The index of the image in the `IMAGES` array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
