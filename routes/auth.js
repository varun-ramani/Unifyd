const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const config = require('../config')
const dbUsers = require('../database/users')
const utils = require('../utils')
router.post('/signup', async (req, res) => {
    var password = req.body['password'];
    var name = req.body['name'];
    var email = req.body['email'];
    var userType = req.body['userType'];
    if (userType === 'seller') {
        if (email === "" || password === "" || name === "") {
            return res.send({
                "status": "Some fields are incomplete."
            });
        }
    } else if (userType == 'buyer') {
        if (email === "" || password === "") {
            return res.send({
                "status": "Some fields are incomplete."
            });
        }
    } else {
        return res.send({
            "status": "Neither buyer nor seller error."
        });
    }
    if (!utils.ValidateEmail(email)) {
        return res.send({
            "status": "Not a valid email."
        });
    }
    email = email.toLowerCase()
    dbres = await dbUsers.getUser({ 'email': email })
    if (dbres.status === 'error') {
        return res.send({
            "status": "DB existing user error."
        });
    } else if (dbres.res) {
        return res.send({
            "status": "This email is already in use. Try logging in!"
        });
    }
    bcrypt.hash(password, config.saltRounds)
        .then(async function (hash) {
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
                    "status": "DB add error."
                });
            }
        });
});

router.post('/login', async (req, res) => {
    var email = req.body['email'];
    var password = req.body['password'];

    if (email === "" || password === "") {
        return res.send({
            "status": "Some fields are incomplete."
        });
    }
    email = email.toLowerCase()
    if (!utils.ValidateEmail(email)) {
        return res.send({
            "status": "Not a valid email."
        });
    }
    dbres = await dbUsers.getUser({ 'email': email })
    if (dbres.status === 'error') {
        return res.send({
            "status": "DB error."
        });
    }
    if (!dbres.res) {
        return res.send({
            "status": "Incorrect credentials."
        });
    } else {
        bcrypt.compare(password, dbres.res.password, function (err, result) {
            if (err) {
                return res.send({
                    "status": "Bcrypt error."
                });
            }
            if (result) {
                req.session.email = dbres.res.email
                req.session.name = dbres.res.name
                req.session.type = dbres.res.type
                return res.send({
                    "status": "login/success"
                });
            } else {
                return res.send({
                    "status": "Incorrect credentials."
                });
            }
        });
    }
});

module.exports = router;