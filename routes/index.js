var express = require('express');
var router = express.Router();
var config = require('../config')

router.all('/', function (req, res) {
    req.flash('notif', 'Welcome to Unifyd')
    console.log(req.flash('notif'))
    data = {
        title: 'Home',
        css: ['/static/css/authcard/authcard.css', '/static/css/index.css'],
        js: ['/static/js/index.js'],
        nav: req.nav,
        messages: [ 'Welcome to Unifyd' ]
    }
    return res.render('index', data);
});

router.all('/api/auth', require('./auth'))

router.all("/products", function(req,res){
    data ={
        title: 'Products',
        css: ['/static/css/products.css']
    }
    res.render('products',data);
})
// router.all('/logout', function (req, res) {
//     if (req.session) {
//         req.session.destroy(err => {
//             res.redirect('/')
//         })
//     }
// })
 

module.exports = router
 
