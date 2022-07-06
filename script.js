let currentValue = '';
let previousValue = '';

let buttons = document.querySelectorAll('.grid *');
let currentDisplay = document.querySelector('#current');
let previousDisplay = document.querySelector('#previous');

let isResult = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = parseInt(a);
    b = parseInt(b);
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        if (e.target.textContent == 'C') {
            if (currentValue.charAt(currentValue.length - 1) == ' ') {
                currentValue = currentValue.slice(0, -2);
            } else {
                currentValue = currentValue.slice(0, -1);
            }
            currentDisplay.textContent = currentValue;
        } else if (e.target.textContent == 'DEL') {
            currentValue = '';
            currentDisplay.textContent = currentValue;
            previousValue = '';
            previousValue.textContent = previousValue;
        } else if (e.target.textContent == '=') {
            isResult = true;
            previousValue = currentValue;
            currArr = currentValue.split(' ');
            currentValue = (operate(currArr[1], currArr[0], currArr[2]) + ' ');
            currentDisplay.textContent = currentValue;
            previousDisplay.textContent = previousValue;
            console.log(currentValue);
        } else {
            if (isResult) {
                if (e.target.textContent >= '0' && e.target.textContent <= '9') {
                    currentValue = '';
                    currentDisplay.textContent = currentValue;
                    previousValue = '';
                    previousValue.textContent = previousValue;
                }
                isResult = false;
            }
            currentValue += (e.target.textContent + ' ');
            currentDisplay.textContent = currentValue;
        }
    })
})