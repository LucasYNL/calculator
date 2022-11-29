const eles = document.querySelectorAll('.ele');
const display = document.querySelector('.display');
const dot = document.querySelector('#dot');

let stor = [];
let runnable = true;
let finished = false;

eles.forEach(function (x){
    x.addEventListener('click', () =>{
        if(finished === true){
            clearDisplay();
            finished = false;
        }

        if(stor.length <= 9){
            if(x.name != ""){
                stor.push(x.name);
                display.value = stor.join('');
                dot.disabled = false;
            }else{
                stor.push(x.value);
                display.value = stor.join('');
                eles.forEach(ops => ops.disabled = false);
            }
        }

        if(x.value === '.'){
            eles.forEach(ops => ops.disabled = false);
            dot.disabled = true;
        }
    });
});

function clearDisplay(){
    let temp = [];
    stor = temp;
    display.value = '0';
    dot.disabled = false;
    eles.forEach(ops => ops.disabled = false);
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
    }else if(stor[op] == '×'){
        total = multiply(x, y);
    }else if(stor[op] == '÷'){
        total = divide(x, y);
    }else{
        runnable = false;
        restart();
    }

    total = total.toString();

    if(total.length >= 9){
        total = total.split('');
        total = total.splice(0, 10);
        total = total.join('');
        total = total.toString();
    }

    return total;
}

function operate(){
    let size = stor.length;
    let sum = '';

    if(isNaN(Number(stor[0])) === true || isNaN(Number(stor[size - 1])) === true){
        runnable = false;
        restart();
    }

    if(runnable === true){
        let op = 0;
        for(let i = 0; i < size; i++){
            if(isNaN(Number(stor[i])) === false || stor[i] === '.'){ //finds the beginning sum
                sum += stor[i];
                console.log('1st num');
            }else if(isNaN(Number(stor[i])) === true && isNaN(Number(stor[i + 1])) === false){ //finds operator and keep track of it and finds the sum to be calculated with.
                op = i;
                let sum2 = '';
                for(let x = i + 1; x <= size; x++){ //finds the sum of second.
                    if(isNaN(Number(stor[x])) === false || stor[x] === '.'){ //finds the beginning sum
                        sum2 += stor[x];
                        console.log('1st num');
                    }else if(isNaN(Number(stor[x])) === true || x === size){ //finds end location and update index
                        console.log('found step')
                        i = x - 1;
                        break;
                    }
                }
                console.log('calculate step');
                sum = calculate(sum, sum2, op);            
            }else{
                runnable = false;
                restart();
                break;
            }
        }
    }

    if(runnable === true){
        display.value = sum;
        finished = true;
    }else if(runnable === false){
        runnable = true;
    }

}