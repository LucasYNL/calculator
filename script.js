const eles = document.querySelectorAll('.ele');
const display = document.querySelector('.display');
const dot = document.querySelector('#dot');

let stor = [];
let runnable = true;

eles.forEach(function (x){
    x.addEventListener('click', () =>{
        if(stor.length <= 9){
            if(x.name != ""){
                stor.push(x.name);
                display.value = stor.join('');
                dot.disabled = false;
            }else{
                stor.push(x.value);
                display.value = stor.join('');
            }
        }

        if(x.value === '.'){
            dot.disabled = true;
        }
    });
});

function clearDisplay(){
    reset();
    display.value = '0';
    dot.disabled = false;
}

function wrong(){
    display.value = 'ERROR';
    reset();
}

function reset(){
    let temp = [];
    stor = temp;
}

function calculate(x, y, op){
    let total = 0;
    x = Number(x);
    y = Number(y);

    if(stor[op] === '+'){
        total = x + y;
    }else if(stor[op] === '-'){
        total = x - y;
    }else if(stor[op] == '×'){
        total = x * y;
    }else if(stor[op] == '÷'){
        total = x / y;
    }else{
        runnable = false;
        wrong();
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
    let temp = [];

    if(isNaN(Number(stor[0])) === true && isNaN(Number(stor[0])) === '.' || isNaN(Number(stor[size - 1])) === true){
        runnable = false;
        console.log('check 1');
        wrong();
    }

    if(runnable === true){
        console.log('check 2');
        let op = 0;
        for(let i = 0; i < size; i++){
            if(isNaN(Number(stor[i])) === false || stor[i] === '.'){ //finds the beginning sum
                sum += stor[i];
            }else if(isNaN(Number(stor[i])) === true && isNaN(Number(stor[i + 1])) === false){ //finds operator and keep track of it and finds the sum to be calculated with.
                op = i;
                let sum2 = '';
                for(let x = i + 1; x <= size; x++){ //finds the sum of second.
                    if(isNaN(Number(stor[x])) === false || stor[x] === '.'){ //finds the beginning sum
                        sum2 += stor[x];
                    }else if(isNaN(Number(stor[x])) === true || x === size){ //finds end location and update index
                        i = x - 1;
                        break;
                    }
                }
                console.log('calculate step');
                sum = calculate(sum, sum2, op);            
            }else{
                runnable = false;
                wrong();
                break;
            }
        }
    }

    temp.push(sum);
    stor = temp;

    if(runnable === true){
        display.value = sum;
    }else if(runnable === false){
        runnable = true;
    }

}