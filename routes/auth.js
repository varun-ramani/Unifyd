const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {

    var email = req.body['email'];
    var password = req.body['password'];
    var name = req.body['name'];
    var userType = req.body['userType'];

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
    }

    res.send({
        "status": "register/success"
    });
});

router.post('/login', (req, res) => {
    var email = req.body['email'];
    var password = req.body['password'];

    if (email === "" || password === "") {
        res.send({
            "status": "incomplete_fields"
        });
    }

    res.send({
        "status": "login/success"
    });
});

module.exports = router;