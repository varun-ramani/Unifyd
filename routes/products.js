const express = require('express');
const router = express.Router();

router.get('/search', function(req, res) {
    var query = req.body.query;

    return res.send({
        "products": [
            {
                "name": "Toilet Paper", "priceRange": "$10-$50", "category": "Bathroom", "imageSource": "https://wpcdn.us-east-1.vip.tn-cloud.net/www.yaktrinews.com/content/uploads/2020/03/MGN_1280x720_00315P00-ZHJSU-1024x576.jpg"
            },
            {
                "name": "Toothbrushes", "priceRange": "$7-$10", "category": "Bathroom", "imageSource": "https://wpcdn.us-east-1.vip.tn-cloud.net/www.yaktrinews.com/content/uploads/2020/03/MGN_1280x720_00315P00-ZHJSU-1024x576.jpg"
            },
            {
                "name": "Canned Beans", "priceRange": "$7-$10", "category": "Food", "imageSource": "https://wpcdn.us-east-1.vip.tn-cloud.net/www.yaktrinews.com/content/uploads/2020/03/MGN_1280x720_00315P00-ZHJSU-1024x576.jpg"
            },
            {
                "name": "Band-Aids", "priceRange": "$2-$10", "category": "Medical", "imageSource": "https://wpcdn.us-east-1.vip.tn-cloud.net/www.yaktrinews.com/content/uploads/2020/03/MGN_1280x720_00315P00-ZHJSU-1024x576.jpg"
            },
            {
                "name": "Clorox Bleach", "priceRange": "$7-$20", "category": "Cleaning", "imageSource": "https://wpcdn.us-east-1.vip.tn-cloud.net/www.yaktrinews.com/content/uploads/2020/03/MGN_1280x720_00315P00-ZHJSU-1024x576.jpg"
            }
        ]
    });
});

router.get('/popular', function(req, res) {
    var query = req.body.query;

    return res.send({
        "products": [
            {
                "name": "Toilet Paper", "priceRange": "$10-$50", "category": "Bathroom", "imageSource": "https://wpcdn.us-east-1.vip.tn-cloud.net/www.yaktrinews.com/content/uploads/2020/03/MGN_1280x720_00315P00-ZHJSU-1024x576.jpg"
            },
            {
                "name": "Toothbrushes", "priceRange": "$7-$10", "category": "Bathroom", "imageSource": "https://wpcdn.us-east-1.vip.tn-cloud.net/www.yaktrinews.com/content/uploads/2020/03/MGN_1280x720_00315P00-ZHJSU-1024x576.jpg"
            },
            {
                "name": "Canned Beans", "priceRange": "$7-$10", "category": "Food", "imageSource": "https://wpcdn.us-east-1.vip.tn-cloud.net/www.yaktrinews.com/content/uploads/2020/03/MGN_1280x720_00315P00-ZHJSU-1024x576.jpg"
            },
            {
                "name": "Toilet Paper", "priceRange": "$10-$50", "category": "Bathroom", "imageSource": "https://wpcdn.us-east-1.vip.tn-cloud.net/www.yaktrinews.com/content/uploads/2020/03/MGN_1280x720_00315P00-ZHJSU-1024x576.jpg"
            },
            {
                "name": "Toothbrushes", "priceRange": "$7-$10", "category": "Bathroom", "imageSource": "https://wpcdn.us-east-1.vip.tn-cloud.net/www.yaktrinews.com/content/uploads/2020/03/MGN_1280x720_00315P00-ZHJSU-1024x576.jpg"
            },
            {
                "name": "Canned Beans", "priceRange": "$7-$10", "category": "Food", "imageSource": "https://wpcdn.us-east-1.vip.tn-cloud.net/www.yaktrinews.com/content/uploads/2020/03/MGN_1280x720_00315P00-ZHJSU-1024x576.jpg"
            }
        ]
    });
});

module.exports = router;