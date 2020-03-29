const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {

    var password = req.body['password'];
    var name = req.body['name'];
    var userType = req.body['userType'];
<<<<<<< HEAD
    req.session.email = "vsduf"
    if (email === "" || password === "" || name === "" || userType === "") {
        res.send({
            "status": "incomplete_fields"
        });
=======

    if (userType === 'seller') {
        if (email === "" || password === "" || name === "") {
            res.send({
                "status": "incomplete_fields"
            });
        }
    } else if (userType == 'buyer') {
        if (email === "" || password === "") {
            res.send({
                "status": "incomplete_fields"
            });
        }
>>>>>>> 19fd6c1f483e1ed2e39395a679a52b0a437c7ce5
    }

    res.send({
        "status": "register/success"
    });
});

router.post('/login', (req, res) => {
    var email = req.body['email'];
    var password = req.body['password'];

    if (email === "" || password === "") {
        req.flash('nah')
        res.send({
            "status": "incomplete_fields"
        });
    }

    res.send({
        "status": "login/success"
    });
});

module.exports = router;