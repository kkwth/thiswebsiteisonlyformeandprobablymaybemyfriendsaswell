let inputBox = document.getElementById("inputBox");

function toString(value) {
    return JSON.stringify(value);
}

function numPress(numBox) {
    inputBox.innerHTML = inputBox.innerHTML + toString(board[numBox]);
}

function opPress(op) {
    if (op == 0)
        inputBox.innerHTML = inputBox.innerHTML.substring(0, inputBox.innerHTML.length - 1);
    else {

        inputBox.innerHTML = inputBox.innerHTML + document.getElementById("op" + toString(op)).innerHTML;
    }
}
        

setInterval(() => {
    inputBox = document.getElementById("inputBox");
    let elms = document.querySelectorAll(".num-button");
    for(let i = 0; i < elms.length; i++) {
        if ((inputBox.innerHTML).includes(elms[i].innerHTML))
            elms[i].disabled = true;
        else
            elms[i].disabled = false;
    }
}, 50);