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

function removeLast() {
    if (currentValue.charAt(currentValue.length - 1) == ' ') {
        currentValue = currentValue.slice(0, -2);
    } else {
        currentValue = currentValue.slice(0, -1);
    }
}

function deleteAll() {
    currentValue = '';
    previousValue = '';
}

function startCalculation() {
    currentValue = currentValue.trim();
    previousValue = currentValue;
    currArr = currentValue.split(' ');
    if (currArr.length >= 3) {
        currentValue = (operate(currArr[1], currArr[0], currArr[2]));
    } else {
        currentValue = currArr[0];
    }
    
}

function setDisplay() {
    currentDisplay.textContent = currentValue;
    previousDisplay.textContent = previousValue;
}

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        if (e.target.textContent == 'C') {
            removeLast();
            setDisplay();
        } else if (e.target.textContent == 'DEL') {
            deleteAll();
            setDisplay();
        } else if (e.target.textContent == '=') {
            isResult = true;
            startCalculation();
            setDisplay();
        } else {
            if (isResult) {
                if (e.target.textContent >= '0' && e.target.textContent <= '9') {
                    deleteAll();
                    setDisplay();
                }
                isResult = false;
            }

            if (currentValue.length >=2 && 
                    (currentValue.charAt(currentValue.length - 2) != ' ' && 
                    (currentValue.charAt(currentValue.length - 2) < '0' || currentValue.charAt(currentValue.length - 2) > '9')) && 
                    (e.target.textContent < '0' || e.target.textContent > '9')) {
                currentValue = currentValue.slice(0, -2);
            } 

            if ((e.target.textContent < '0' || e.target.textContent > '9') && currentValue.toString().split(' ').length < 3) {
                currentValue += (' ' + e.target.textContent + ' ');
            }

            if (e.target.textContent >= '0' && e.target.textContent <= '9') {
                currentValue += e.target.textContent;
            }
            
            setDisplay();
        }
    })
})