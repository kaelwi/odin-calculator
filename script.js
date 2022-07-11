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
    if (b == 0) {
        return "Error: Division by 0!"
    }
    return a / b;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
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

function checkDot(number) {
    if (number.charAt(0) == '.') {
        number = 0 + number;
    }

    if (number.charAt(number.length-1) == '.') {
        number = number + 0;
    }

    return number;
}

function startCalculation() {
    // Trim any leading or trailing whitespaces
    currentValue = currentValue.trim();
    previousValue = currentValue;
    currArr = currentValue.split(' ');
    if (currArr.length >= 3) {
        // round to at most 2 decimals
        let result = operate(currArr[1], checkDot(currArr[0]), checkDot(currArr[2]));
        if (typeof result !== 'number') {
            currentValue = result;
        } else {
            currentValue = Math.round((result + Number.EPSILON) * 100) / 100;
        }
    } else {
        currentValue = checkDot(currArr[0])
    }
    
}

function setDisplay() {
    currentDisplay.textContent = currentValue;
    previousDisplay.textContent = previousValue;
}

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        if (e.target.textContent == 'C') {
            if (isResult) {
                deleteAll();
            } else {
                removeLast();
            }
            setDisplay();
        } else if (e.target.textContent == 'DEL') {
            deleteAll();
            setDisplay();
        } else if (e.target.textContent == '=') {
            isResult = true;
            startCalculation();
            setDisplay();
        } else {
            // if currentValue is showing result of previous calculation and any number is pressed -> delete previous calculation
            if (isResult) {
                if ((e.target.textContent >= '0' && e.target.textContent <= '9') || e.target.textContent == '.') {
                    deleteAll();
                    setDisplay();
                }
                isResult = false;
            }

            // if last written char in currentValue is a sign and a sign is pressed -> change signs
            if (currentValue.length >=2 && 
                    (currentValue.charAt(currentValue.length - 2) != ' ' && 
                    currentValue.charAt(currentValue.length - 2) != '.' &&
                    (currentValue.charAt(currentValue.length - 2) < '0' || currentValue.charAt(currentValue.length - 2) > '9')) && 
                    (e.target.textContent < '0' || e.target.textContent > '9') && e.target.textContent != '.') {
                currentValue = currentValue.slice(0, -2);
            } 

            // insert whitespace before and after sign
            if (e.target.textContent != '.' && (e.target.textContent < '0' || e.target.textContent > '9') && currentValue.toString().split(' ').length < 3) {
                currentValue += (' ' + e.target.textContent + ' ');
            } 

            if (e.target.textContent == '.' || (e.target.textContent >= '0' && e.target.textContent <= '9')) {
                if (!(e.target.textContent == '.' && currentValue.charAt(currentValue.length - 1) == '.')) {
                    currentValue += e.target.textContent;
                } 
            }
            
            setDisplay();
        }
    })
})