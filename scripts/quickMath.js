function RandomInRange(min, max) {
    return  Math.floor(Math.random() * (max - min + 1));
}

function RandomElementFromArray(arr) {
    let size = arr.length;
    let position = RandomInRange(1, size);
    let value = arr[position];
    arr.splice(position, 1);
    return value;
}

function RandomArrayOfInterger(size, min, max) {
    const arr = [];
    for (let i = min; i <= max; i++) {
        arr.push(i);
    }
    const result = [];
    for (let i = 0; i < size; i++) {
        let value = RandomElementFromArray(arr);
        result.push(value);
    }
    return result;
}

function concat(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i]);
    }
    return newArr;
}

function toString(value) {
    return JSON.stringify(value);
}

function RandomSolution(arr) {
    let size = arr.length;
    let text = [];
    let valid = [];
    for ( let i = 0; i < arr.length; i++){
        valid[i] = true;
    }

    while (size > 1) {
        let firstPosition = RandomInRange(0, size - 1);
        let secondPosition = RandomInRange(0, size - 1);
        if (secondPosition === firstPosition) {
            secondPosition = (secondPosition + 1) % size;
        }
        if (firstPosition > secondPosition) {
            [firstPosition, secondPosition] = [secondPosition, firstPosition]
        }
        let firstValue = arr[firstPosition];
        let secondValue = arr[secondPosition];
        let option = RandomInRange(0, 5);
        let result;
        let skip = false;
        let useTwoValue = true;
        switch (option) {
            case 0:
              result = firstValue + secondValue;
              useTwoValue = true;
              text.push(concat(arr));
              text.push(toString(firstValue) + " + " + toString(secondValue));
              break;
            case 1:
              result = firstValue - secondValue;
              useTwoValue = true;
              text.push(concat(arr));
              text.push(toString(firstValue) + " - " + toString(secondValue));
              break;
            case 2:
              result = firstValue * secondValue;
              useTwoValue = true;
              text.push(concat(arr));
              text.push(toString(firstValue) + " * " + toString(secondValue));
              break;
            case 3:
              if (secondValue === 0 || firstValue % secondValue !== 0) {
                  skip = true;
                  break;
              }
              result = firstValue / secondValue;
              useTwoValue = true;
              text.push(concat(arr));
              text.push(toString(firstValue) + " / " + toString(secondValue));
              break;
            case 4:
                if (!valid[firstPosition] || !valid[secondPosition]) {
                    skip = true;
                    break;
                }
                result = Math.pow(firstValue, secondValue)
                useTwoValue = true;
                text.push(concat(arr));
                text.push(toString(firstValue) + " p'"+ toString(secondValue));
                break;
            case 5:
                if (!valid[firstPosition] || !Number.isInteger(Math.pow(firstValue, 1/2))) {
                    skip = true;
                    break;
                }
                result = Math.pow(firstValue, 1/2);
                useTwoValue = false;
                text.push(concat(arr));
                text.push(toString(firstValue) + " p'1/2 ");
                break;
        }
        if (skip) continue;
        if (useTwoValue) {
            arr.splice(secondPosition, 1);
            valid.splice(secondPosition, 1);
            size--;
        }
        arr.splice(firstPosition, 1);
        valid.splice(firstPosition, 1);
        arr.push(result);
        valid.push(false);
        
    }
    return [arr[0], text];
}

var board = [];

function reset() {
    board = [];
    let elms = document.querySelectorAll(".num-button");
    for(let i = 0; i < elms.length; i++) {
        elms[i].disabled = false;
    }
    document.getElementById("inputBox").innerHTML = "";
}

function RunRandomScript() {
    reset();
    
    const arr = RandomArrayOfInterger(5, 0, 9);

    let elms = document.querySelectorAll(".num-button");
 
    for(let i = 0; i < elms.length; i++) 
        elms[i].innerHTML='-';

    let [value, text] = RandomSolution(concat(arr));

    do {
        [value, text] = RandomSolution(concat(arr));
    }
    while (value < 100 || value > 999 || value === NaN);

    board = arr;
    for (let i = 0; i < arr.length; i++) {
        let id = "numBox" + toString(i)
        document.getElementById(id).innerHTML = arr[i];
    }
    for (let i = 0; i < text.length; i++) {
        console.log(text[i]);
    }
    console.log(value);
    document.getElementById("answerBox").innerHTML = value;
}