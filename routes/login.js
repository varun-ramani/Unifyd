var express = require('express');
var router = express.Router();
var config = require('../config')
var db = require('../database/user')
var utils = require('../utils')
var bcrypt = require('bcryptjs');

router.get('/login', function (req, res) {
    if (req.auth) {
        return res.redirect('/')
    }
    data = {
        name: 'Login',
        nav: req.nav,
        year: config.year,
        error: false,
        recaptcha_key: config.recaptcha_key,
        js: 'js/login.js',
        css: '',
        expo_date: config.expo_date,
        live: config.live,
        flashes: req.flash('messages')
    }

    console.log(req.flash('messages'))
    return res.render('login', data)
});

router.post('/login', function (req, res) {
    if (req.auth) {
        return res.redirect('/')
    }
    if (req.body.mode == 'staff') {
        staff = true
    } else {
        staff = false
    }
    if (utils.isEmail(req.body.username)) {
        email = req.body.username.trim()
    } else {
        req.flash('messages', 'Not a valid email.')
        return res.redirect('login')
    }
    password = req.body.password

    data = {
        'email': email,
        'password': password,
        'staff': staff
    }
    console.log(data)
    if (!staff) {
        db.getContestantByEmail({ 'email': email }).then((dbres) => {
            if (dbres) {
                if (dbres.verify == true) {
                    if (dbres.student_email == data['email']) {
                        if (bcrypt.compareSync(data['password'], dbres.password)) {
                            req.session.user = dbres._id
                            req.student_first_name = dbres.student_first_name
                            req.flash('messages', 'Hi ' + req.student_first_name + '!')
                            return res.redirect('dashboard')
                        } else {
                            req.flash('messages', 'Bad credentials')
                            return res.redirect('login')
                        }
                    } else {
                        req.flash('messages', 'Bad credentials')
                        return res.redirect('login')
                    }
                } else {
                    req.flash('messages', 'Please verify your account with the email sent to ' + dbres.parent_email)
                    return res.redirect('login') 
                }
            } else {
                req.flash('messages', 'Bad credentials')
                return res.redirect('login')
            }
        }).catch((err) => {
            console.log(err)
            req.flash('messages', 'Failed login')
            return res.redirect('login')
        })
    }

});

module.exports = router