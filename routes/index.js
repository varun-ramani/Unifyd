var express = require('express');
var router = express.Router();
var config = require('../config')

router.all('/', function (req, res) {
    res.render('index');
});

// router.all('/login', require('./login'))

// router.all('/logout', function (req, res) {
//     if (req.session) {
//         req.session.destroy(err => {
//             res.redirect('/')
//         })
//     }
// })
 

module.exports = router
 
