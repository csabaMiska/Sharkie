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
            let btnUp = document.getElementById('btnUp');
            let btnLeft = document.getElementById('btnLeft');
            let btnRight = document.getElementById('btnRight');
            let btnDown = document.getElementById('btnDown');
            let btnD = document.getElementById('btnD');
            let btnSpace = document.getElementById('btnSpace');

            btnUp.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.UP = true;
            });
        
            btnUp.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.UP = false;
            });

            btnLeft.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.LEFT = true;
            });
        
            btnLeft.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.LEFT = false;
            });

            btnRight.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.RIGHT = true;
            });
        
            btnRight.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.RIGHT = false;
            });

            btnDown.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.DOWN = true;
            });
        
            btnDown.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.DOWN = false;
            });

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