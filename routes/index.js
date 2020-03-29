var express = require('express');
var router = express.Router();
var config = require('../config')

router.all('/', function (req, res) {
    data = {
        title: 'Home',
        css: ['/static/css/authcard/authcard.css', '/static/css/index.css'],
        js: ['/static/js/index.js'],
        nav: req.nav,
        flashes: req.flash('messages')
    }
    res.render('index', data);
});

router.all('/api/auth', require('./auth'))

// router.all('/logout', function (req, res) {
//     if (req.session) {
//         req.session.destroy(err => {
//             res.redirect('/')
//         })
//     }
// })
 

module.exports = router
 
