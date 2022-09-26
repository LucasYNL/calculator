const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.ops');
const equal = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const display = document.querySelector('.display');
let valueOne = '';
let valueTwo = '';
let oper = '';
let screenDisplay = '';

numbers.forEach(function (x){
    x.addEventListener('click', () =>{
        if(oper == ''){
            display.value = '';
            valueOne += x.value;
            screenDisplay += x.value;
            display.value = screenDisplay;
        }else if(oper != ''){
            valueTwo += x.value;
            screenDisplay += x.value;
            display.value = screenDisplay;
        }
    });
});

operators.forEach(function(y){
    y.addEventListener('click', () =>{
        oper = y.value;
        screenDisplay += y.name;
        display.value = screenDisplay;
    });
});

equal.addEventListener('click', () =>{
    let sum = operate(valueOne, valueTwo, oper);
    display.value = sum;
});

clear.addEventListener('click', () =>{
    valueOne, valueTwo, oper, screenDisplay = '';
    display.value = '0';
});

function add(x, y){
    return x + y;
}

function subtract(x, y){
    return x - y;
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    return x / y;
}

function operate(num1, num2, op){
    num1 = Number(num1);
    num2 = Number(num2);
    if(op == '+'){
        return add(num1, num2);
    }else if(op == '-'){
        return subtract(num1, num2);
    }else if(op == '*'){
        return multiply(num1, num2);
    }else if(op == '/'){
        return divide(num1, num2);
    }
}