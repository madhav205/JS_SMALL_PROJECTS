function add() {

    let num1 =Number(document.getElementById("num1").value);
    let num2=Number(document.getElementById("num2").value);
    let result= document.getElementById("result");

    result.innerHTML ="Result: "+(num1 + num2);
}

function subtract() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);


    let result = document.getElementById("result");

    result.innerHTML = "Result: " + (num1 - num2);
}

function multiply() {

    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);

    let result = document.getElementById("result");

    result.innerHTML = "Result: " + (num1 * num2);
}

function divide() {

    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);

    let result = document.getElementById("result");

    if (num2 === 0) {
        result.innerHTML = "Cannot divide by zero";
    } else {
        result.innerHTML = "Result: " + (num1 / num2);
    }
}

function clearAll() {

    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";

    document.getElementById("result").innerHTML = "Result:";
}