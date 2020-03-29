var express = require('express');
var router = express.Router();
var config = require('../config')

router.all('/', function (req, res) {
    data = {
        title: 'Home',
        css: ['/static/css/authcard/authcard.css', '/static/css/index.css'],
        js: ['/static/js/index.js'],
        nav: req.nav,
        messages: req.flash('notif')
    }
    return res.render('index', data)
});

router.use('/api/auth', require('./auth'));

router.all("/products", function (req, res) {
    req.flash('notif', req.session.email)

    data = {
        title: 'Products',
        css: ['/static/css/products.css'],
        js: ['/static/js/products.js'],
        nav: req.nav,
        messages: req.flash('notif')
    }
    return res.render('products', data)
});

// router.all('/logout', function (req, res) {
//     if (req.session) {
//         req.session.destroy(err => {
//             res.redirect('/')
//         })
//     }
// })


module.exports = router

