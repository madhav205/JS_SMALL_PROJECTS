function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let result = document.getElementById("result");

    if (username === "admin" && password === "12345") {
        result.innerHTML = "Login Successful";
    }
    else {
        result.innerHTML = "Invalid Credentials";
    }

}