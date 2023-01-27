const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
// console.log(inputBtns)
// shows 17 btn with class name
const clearBtn = document.getElementById('clear-btn');

// Calculate First and Second values depending on operator.
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => firstNumber = secondNumber,

};


//Making Operator FUnctionality
let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

// Add Event Listeners for numbers, operators,decimal buttons
function sendNumberValue(number) {
    // once first value entered and hit plus sign we want to reset the display
    if (awaitingNextValue === true) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // console.log(number);
        // showing Numbers on calculator display , html id, with css textContent feature
        // calculatorDisplay.textContent = number;

        //If current display value is 0 replace it with other number, if not 0 concatinate it. 

        const displayValue = calculatorDisplay.textContent;
        // console.log(displayValue);
        //  carries default value 0, given by calculatorDisplay.textContent
        // initially secreen value is 0 , so when it's 0 number would be assingdd to input number, after 1st iteration
        //the default value gets changed, and therefor number would be concatinated with previsous value
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }

}

function addDecimal() {
    // if operator pressed, don't add decimal, on boolean value true is not need to defined , its defalut true
    if (awaitingNextValue) return;
    // If no decimal, add one 
    if (!calculatorDisplay.textContent.includes('.')) {
        // added decimal after the dispaly numbers
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}



function useOperator(operator) {
    // converted text string to number and storing it , when operator are clicked comes here as operator arg
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multipe operators
    if (operatorValue && awaitingNextValue) {
        // update current operator fn
        operatorValue = operator;
        return;
    }
    // Assign first value if no value
    // when opeator is clicked after taking Number Input then
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        console.log(firstValue, operatorValue, currentValue);
        //PASSING DATA TO OBJECT, INTERESTING .  
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        console.log('Calculation', calculation);
        // 
        firstValue = calculation;
    }

    // Ready for next value, store operator
    awaitingNextValue = true;

    operatorValue = operator;
    // console.log('firstValue', firstValue);
    // console.log('operator', operatorValue);
}


// Reset  all values, Display
function resetAll() {
    calculatorDisplay.textContent = '0';
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}


// event listeners
inputBtns.forEach((inputBtn) => {
    // target input button with no classList, here numbers only have no classList
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});


// Event listener for clear btn
clearBtn.addEventListener('click', resetAll);