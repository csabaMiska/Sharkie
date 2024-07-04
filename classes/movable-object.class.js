class MovableObject extends DrawableObject {
    speed;
    currentImage = 0;
    otherDirection = false;

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }
}