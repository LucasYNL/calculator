const eles = document.querySelectorAll('.ele');
const display = document.querySelector('.display');
let stor = [];
let runnable = true;

eles.forEach(function (x){
    x.addEventListener('click', () =>{
        if(x.name != ""){
            stor.push(x.name);
            display.value = stor.join('');
        }else{
            stor.push(x.value);
            display.value = stor.join('');
        }
    });
});

function clearDisplay(){
    let temp = [];
    stor = temp;
    display.value = '0';
}

function restart(){
    alert('Please enter a proper calculation');
    clearDisplay();
}

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

function calculate(x, y, op){
    let total = 0;
    x = Number(x);
    y = Number(y);

    if(stor[op] === '+'){
        total = add(x, y);
    }else if(stor[op] === '-'){
        total = subtract(x, y);
    }else if(stor[op] === '&times'){
        total = multiply(x, y);
    }else if(stor[op] === '&#247'){
        total = divide(x, y);
    }else{
        runnable = false;
        restart();
    }

    return total.toString();
}

function operate(){
    let size = stor.length;
    let sum, temp = '';

    if(isNaN(Number(stor[0])) === true || isNaN(Number(stor[size - 1])) === true){
        runnable = false;
        restart();
    }

    if(runnable === true){
        let op = 0;
        for(let i = 0; i < size; i++){
            if(isNaN(Number(stor[i])) === false){ //finds the beginning sum
                sum += stor[i];
            }else if(isNaN(Number(stor[i])) === true){ //finds operator and keep track of it and finds the sum to be calculated with.
                op = i;
                for(let x = i + 1; x < size; x++){ //finds the sum of second.
                    if(isNaN(Number(stor[x])) === false){
                        temp += stor[x];
                    }else{
                        i = x; //readjust initial loop index
                        sum = calculate(sum, temp, op);
                        temp = '';
                        break;
                    }
                }
            }
        }
    }

    if(runnable === true){
        display.value = sum;
    }else if(runnable === false){
        runnable = true;
    }

}