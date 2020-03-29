var sellerSignupEmail = document.getElementById('seller-signup-email');
var sellerSignupName = document.getElementById('seller-signup-name');
var sellerSignupPassword = document.getElementById('seller-signup-password');

var buyerSignupName = document.getElementById('buyer-signup-name');
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

var createAccount = document.getElementById("create-account");
var signupOpts = document.getElementById("signupOpts");
var loginOpts = document.getElementById("loginOpts");
signupOpts.style.display = "none";
loginOpts.style.display = "none";
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
    createAccount.style.display = "block";
    signupOpts.style.display = "block";
    loginOpts.style.display = "none";

}

function signup() {
    var body = "";

    switch (userType) {
        case 'buyer':
            body = JSON.stringify({
                "name": buyerSignupName.value,
                "email": buyerSignupEmail.value,
                "password": buyerSignupPassword.value,
                "userType": 'buyer'
            });
            break;
        case 'seller':
            body = JSON.stringify({
                "email": sellerSignupEmail.value,
                "password": sellerSignupPassword.value,
                "name": sellerSignupName.value,
                "userType": 'seller'
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
            } else {
                authStatus.style.display = "block";
                authStatus.innerHTML = responseJson['status'];
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
                location.href = "/dashboard";
            } else {
                authStatus.style.display = "block";
                authStatus.innerHTML = responseJson['status'];
            }
        });
}

function displayLogin() {
    signupCard.style.display = "none";
    loginCard.style.display = "block";
    signupOpts.style.display = "none";
    loginOpts.style.display = "block";

}
function displayRegister() {
    signupCard.style.display = "block";
    loginCard.style.display = "none";
    signupOpts.style.display = "block";
    loginOpts.style.display = "none";
}

function goBack() {
    signupCard.style.display = null;
    buyerSignup.style.display = "none";
    sellerSignup.style.display = "none";
    userTypeSelect.style.display = null;
    createAccount.style.display = "none";
    signupOpts.style.display = "none";
    loginOpts.style.display = "none";
    loginCard.style.display = "none"
    userType = "";
}