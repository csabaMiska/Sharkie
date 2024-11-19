class DrawableObject {
    x;
    y;
    height;
    width;
    img;
    imgCache = {};

    /**
     * Loads a single image for the object.
     * 
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Preloads multiple images and stores them in the image cache.
     * 
     * @param {string[]} arr - An array of image paths to preload.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    /**
     * Draws the object onto a canvas context.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Removes the object from the canvas by clearing its area.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {DrawableObject} object - The object to be removed.
     */
    deleteObject(ctx, object) {
        ctx.clearRect(object.x, object.y, object.width, object.height);
    }
}
