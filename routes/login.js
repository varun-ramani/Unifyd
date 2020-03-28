var express = require('express');
var router = express.Router();
var config = require('../config')
// var db = require('../database/users')
// var utils = require('../utils')
var bcrypt = require('bcryptjs');

router.get('/login', function (req, res) {

    return res.send('login')
});


module.exports = router