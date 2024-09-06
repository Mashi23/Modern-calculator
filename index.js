const keys = document.querySelectorAll('.key');
const displayInput = document.querySelector('.display .input');
const displayOutput = document.querySelector('.display .output');

let input = "";

keys.forEach((key) => {
    const value = key.dataset.key; 

    key.addEventListener('click', () => {
        if (value === "clear") {
            input = "";
            displayInput.innerHTML = "";
            displayOutput.innerHTML = "";
        } else if (value === "backspace") {
            input = input.slice(0, -1);
            displayInput.innerHTML = formatInput(input);
        } else if (value === "=") {
            try {
                const result = eval(prepareInput(input)); 
                displayOutput.innerHTML = formatOutput(result);
            } catch (error) {
                displayOutput.innerHTML = "Error"; 
            }
        } else if (value === "brackets") {
            if (shouldAddOpeningBracket(input)) {
                input += "(";
            } else {
                input += ")";
            }
            displayInput.innerHTML = formatInput(input);
        } else {
            if (isValidInput(value)) {
                input += value;
                displayInput.innerHTML = formatInput(input);
            }
        }
    });
});

function formatInput(input) {
    return input.split("").map(char => {
        if (char === "*") return '<span class="operator">x</span>';
        if (char === "/") return '<span class="operator">÷</span>';
        if (char === "+") return '<span class="operator">+</span>';
        if (char === "-") return '<span class="operator">-</span>';
        if (char === "(") return '<span class="brackets">(</span>';
        if (char === ")") return '<span class="brackets">)</span>';
        if (char === "%") return '<span class="percent">%</span>';
        return char;
    }).join("");
}

function formatOutput(output) {
    let [integer, decimal] = output.toString().split(".");
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimal ? `${integer}.${decimal}` : integer;
}

function prepareInput(input) {
    return input.replace(/%/g, "/100");
}

function shouldAddOpeningBracket(input) {
    const openBrackets = (input.match(/\(/g) || []).length;
    const closeBrackets = (input.match(/\)/g) || []).length;
    return openBrackets <= closeBrackets;
}

function isValidInput(value) {
    const lastInput = input.slice(-1);
    const operators = ["+", "-", "*", "/"];

    if (value === "." && lastInput === ".") return false; 
    if (operators.includes(value) && operators.includes(lastInput)) return false; 
    return true;
}
