const display = document.querySelector("#display");
const keys = document.querySelectorAll("button");

 let currentValue = "";
 let operator = null;
 let previousValue = null;

 function operate(button){
    const value = button.textContent;
    if (value === "AC"){
        currentValue = "";
        operator = null;
        previousValue = null;
    }
    else if (value === "="){
        if(operator && previousValue !== null){
            currentValue = calculateResult(previousValue,operator,currentValue);
            operator = null;
            previousValue = null;

        }
       
    }
    else if (isOperator(value)){
        if (operator && previousValue !== null){
            operator = value;
            previousValue = currentValue;
        }
        else {
            operator = value;
            previousValue = currentValue;
            currentValue = "";
        }
    }
    else if (value === "%"){
        currentValue = calculatePercentage(currentValue);
    }
    else if (value === "+/-"){
        currentValue = changeSign(currentValue);
    }
    else{
      currentValue = currentValue === 0 ? value : currentValue + value ;
    }

    if (currentValue.length > 9) {
        currentValue = currentValue.slice(0, 9);
    }
    display.textContent = currentValue;

 }
function isOperator(value) {
    return ['+', '-', '*', '/'].includes(value);
 }
function calculateResult(num1, operator, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num2 !== 0 ? num1 / num2 : "Error";
      default:
        return "Error";
    }
 }
 function calculatePercentage(value) {
    return parseFloat(value) / 100;
 }
 function changeSign(value) {
    return changeSign(value) * -1;
 }

keys.forEach(button => {
    button.addEventListener("click", () => {
        operate(button);
    })
})
