var sellerSignupEmail = document.getElementById('seller-signup-email');
var sellerSignupName = document.getElementById('seller-signup-name');
var sellerSignupPassword = document.getElementById('seller-signup-password');

var buyerSignupEmail = document.getElementById('buyer-signup-email');
var buyerSignupPassword = document.getElementById('buyer-signup-password');

var loginEmail = document.getElementById("login-email");
var loginPassword = document.getElementById("login-password");

var loginCard = document.getElementById('login-card');
var signupCard = document.getElementById('signup-card');

var authStatus = document.getElementById("auth-status");

var userTypeSelect = document.getElementById("usertype-select");
var buyerSignup = document.getElementById('buyer-signup');
var sellerSignup = document.getElementById('seller-signup');

var userType = "";

function selectUsertype(_userType) {
    userType = _userType;
    switch (_userType) {
        case 'buyer':
            buyerSignup.style.display = "block";
            break;
        case 'seller':
            sellerSignup.style.display = "block";
            break;
    }
    userTypeSelect.style.display = "none";
}

function signup() {
    var body = "";

    switch (userType) {
        case 'buyer':
            body = JSON.stringify({
                "email": buyerSignupEmail.value,
                "password": buyerSignupPassword.value
            });
            break;
        case 'seller':
            body = JSON.stringify({
                "email": sellerSignupEmail.value,
                "password": sellerSignupPassword.value,
                "name": sellerSignupName.value
            });
            break;
    }


    fetch('/api/auth/signup', {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": body
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
            } else {
                authStatus.style.display = "block";
                authStatus.innerHTML = "Database error.";
            }
        });

}

function login() {
    var email = loginEmail.value;
    var password = loginPassword.value;

    fetch('/api/auth/login', {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
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
                authStatus.innerHTML = "Let's go!";
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
            } else {
                authStatus.style.display = "block";
                authStatus.innerHTML = "Database error.";
            }
        });
}

function displayLogin() {
    signupCard.style.display = "none";
    loginCard.style.display = "block";
}