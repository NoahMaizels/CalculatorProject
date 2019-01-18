function add (x,y) {
    return x + y;
}

function subtract(x,y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide (x, y) {
    return x / y;
}

function operate (func, x, y) {
    return func(x, y);
}


const buttons = document.querySelectorAll('.button');
const display = document.querySelector('#display');
let inputArray = []
let displayString = '';
let inputArrayIndex = 0;
let snark = 0;


buttons.forEach((button) =>{
    button.addEventListener('click', (e) => {
        
        //Add numbers to input array
        if (button.classList.contains('number')){
            if (typeof(inputArray[inputArrayIndex]) == "undefined"){
                inputArray[inputArrayIndex] = button.id;
            }
            else if (/[0-9]/.test(inputArray[inputArrayIndex]) == true){
                inputArray[inputArrayIndex] = inputArray[inputArrayIndex] + button.id;
            }
            else if (/[0-9]/.test(inputArray[inputArrayIndex]) == false){
                inputArrayIndex += 1;
                inputArray[inputArrayIndex] = button.id;
            }
            displayString = inputArray.join(" ");
        }
        
        //Add operators to input array
        else if (button.classList.contains('operator')) {
            if (typeof(inputArray[inputArrayIndex]) == "undefined"){
                console.log(button.id)
            }
            else if (/[0-9]/.test(inputArray[inputArrayIndex]) == true){
                inputArrayIndex += 1;
                inputArray[inputArrayIndex] = button.id;
            }
            else if (/[0-9]/.test(inputArray[inputArrayIndex]) == false){
                console.log(button.id);
            }
            displayString = inputArray.join(" ");
        }

        // Reset input array values
        else if (button.id == 'clear'){
            inputArray = [];
            inputArrayIndex = 0;
            displayString = inputArray.join(" ");
        }

        // Calculate answer
        else if (button.id == 'equals'){
            console.log(displayString);
            displayString = String(solvePolish(convertToPolish(inputArray)));
            if (snark == 1) {
                displayString = "Dividing by zero is a no no!";
                snark = 0;
            } 
            inputArray = [];
            inputArrayIndex = 0;
        }
       display.innerHTML = displayString;
    });
});

function convertToPolish (sourceArray){
    answerArray = [];
    operatorArray = [];

    function getPrecedence (operator){
        if (operator == "*" || operator == "/")
            return 2;
        else if (operator == "+" || operator == "-")
            return 1;
    }

    for (i = 0; i < sourceArray.length; i++){
        if (/[0-9]/.test(sourceArray[i]) == true) {
            answerArray.push(sourceArray[i])
        }
        else{
            if (operatorArray[0] == undefined){
                operatorArray.push(sourceArray[i]);
            }
            else if (getPrecedence(sourceArray[i]) < getPrecedence(operatorArray[operatorArray.length-1])){
                answerArray.push(operatorArray.pop())
                operatorArray.push(sourceArray[i])
            }
            else if (getPrecedence(sourceArray[i]) == getPrecedence(operatorArray[operatorArray.length-1])){
                answerArray.push(operatorArray.pop())
                operatorArray.push(sourceArray[i])
            }
            else if (getPrecedence(sourceArray[i]) > getPrecedence(operatorArray[operatorArray.length-1])){
                operatorArray.push(sourceArray[i])
            }
        }
    }

    operatorsLeft = operatorArray.length;
    for (i = 0; i < operatorsLeft; i++){
        answerArray.push(operatorArray.pop());
    }

return answerArray;
}

function solvePolish (polishArray){
     while (findFirstOperator(polishArray) != -1){
        let firstOperatorIndex = findFirstOperator(polishArray); 
        if (polishArray[firstOperatorIndex] == "+"){
            polishArray[firstOperatorIndex] =  add(Number(polishArray[firstOperatorIndex - 2]), Number(polishArray[firstOperatorIndex - 1]))
            polishArray.splice(firstOperatorIndex-2, 2)
        }
        if (polishArray[firstOperatorIndex] == "*"){
            polishArray[firstOperatorIndex] =  multiply(Number(polishArray[firstOperatorIndex - 2]), Number(polishArray[firstOperatorIndex - 1]))
            polishArray.splice(firstOperatorIndex-2, 2)
        }
        if (polishArray[firstOperatorIndex] == "-"){
            polishArray[firstOperatorIndex] =  subtract(Number(polishArray[firstOperatorIndex - 2]), Number(polishArray[firstOperatorIndex - 1]))
            polishArray.splice(firstOperatorIndex-2, 2)
        }
        if (polishArray[firstOperatorIndex] == "/"){
            if (Number(polishArray[firstOperatorIndex - 1]) == 0){
                snark = 1;
            }  
            polishArray[firstOperatorIndex] =  divide(Number(polishArray[firstOperatorIndex - 2]), Number(polishArray[firstOperatorIndex - 1]))
            polishArray.splice(firstOperatorIndex-2, 2)
        }
     }
     return polishArray;
}

// Returns index of the first operator in an array
function findFirstOperator(array) {

    for (i = 0; i < array.length; i++){
        if (array[i] == '-' || array[i] == '+' || array[i] == '/' || array[i] == '*'){
            return i;
        }
    }
    return -1;
}
