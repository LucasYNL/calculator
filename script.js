const eles = document.querySelectorAll('.ele');
const display = document.querySelector('.display');
let stor = [];
let runnable = true;

eles.forEach(function (x){
    x.addEventListener('click', () =>{
        if(stor.length <= 9){
            if(x.name != ""){
                stor.push(x.name);
                display.value = stor.join('');
            }else{
                stor.push(x.value);
                display.value = stor.join('');
            }
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
    }else if(stor[op] == '×'){
        total = multiply(x, y);
    }else if(stor[op] == '÷'){
        total = divide(x, y);
    }else{
        runnable = false;
        restart();
    }

    return total.toString();
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
            if(isNaN(Number(stor[i])) === false){ //finds the beginning sum
                sum += stor[i];
                console.log('1st num');
            }else if(isNaN(Number(stor[i])) === true){ //finds operator and keep track of it and finds the sum to be calculated with.
                op = i;
                let sum2 = '';
                for(let x = i + 1; x <= size; x++){ //finds the sum of second.
                    if(isNaN(Number(stor[x])) === false){
                        sum2 += stor[x];
                        console.log('2nd num');
                    }else if(isNaN(Number(stor[x])) === true || x === size){ //finds end location and update index
                        console.log('found step')
                        i = x - 1;
                        break;
                    }
                }
                console.log('calculate step');
                sum = calculate(sum, sum2, op);            
            }
        }
    }

    if(runnable === true){
        display.value = sum;
    }else if(runnable === false){
        runnable = true;
    }

}