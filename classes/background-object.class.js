class BackgroundObjects extends MovableObject {
    width = 1920;
    height = 1080;

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}