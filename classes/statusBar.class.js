class StatusBar extends DrawableObject {
    IMAGES = [
        'img/4. Marcadores/Purple/0_ .png',
        'img/4. Marcadores/Purple/20__1.png',
        'img/4. Marcadores/Purple/40_ .png',
        'img/4. Marcadores/Purple/60_ .png',
        'img/4. Marcadores/Purple/80_ .png',
        'img/4. Marcadores/Purple/100_ .png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 110;
        this.y = -20;
        this.width = 500;
        this.height = 150;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage value of the status bar and updates the displayed image accordingly.
     * 
     * @param {number} percentage - The percentage to set, ranging from 0 to 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imgCache[imagePath];
    }

    /**
     * Resolves the index of the image that corresponds to the current percentage value.
     * 
     * @returns {number} - The index of the image in the `IMAGES` array that corresponds to the percentage.
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
