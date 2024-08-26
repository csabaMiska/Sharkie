class PoisonCounter extends DrawableObject {
    poisonsNumber = 0;

    constructor() {
        super();
    }

    collectPoison() {
        this.poisonsNumber += 1;
    }
}