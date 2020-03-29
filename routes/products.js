const express = require('express');
const router = express.Router();

router.get('/search', function(req, res) {
    var query = req.body.query;

    return res.send({
        "products": [
            {
                "name": "Toilet Paper", "priceRange": "$10-$50", "category": "Bathroom"
            },
            {
                "name": "Toothbrushes", "priceRange": "$7-$10", "category": "Bathroom"
            },
            {
                "name": "Canned Beans", "priceRange": "$7-$10", "category": "Food"
            },
            {
                "name": "Band-Aids", "priceRange": "$2-$10", "category": "Medical"
            },
            {
                "name": "Clorox Bleach", "priceRange": "$7-$20", "category": "Cleaning"
            }
        ]
    });
});

router.get('/popular', function(req, res) {
    var query = req.body.query;

    return res.send({
        "products": [
            {
                "name": "Toilet Paper", "priceRange": "$10-$50", "category": "Bathroom"
            },
            {
                "name": "Toothbrushes", "priceRange": "$7-$10", "category": "Bathroom"
            },
            {
                "name": "Canned Beans", "priceRange": "$7-$10", "category": "Food"
            },
            {
                "name": "Toilet Paper", "priceRange": "$10-$50", "category": "Bathroom"
            },
            {
                "name": "Toothbrushes", "priceRange": "$7-$10", "category": "Bathroom"
            },
            {
                "name": "Canned Beans", "priceRange": "$7-$10", "category": "Food"
            }
        ]
    });
});

module.exports = router;