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
        user: { name: req.session.name, email: req.session.email, type: req.session.type }
    }
    return res.render('index', data)
});

router.use('/api/auth', require('./auth'));
router.use('/api/products', require('./products'))

//secure
router.use((req, res, next) => {

    if (req.session.email) {
        next()
    } else {
        return res.redirect('/')
    }
});
router.all("/products", function (req, res) {
    data = {
        title: 'Products',
        css: ['/static/css/products.css'],
        js: ['/static/js/handlebars.js', '/static/js/products.js'],
        nav: req.nav,
        messages: req.flash('notif'),
        user: { name: req.session.name, email: req.session.email, type: req.session.type }
    }
    return res.render('products', data)
});

router.all("/dashboard", function (req, res) {
    data = {
        title: 'Dashboard',
        css: ['/static/css/dashboard.css'],
        js: ['/static/js/products.js'],
        nav: req.nav,
        messages: req.flash('notif')
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
        user: { name: req.session.name, email: req.session.email, type: req.session.type }
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

