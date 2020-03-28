var signupEmail = document.getElementById('signup-email');
var signupName = document.getElementById('signup-name');
var signupPassword = document.getElementById('signup-password');

var loginEmail = document.getElementById("login-email");
var loginPassword = document.getElementById("login-password");

var loginCard = document.getElementById('login-card');
var signupCard = document.getElementById('signup-card');

var authStatus = document.getElementById("auth-status");

function signup() {
    var email = signupEmail.value;
    var name = signupName.value;
    var password = signupPassword.value;

    fetch('/api/signup', {
        "method": "POST",
        "body": JSON.stringify({
            "email": email,
            "password": password,
            "name": name
        })
    })
    .then(response => response.json())
    .then(responseJson => {
        if (responseJson['status'] === "register/success") {
            authStatus.style.display = "block";
            authStatus.innerHTML = "Thanks for registering! Go ahead and sign in.";
        } else if (responseJson['status'] === "incomplete_fields") {
            authStatus.style.display = "block";
            authStatus.innerHTML = "Sorry, one or more fields appear to be blank.";
        } else if (responseJson['status'] === "register/user_exists") {
            authStatus.style.display = "block";
            authStatus.innerHTML = "It looks like you already have an account! Did you forget your password?";
        }
    });

}

function login() {
    var email = loginEmail.value;
    var password = loginPassword.value;

    fetch('/api/login', {
        "method": "POST",
        "body": JSON.stringify({
            "email": email,
            "password": password
        })
    })
    .then(response => response.json())
    .then(responseJson => {
        if (responseJson['status'] === "login/success") {
            document.cookie = `authtoken=${responseJson['authtoken']}; path=/`
            authStatus.style.display = "block";
            authStatus.innerHTML = "It's time to learn more cool stuff!";
            location.href = "/home";
        } else if (responseJson['status'] === "incomplete_fields") {
            authStatus.style.display = "block";
            authStatus.innerHTML = "Sorry, one or more fields appear to be blank.";
        } else if (responseJson['status'] === "login/incorrect_email") {
            authStatus.style.display = "block";
            authStatus.innerHTML = "You don't seem to have an account registered to that email.";
        } else if (responseJson['status'] === "login/incorrect_password") {
            authStatus.style.display = "block";
            authStatus.innerHTML = "That's the wrong password. Keep trying!";
        }
    });
}

function displayLogin() {
    signupCard.style.display = "none";
    loginCard.style.display = "block";
}