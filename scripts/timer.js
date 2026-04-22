let countDownInterval;

function toString(value) {
    return JSON.stringify(value);
}

function CountDown() {
    let timer = 30; 
    document.getElementById("clock").innerHTML = timer + " s";
    if (countDownInterval) {
        clearInterval(countDownInterval)
    }

    countDownInterval = setInterval(function() {
        timer--;
        
        if (timer >= 0) {
            document.getElementById("clock").innerHTML = toString(timer) + " s";
        }
        else {
            clearInterval(countDownInterval);
            document.getElementById("clock").innerHTML = "Time's up!"; 
        }
    }, 1000);
    
}