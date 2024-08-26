class PoisonCounter extends DrawableObject {
    poisonsNumber = 100;

    constructor() {
        super();
    }

    collectPoison() {
        this.poisonsNumber += 1;
    }
}