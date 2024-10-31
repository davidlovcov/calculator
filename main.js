let firstNumber = '';
let secondNumber = '';
let operator = '';

const displayText = document.querySelector('.display');
displayText.textContent = '0';

const add = (firstNumber, secondNumber) => {
    return firstNumber + secondNumber;
};

const subtract = (firstNumber, secondNumber) => {
    return firstNumber - secondNumber;
};

const multiply = (firstNumber, secondNumber) => {
    return firstNumber * secondNumber;
};

const divide = (firstNumber, secondNumber) => {
    if (secondNumber == 0) {
        return "Error";
    } else {
        return firstNumber / secondNumber;
    }
};

const modulo = (firstNumber, secondNumber) => {
    return firstNumber % secondNumber;
};

const operate = (firstNumber, secondNumber, operator) => {
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    if (operator == '+') {
        return add(firstNumber, secondNumber);
    } else if (operator == '-') {
        return subtract(firstNumber, secondNumber);
    } else if (operator == 'x') {
        return multiply(firstNumber, secondNumber);
    } else if (operator == '÷') {
        return divide(firstNumber, secondNumber);
    } else if (operator == '%') {
        return modulo(firstNumber, secondNumber);
    }
};

const isNumber = (number) => {
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return numbers.includes(number);
};

const populateDisplay = (input) => {
    if (isNumber(input)) {
        if (operator == '') {
            displayText.textContent == '0' || displayText.textContent == "Error" ? displayText.textContent = input : displayText.textContent += input;
            firstNumber += input;
        } else {
            secondNumber += input;
            displayText.textContent += input;
        }
    } else {
        if (operator == '') {
            operator = input;
            displayText.textContent += ' ' + input + ' ';
        } else if (operator != '' && secondNumber == '') {
            operator = input;
            displayText.textContent = displayText.textContent.slice(0, -2) + operator + ' ';
        } else {
            displayText.textContent = operate(firstNumber, secondNumber, operator) + ' ' + input + ' ';
            firstNumber = displayText.textContent;
            secondNumber = '';
            operator = input;
        }
    }
};

const handleResultButton = () => {
    if (firstNumber != '' && secondNumber != '' && operator != '') {
        displayText.textContent = operate(firstNumber, secondNumber, operator);
        firstNumber = displayText.textContent;
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
    displayText.textContent = displayText.textContent.slice(0, -1) + '';
    if (operator != '' && secondNumber != '') {
        secondNumber = secondNumber.slice(0, -1) + '';
    } else if (operator != '' && secondNumber == ''){
        operator = '';
        displayText.textContent = displayText.textContent.slice(0, -2) + '';
    } else {
        firstNumber = firstNumber.slice(0, -1) + '';
    }

    if (displayText.textContent == '') {
        displayText.textContent = '0';
    }
};

const numberButtons = document.querySelectorAll('.number-btn');
numberButtons.forEach(element => {
    element.addEventListener('click', () => populateDisplay(element.textContent));
});

const operatorButtons = document.querySelectorAll('.operator-btn');
operatorButtons.forEach(element => {
    element.addEventListener('click', () => populateDisplay(element.textContent));
});

const resultButton = document.querySelector('.result-btn');
resultButton.addEventListener('click', handleResultButton);

const clearAllButton = document.querySelector('.clear-all-btn');
clearAllButton.addEventListener('click', handleClearAllButton);

const clearLastDigitButton = document.querySelector('.clear-last-digit-btn');
clearLastDigitButton.addEventListener('click', handleClearLastDigitButton);