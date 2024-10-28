class MenuBtn extends MovableObject {
    constructor(canvas) {
        super().loadImage('data:image/svg+xml;base64,' + btoa(`
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="80" viewBox="0 0 100 80">
                <rect width="100" height="15" rx="8"></rect>
                <rect y="30" width="100" height="15" rx="8"></rect>
                <rect y="60" width="100" height="15" rx="8"></rect>
            </svg>
        `));
        this.x = 40;
        this.y = 40;
        this.width = 40;
        this.height = 40;
    }
}