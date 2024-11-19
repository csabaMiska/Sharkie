class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    ESC = false;

    constructor() {
        this.mobileBtnPressEvent();
    }

    /**
     * Sets up touch event listeners for mobile buttons to simulate keyboard actions.
     * Handles the touchstart and touchend events for specific mobile buttons.
     */
    mobileBtnPressEvent() {
        document.addEventListener('DOMContentLoaded', () => {
            let btnD = document.getElementById('btnD');
            let btnSpace = document.getElementById('btnSpace');

            btnD.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.D = true;
            });

            btnD.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.D = false;
            });

            btnSpace.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.SPACE = true;
            });

            btnSpace.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.SPACE = false;
            });
        });
    }
}
