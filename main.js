let firstNumber = '';
let secondNumber = '';
let operator = '';

const displayText = document.querySelector('.display');
displayText.textContent = '0';

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "Error" : a / b);
const modulo = (a, b) => a % b;

const operate = (firstNumber, secondNumber, operator) => {
    const a = parseFloat(firstNumber);
    const b = parseFloat(secondNumber);
    
    switch (operator) {
        case '+': return add(a, b).toString();
        case '-': return subtract(a, b).toString();
        case 'x': return multiply(a, b).toString();
        case '÷': return divide(a, b).toString();
        case '%': return modulo(a, b).toString();
        default: return '';
    }
};

const isNumber = (input) => !isNaN(input);

const checkDecimals = (number) => {
    if (number.includes('.') && number.split('.')[1].length > 6) {
        return parseFloat(number).toFixed(6).toString();
    } else {
        return number;
    }
};

const populateDisplay = (input) => {
    if (isNumber(input)) {
        if (!operator) {
            displayText.textContent == '0' || displayText.textContent == "Error" ? displayText.textContent = input : displayText.textContent += input;
            firstNumber += input;
        } else {
            secondNumber += input;
            displayText.textContent += input;
        }
    } else {
        if (!operator) {
            operator = input;
            displayText.textContent += ` ${input} `;
        } else if (operator && !secondNumber) {
            operator = input;
            displayText.textContent = displayText.textContent.slice(0, -2) + ` ${operator} `;
        } else {
            firstNumber = operate(firstNumber, secondNumber, operator);
            displayText.textContent = checkDecimals(firstNumber) + ` ${input} `;
            secondNumber = '';
            operator = input;
        }
    }
};

const handleResultButton = () => {
    if (firstNumber && secondNumber && operator) {
        firstNumber = operate(firstNumber, secondNumber, operator);
        displayText.textContent = checkDecimals(firstNumber);
        secondNumber = '';
        operator = '';
    }
};

const handleClearAllButton = () => {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    displayText.textContent = '0';
};

const handleClearLastDigitButton = () => {
    if (secondNumber) {
        secondNumber = secondNumber.slice(0, -1) + '';
        displayText.textContent = displayText.textContent.slice(0, -1);
    } else if (operator){
        operator = '';
        displayText.textContent = displayText.textContent.slice(0, -3);
    } else {
        firstNumber = firstNumber.slice(0, -1) + '';
        displayText.textContent = displayText.textContent.slice(0, -1);
    }

    if (displayText.textContent == '') {
        displayText.textContent = '0';
    }
};

const handleChangeSignButton = () => {
    if (secondNumber && operator) {
        secondNumber = (-parseFloat(secondNumber)).toString();

        displayText.textContent = `${firstNumber} ${operator} ${secondNumber}`;
    } else if (firstNumber && !operator) {
        firstNumber = (-parseFloat(firstNumber)).toString();

        displayText.textContent = firstNumber;
    }
};

document.querySelectorAll('.number-btn').forEach(element => {
    element.addEventListener('click', () => populateDisplay(element.textContent));
});

document.querySelectorAll('.operator-btn').forEach(element => {
    element.addEventListener('click', () => populateDisplay(element.textContent));
});

document.querySelector('.result-btn').addEventListener('click', handleResultButton);
document.querySelector('.clear-all-btn').addEventListener('click', handleClearAllButton);
document.querySelector('.clear-last-digit-btn').addEventListener('click', handleClearLastDigitButton);
document.querySelector('.change-sign-btn').addEventListener('click', handleChangeSignButton);