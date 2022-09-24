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
    if(op == '+'){
        add(num1, num2);
    }else if(op == '-'){
        subtract(num1, num2);
    }else if(op =='*'){
        multiply(num1, num2);
    }else if(op =='/'){
        divide(num1, num2);
    }
    
}