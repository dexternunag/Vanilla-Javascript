/*
 * Element/s 
 */
// Select options
const operation = document.querySelector('#operation');

// Inputs
const firstNumberElement = document.querySelector('#firstNumber');
const secondNumberElement = document.querySelector('#secondNumber');

// Button
const calculateButton = document.querySelector('#calculate');

// Text
const answer = document.querySelector('#answer');

/*
 * Event/s 
 */
calculateButton.addEventListener('click', calculate);

/*
 * Function/s
 */
function getNumbers() {
    const firstNumber = firstNumberElement.value ? parseInt(firstNumberElement.value) : 0;
    const secondNumber = secondNumberElement.value ? parseInt(secondNumberElement.value) : 0;
    return { firstNumber, secondNumber };
}

function getOperation() {
    return operation.value;
}

function displayAnswer(data) {
    answer.innerHTML = data;
}

function calculate() {
    const { firstNumber, secondNumber } = getNumbers();
    const selectedOperation = getOperation();

    let answer = 0;

    switch (selectedOperation) {
        case 'add':
            answer = firstNumber + secondNumber;
            break;
        case 'subtract':
            answer = firstNumber - secondNumber;
            break;
        case 'multiply':
            answer = firstNumber * secondNumber;
            break;
        case 'divide':
            answer = firstNumber / secondNumber;
            break;
    }

    displayAnswer(answer);
}
