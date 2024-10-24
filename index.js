const digits = document.querySelector(".digits");
const decimal = digits.querySelector(".decimal");
const operators = document.querySelector(".operators");
const equals = document.querySelector(".equals");
const ac = document.querySelector(".ac");
const back = document.querySelector(".delete");
const display = document.querySelector(".display");
const SUPPORTED_KEYBOARD_INPUT = ["1","2","3","4","5","6","7","8","9","0",".","+","-","*","/","=","Clear","Backspace"];
const OPERATORS = ["+","-","*","/"];
let input = [];
let op1_array = [];
let op2_array = [];
let operand1 = null;
let operand2 = null;
let operator = null;
let result = null;

digits.addEventListener("click", (e)=>{
    if(e.target.textContent === "." && !decimal.className.includes("on")){
        decimal.classList.add("on");
        operand1 !==null? op2_array.push(e.target.textContent): op1_array.push(e.target.textContent);
    } else if(e.target.textContent !== "." ){
        operand1 !==null? op2_array.push(e.target.textContent): op1_array.push(e.target.textContent);
    }
    display.textContent = operand1 !==null? op2_array.join("") : op1_array.join("");
    input.push(e.target.textContent);
})

document.addEventListener("keydown", (e)=>{
    if(SUPPORTED_KEYBOARD_INPUT.includes(e.key)){
        if(e.key === "." && !decimal.className.includes("on")){
            decimal.classList.add("on");
            operand1 !== null? op2_array.push(e.key): op1_array.push(e.key);
            input.push(e.key);
        } else if(e.key !== "." ){
            if(OPERATORS.includes(e.key) || e.key==="="){
                if(operator || e.key === "="){
                    operand2 = Number(op2_array.join(""));
                    decimal.classList.remove("on");
                    operate(operand1, operator, operand2);
                    operand1 = result;
                    op1_array = [];
                    op2_array = [];
                    operand2 = null;
                    display.textContent = Number.isInteger(operand1)? operand1: operand1.toFixed(3).replace(/0+$/, '');
                } else {
                    operand1 = operand1 !==null?operand1:Number(op1_array.join(""));
                    decimal.classList.remove("on");
                }
                if(e.key !== "="){
                    operator = e.key;
                    input.push(e.key);
                }
            } else if(e.key==="Backspace"){
                const lastInput = input.pop();
                handleDelete(lastInput);
            } else if(e.key === "Clear"){
                clear();
            } else{
                operand1 !== null? op2_array.push(e.key): op1_array.push(e.key);
                display.textContent = operand1 !==null? op2_array.join("") : op1_array.join("");
                input.push(e.key); 
            }
        }        
    }

})

operators.addEventListener("click", (e) =>{
    if(!operand1){
        operand1 = Number(op1_array.join(""));
        decimal.classList.remove("on");
    } 
    if(!operand2){
        operand2 = Number(op2_array.join(""));
        decimal.classList.remove("on");
    }
    //consecutive input in the format of (4+6-9...) operand1 operator operand2 operator operand2 ..., 
    //treat the second operator as equals and stores the operator for later calculation
    //e.g. 4 + 6 - 9 becomes 4 + 6 = 10, then 10 - 9  = 1
    if(operand1 !==null && operator && operand2 !==null){
        operate(operand1, operator, operand2);
        display.textContent = Number.isInteger(result)? result: result.toFixed(3).replace(/0+$/, '');
        operand1 = result;
        op1_array = [];
        op2_array = [];
        operand2 = null;
        // operator = e.target.textContent;
    }
    operator = e.target.textContent;
    input.push(e.target.textContent);
    // display.textContent = operator;
})


equals.addEventListener("click", (e) => {
    if(!operand2){
        operand2 = Number(op2_array.join(""));
        decimal.classList.remove("on");
    }
    if(operand1 !== null && operator && operand2 !== null){
        operate(operand1, operator, operand2);
    }
    display.textContent = Number.isInteger(result)? result: result.toFixed(3).replace(/0+$/, '');
    console.log(`${operand1} ${operator} ${operand2} = ${result}`);
    op1_array = [];
    op2_array = [];
    operand1 = result;
    operand2 = null;
    operator = null;
})

ac.addEventListener("click", (e)=>{
    clear();
})

back.addEventListener("click", ()=>{
    const lastInput = input.pop();
    handleDelete(lastInput);
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

function handleDelete(lastInput){
    if(["+","-","*","/"].includes(lastInput)){
        operator = null;
        display.textContent = Number.isInteger(operand1)? operand1: operand1.toFixed(3).replace(/0+$/, '');
    } else if(!operand1){
        op1_array.pop();
        if(lastInput === ".") decimal.classList.remove("on");
        display.textContent = operand1 !==null? op2_array.join("") : op1_array.join("");
    } else if(!operand2){
        op2_array.pop();
        if(lastInput === ".") decimal.classList.remove("on");
        display.textContent = operand1 !==null? op2_array.join("") : op1_array.join("");
    } else display.textContent = Number.isInteger(operand1)? operand1: operand1.toFixed(3).replace(/0+$/, '');
}
