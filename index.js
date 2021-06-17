class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        // we're calling the clear function immediately because we want to clear everything in the output immediately we call the output
        this.readyToReset = false;
        this.clear();
        // this gives us a way to set these text elements inside of our class
    }
    // clear out all the different variables
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
    // delete a single number
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    // what happens when a user clicks on a button to add a number behind the number(s) currently in the ouput screen
    appendNumber(number) {
        // we need to convert them to strings because javascript would try to add them as normal numbers instead of concatenating them and we want to append and not add
        if(number === "." && this.currentOperand.includes(".")) return // this will stop the function from executing any further and the number won't be appended 
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    // when a user clcks on desired operator
    chooseOperation(operation) {
        if(this.currentOperand === "") return // just "return" so that it won't execute any further into the code
        if(this.previousOperand !== "") {
            this.compute() // if the previous operand is not empty(meaning a value has been inputted) run the compute function
        }
        this.operation = operation; // so the calcuslator knows which operator it wants to use to compute a value
        this.previousOperand = this.currentOperand; // just saying, we're done typing the current number so we're moving over to the previous operand
        this.currentOperand  = "" // clearing out the value 
;    }
    // take the values inside the calculator and compute a single value
    compute() {
        // creating a variable that stores the result of our compute function
        let computation;
        const prev = parseFloat(this.previousOperand); // converting our number (that we had earlier converted to a string) back to a number - float so we'll allow decimals
        const current = parseFloat(this.currentOperand);
        // check to ensure the user enters a number
        if (isNaN(prev) || isNaN(current)) return; // stop executing if the user doesn't enter a number
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "&div;":
                computation = prev / current;
                break;
        
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.currentOperand = "";
    }
    // to get that comma-seperated number effect
    getDisplayNumber(number) {
        // to solve the problem of the decimal being input first without having to enter another number first ans so you can add zeros after the decimal place
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0]); // first, split the string number and get the first part before the period
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            // to get that comma-seperated number effect
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractioonDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    // update the values inside the output
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) { // to check if there actually is an operation
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }
        else {
            this.previousOperandTextElement.innerText = "";
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator=  new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})