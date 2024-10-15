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