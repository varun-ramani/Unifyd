const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const config = require('../config')
const dbUsers = require('../database/users')

router.post('/signup', async (req, res) => {
    var password = req.body['password'];
    var name = req.body['name'];
    var email = req.body['email'];
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
    email = email.toLowerCase()
    dbres = await dbUsers.getUser({ 'email': email })
    if (dbres.status === 'error') {
        return res.send({
            "status": "error"
        });
    } else if (dbres.res) {
        return res.send({
            "status": "register/user_exists"
        });
    }
    bcrypt.hash(password, config.saltRounds)
        .then(async function (err, hash) {
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
                dbres = await dbUsers.addUser(data)
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
});

router.post('/login', (req, res) => {
    var email = req.body['email'];
    var password = req.body['password'];

    if (email === "" || password === "") {
        return res.send({
            "status": "incomplete_fields"
        });
    }



    return res.send({
        "status": "login/success"
    });
});

module.exports = router;