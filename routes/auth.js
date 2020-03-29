const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const config = require('../config')
const dbUsers = require('../database/users')
router.post('/signup', (req, res) => {

    var password = req.body['password'];
    var name = req.body['name'];
    var userType = req.body['userType'];

    if (userType === 'seller') {
        if (email === "" || password === "" || name === "") {
            return res.send({
                "status": "incomplete_fields"
            });
        }
    } else if (userType == 'buyer') {
        if (email === "" || password === "") {
            return res.send({
                "status": "incomplete_fields"
            });
        }
    } else {
        return res.send({
            "status": "error"
        });
    }
    bcrypt.hash(password, config.saltRounds, function (err, hash) {
        if (err) {
            return res.send({
                "status": "error"
            });
        } else {
            data = {
                'type': userType,
                'name': name,
                'email': email,
                'password': hash
            }
            dbres = dbUsers.addUser(data)
            if (dbres['status'] === 'success') {
                return res.send({
                    "status": "register/success"
                });
            } else {
                return res.send({
                    "status": "error"
                });
            }

        }
    });
    return res.send({
        "status": "error"
    });
});

router.post('/login', (req, res) => {
    var email = req.body['email'];
    var password = req.body['password'];

    if (email === "" || password === "") {
        req.flash('nah')
        return res.send({
            "status": "incomplete_fields"
        });
    }

    res.send({
        "status": "login/success"
    });
});

module.exports = router;