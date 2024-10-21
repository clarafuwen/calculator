const digits = document.querySelector(".digits");
const decimal = digits.querySelector(".decimal");
const operators = document.querySelector(".operators");
const equals = document.querySelector(".equals");
const ac = document.querySelector(".ac");
const display = document.querySelector(".display");
let op1_array = [];
let op2_array = [];
let operand1 = null;
let operand2 = null;
let operator = null;
let result = null;

digits.addEventListener("click", (e)=>{
    if(e.target.textContent === "." && !decimal.className.includes("on")){
        decimal.classList.add("on");
        operand1? op2_array.push(e.target.textContent): op1_array.push(e.target.textContent);
    } else if(e.target.textContent !== "." ){
        operand1? op2_array.push(e.target.textContent): op1_array.push(e.target.textContent);
    }
    display.textContent = operand1? op2_array.join("") : op1_array.join("");
})

operators.addEventListener("click", (e) =>{
    if(!operand1){
        operand1 = Number(op1_array.join(""));
        decimal.classList.remove("on");
    }
    console.log(operand1);
    operator = e.target.textContent;
    display.textContent = operator;
})


equals.addEventListener("click", (e) => {
    if(!operand2){
        operand2 = Number(op2_array.join(""));
    }
    display.textContent = operand2;
    decimal.classList.remove("on");
    if(operand1.toString() && operator && operand2.toString()){
        operate(operand1, operator, operand2);
    }
    display.textContent = result;
    console.log(`${operand1} ${operator} ${operand2} = ${result}`);
    op1_array = [];
    op2_array = [];
    operand1 = result;
    operand2 = null;
})

ac.addEventListener("click", ()=>{
    clear();
})

function operate(operand1, operator, operand2){
    switch(operator){
        case "+": {
            result = operand1 + operand2;
            break;
        }
        case "-": {
            result = operand1 - operand2;
            break;
        }
        case "*": {
            result = operand1 * operand2;
            break;
        }
        case "/": {
            console.log("inside /")
            console.log(operand2===0);

            result = operand2===0? "ERROR" : operand1/operand2;
            break; 
        }
    }
}

function clear(){
    op1_array = [];
    op2_array = [];
    operand1 = null;
    operand2 = null;
    operator = null;
    result = null;
    display.textContent = "0";
    decimal.classList.remove("on");
}

function reset(){

}
