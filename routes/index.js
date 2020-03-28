var express = require('express');
var router = express.Router();
var config = require('../config')

router.all('/', function (req, res) {
    if (req.session.user) {
        req.flash('messages', 'Hi ' + req.student_first_name + '!')
    }
    data = {
        name: 'Home',
        nav: req.nav,
        login: req.session.user,
        year: config.year,
        js: 'js/index.js',
        css: 'css/index.css',
        headline: "This year's expo will take place Saturday, October 26th!",
        expo_date: config.expo_date,
        live: config.live,
        flashes: req.flash('messages')
    }
    return res.render('home', data)
});

router.all('/about', function (req, res) {
    data = {
        name: 'About',
        nav: req.nav,
        year: config.year,
        js: '',
        css: '',
        expo_date: config.expo_date,
        live: config.live,
        flashes: req.flash('messages')

    }
    return res.render('about', data)
});

router.all('/contact', function (req, res) {
    data = {
        name: 'Past Expos',
        nav: req.nav,
        year: config.year,
        js: '',
        css: '',
        expo_date: config.expo_date,
        live: config.live,
        flashes: req.flash('messages')

    }
    return res.render('pastExpos', data)
});

router.all('/login', require('./login'))
router.all('/checkin', require('./checkin'))
router.all('/usersearchapi', require('./checkin'))

router.all('/logout', function (req, res) {
    if (req.session) {
        req.session.destroy(err => {
            res.redirect('/')
        })
    }
})
 

module.exports = router
 
