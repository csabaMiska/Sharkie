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
        if (this instanceof ThrowableObject || this instanceof Shark || this instanceof PufferFish) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'white';
      
            const frameX = this.x + this.offset.left;
            const frameY = this.y + this.offset.top;
            const frameWidth = this.width - this.offset.left - this.offset.right;
            const frameHeight = this.height - this.offset.top - this.offset.bottom;

            ctx.rect(frameX, frameY, frameWidth, frameHeight);
            ctx.stroke();
        }
    }

    deleteObject(ctx, object) {
        ctx.clearRect(object.x, object.y, object.width, object.height);
    }
}