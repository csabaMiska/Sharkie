class DrawableObject {
    x;
    y;
    height;
    width;
    img;
    imgCache = {};

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Shark || this instanceof PufferFish || this instanceof JellyFish) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'white';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}