const joyStickHandle = document.querySelector(".joystick_handle");
const joyStickContainer = document.querySelector(".joystick");

joyStickContainer.addEventListener("touchstart", handleJoystickStart);

function handleJoystickStart(event) {
    document.addEventListener("touchmove", handleJoystickMove);
    document.addEventListener("touchend", handleJoystickEnd);
}

function handleJoystickMove(event) {
    const { angle, distance } = calculateCircleAngleAndDistance(
        event.touches[0].clientX,
        event.touches[0].clientY
    );

    joyStickHandle.style.transform = `translateY(${-distance}px)`;
    joyStickHandle.parentElement.style.transform = `rotate(${angle}deg)`;
    updateMovementDirection(angle);
}

function handleJoystickEnd() {
    joyStickHandle.style.transform = "";
    joyStickHandle.parentElement.style.transform = "";
    resetMovementDirection();
    document.removeEventListener("touchmove", handleJoystickMove);
    document.removeEventListener("touchend", handleJoystickEnd);
}

function updateMovementDirection(angle) {
    resetMovementDirection(); 

    if (angle >= 20 && angle < 70) {
        keyboard.UP = true;
        keyboard.RIGHT = true;
    } else if (angle >= 70 && angle < 110) {
        keyboard.RIGHT = true;
    } else if (angle >= 110 && angle < 160) {
        keyboard.DOWN = true;
        keyboard.RIGHT = true;
    } else if (angle >= 160 && angle < 200) {
        keyboard.DOWN = true;
    } else if (angle >= 200 && angle < 250) {
        keyboard.DOWN = true;
        keyboard.LEFT = true;
    } else if (angle >= 250 && angle < 290) {
        keyboard.LEFT = true;
    } else if (angle >= 290 && angle < 340) {
        keyboard.LEFT = true;
        keyboard.UP = true;
    } else {
        keyboard.UP = true;
    }
}

function resetMovementDirection() {
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
}

function calculateCircleAngleAndDistance(clientX, clientY) {
    const { x, y, width, height } = joyStickContainer.getBoundingClientRect();

    let distance = Math.sqrt(
        Math.pow(clientX - (x + width / 2), 2) +
        Math.pow(clientY - (y + height / 2), 2)
    );

    distance = clamp(distance, 0, height / 2);

    return {
        angle: calculateAngle(x + width / 2, y + height / 2, clientX, clientY),
        distance,
    };
}

function calculateAngle(centerX, centerY, pointX, pointY) {
    const deltaX = pointX - centerX;
    const deltaY = pointY - centerY;
    const angleInRadians = Math.atan2(deltaY, deltaX);
    let angleInDegrees = (angleInRadians * 180) / Math.PI + 90;
    if (angleInDegrees < 0) angleInDegrees += 360;
    return angleInDegrees;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
