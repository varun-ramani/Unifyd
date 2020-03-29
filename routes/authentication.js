const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
    
    var email = req.body['email'];
    var password = req.body['password'];
    var name = req.body['name'];
    var userType = req.body['userType'];

    if (email === "" || password === "" || name === "" || userType === "") {
        res.send({
            "status": "incomplete_fields"
        });
    }

    res.send({
        "status": "register/success"
    });
});

router.post('/login', (req, res) => {

});

module.exports = router;