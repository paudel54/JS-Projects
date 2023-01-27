const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
// console.log(inputBtns)
// shows 17 btn with class name
const clearBtn = document.getElementById('clear-btn');

// Add Event Listeners for numbers, operators,decimal buttons
function sendNumberValue(number) {
    console.log(number);
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

function addDecimal() {
    // If no decimal, add one 
    if (!calculatorDisplay.textContent.includes('.')) {
        // added decimal after the dispaly numbers
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

inputBtns.forEach((inputBtn) => {
    // target input button with no classList, here numbers only have no classList
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// Reset Display
function resetAll() {
    calculatorDisplay.textContent = '0';
}

// Event listener for clear btn

clearBtn.addEventListener('click', resetAll);