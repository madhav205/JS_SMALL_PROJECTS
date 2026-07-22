function checkPassword() {

    let password = document.getElementById("password").value;
    let length = password.length;
    let result = document.getElementById("result");

    if(length < 8){
        result.innerHTML = "Weak Password";
    }
    else if(length >= 8 && length <= 12){
        result.innerHTML = "Good Password";      
    }
    else{
        result.innerHTML = "Strong Password";
    }

}