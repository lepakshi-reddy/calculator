
const display = document.getElementById("display");

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;
let resetDisplay = false;

function pressNumber(number) {
    if (display.textContent === "Error") {
        clearCalculator();
    }

    if (waitingForSecondNumber || resetDisplay) {
        display.textContent = number;
        waitingForSecondNumber = false;
        resetDisplay = false;
        return;
    }

    if (display.textContent === "0") {
        display.textContent = number;
    } else {
        display.textContent += number;
    }
}

function pressDecimal() {
    if (display.textContent === "Error") {
        clearCalculator();
    }

    if (waitingForSecondNumber || resetDisplay) {
        display.textContent = "0.";
        waitingForSecondNumber = false;
        resetDisplay = false;
        return;
    }

    if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
}

function chooseOperator(selectedOperator) {
    if (display.textContent === "Error") {
        clearCalculator();
        return;
    }

    const currentNumber = Number(display.textContent);

    if (operator !== null && !waitingForSecondNumber) {
        firstNumber = calculate(firstNumber, currentNumber, operator);
        display.textContent = String(firstNumber);
    } else if (firstNumber === null || resetDisplay) {
        firstNumber = currentNumber;
    }

    operator = selectedOperator;
    waitingForSecondNumber = true;
    resetDisplay = false;
}

function calculate(a, b, selectedOperator) {
    switch (selectedOperator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return b === 0 ? null : a / b;
        default:
            return b;
    }
}

function calculateResult() {
    if (
        operator === null ||
        waitingForSecondNumber ||
        display.textContent === "Error"
    ) {
        return;
    }

    const secondNumber = Number(display.textContent);
    const result = calculate(firstNumber, secondNumber, operator);

    if (result === null || !Number.isFinite(result)) {
        display.textContent = "Error";
    } else {
        display.textContent = String(
            Number(result.toPrecision(12))
        );
    }

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    resetDisplay = true;
}

function clearCalculator() {
    display.textContent = "0";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    resetDisplay = false;
}

function deleteLast() {
    if (display.textContent === "Error") {
        clearCalculator();
        return;
    }

    if (waitingForSecondNumber || resetDisplay) {
        return;
    }

    if (display.textContent.length <= 1) {
        display.textContent = "0";
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
}
