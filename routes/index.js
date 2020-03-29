var express = require('express');
var router = express.Router();
var config = require('../config')

router.all('/', function (req, res) {
    data = {
        title: 'Home',
        css: ['/static/css/authcard/authcard.css', '/static/css/index.css'],
        js: ['/static/js/index.js'],
        nav: req.nav,
        messages: req.flash('notif'),
        user: req.session.user
    }
    return res.render('index', data)
});

router.use('/api/auth', require('./auth'));

//secure
router.use((req, res, next) => {
    console.log("aab "+req.session.user)
    if (req.session.user) {
        return next()
    } else {
        return res.redirect('/')
    }
});

router.use('/api/products', require('./products'))

router.all("/products", function (req, res) {
    data = {
        title: 'Products',
        css: ['/static/css/products.css'],
        js: ['/static/js/handlebars.js', '/static/js/products.js'],
        nav: req.nav,
        messages: req.flash('notif'),
        user: req.session.user
    }
    return res.render('products', data)
});

router.all("/dashboard", function (req, res) {
    data = {
        title: 'Dashboard',
        css: ['/static/css/dashboard.css'],
        js: ['/static/js/dashboard.js'],
        nav: req.nav,
        messages: req.flash('notif'),
        user: req.session.user
    }
    return res.render('buyerdashboard', data);
});

router.all("/analytics", function (req, res) {
    data = {
        title: 'Analytics',
        nav: req.nav,
        css: [],
        js: [],
        messages: req.flash('notif'),
        user: req.session.user
    }
    return res.render('analytics', data);
})

router.all('/logout', function (req, res) {
    if (req.session) {
        req.session.destroy(err => {
        })
    }
    return res.redirect('/')
})


module.exports = router

