/**
 * Joystick movement handling script for touch events on a joystick element.
 * This script tracks touch movements and adjusts the joystick handle's position and 
 * the movement direction based on the user's input.
 */

/**
 * Element representing the joystick handle.
 * @type {HTMLElement}
 */
const joyStickHandle = document.querySelector(".joystick_handle");

/**
 * Element representing the joystick container.
 * @type {HTMLElement}
 */
const joyStickContainer = document.querySelector(".joystick");

/**
 * Event listener for touch start on the joystick container. 
 * Initializes movement tracking.
 * @param {TouchEvent} event - The touchstart event.
 */
joyStickContainer.addEventListener("touchstart", handleJoystickStart);

/**
 * Handles the start of a touch event on the joystick container.
 * Adds event listeners for touchmove and touchend to track movement.
 * @param {TouchEvent} event - The touchstart event.
 */
function handleJoystickStart(event) {
    document.addEventListener("touchmove", handleJoystickMove);
    document.addEventListener("touchend", handleJoystickEnd);
}

/**
 * Event listener for touchmove on the document. 
 * Updates joystick handle position and movement direction.
 * @param {TouchEvent} event - The touchmove event.
 */
function handleJoystickMove(event) {
    const { angle, distance } = calculateCircleAngleAndDistance(
        event.touches[0].clientX,
        event.touches[0].clientY
    );

    joyStickHandle.style.transform = `translateY(${-distance}px)`;
    joyStickHandle.parentElement.style.transform = `rotate(${angle}deg)`;
    updateMovementDirection(angle);
}

/**
 * Event listener for touchend on the document. 
 * Resets joystick handle position and movement direction.
 */
function handleJoystickEnd() {
    joyStickHandle.style.transform = "";
    joyStickHandle.parentElement.style.transform = "";
    resetMovementDirection();
    document.removeEventListener("touchmove", handleJoystickMove);
    document.removeEventListener("touchend", handleJoystickEnd);
}

/**
 * Updates the movement direction based on the joystick angle.
 * Resets previous direction before setting the new one.
 * @param {number} angle - The angle (in degrees) of the joystick movement.
 */
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

/**
 * Resets the movement direction, setting all keys to false.
 */
function resetMovementDirection() {
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
}

/**
 * Calculates the angle and distance between the center of the joystick and the touch point.
 * @param {number} clientX - The X coordinate of the touch point.
 * @param {number} clientY - The Y coordinate of the touch point.
 * @returns {{angle: number, distance: number}} The angle (in degrees) and distance (in pixels).
 */
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

/**
 * Calculates the angle (in degrees) between the center of the joystick and a given point.
 * @param {number} centerX - The X coordinate of the center of the joystick.
 * @param {number} centerY - The Y coordinate of the center of the joystick.
 * @param {number} pointX - The X coordinate of the touch point.
 * @param {number} pointY - The Y coordinate of the touch point.
 * @returns {number} The angle in degrees between the center and the touch point.
 */
function calculateAngle(centerX, centerY, pointX, pointY) {
    const deltaX = pointX - centerX;
    const deltaY = pointY - centerY;
    const angleInRadians = Math.atan2(deltaY, deltaX);
    let angleInDegrees = (angleInRadians * 180) / Math.PI + 90;
    if (angleInDegrees < 0) angleInDegrees += 360;
    return angleInDegrees;
}

/**
 * Clamps a value between a minimum and maximum value.
 * @param {number} value - The value to clamp.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} The clamped value.
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
