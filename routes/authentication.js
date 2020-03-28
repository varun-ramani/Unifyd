const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
    console.log(req);
    res.send({
        "status": "register/success"
    });
})

module.exports = router;