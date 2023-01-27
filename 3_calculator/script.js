const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
// console.log(inputBtns)
// shows 17 btn with class name
const clearBtn = document.getElementById('clear-btn');

// Add Event Listeners for numbers, operators,decimal buttons
function sendNumberValue(number) {
    // console.log(number);
    // showing Numbers on calculator display , html id, with css textContent feature

    calculatorDisplay.textContent = number;

}


inputBtns.forEach((inputBtn) => {
    // target input button with no classList, here numbers only have no classList
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => sendNumberValue());
    }
});