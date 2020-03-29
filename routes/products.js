const express = require('express');
const router = express.Router();
const dbProducts = require('../database/products')

router.get('/search', async function (req, res) {
    var query = req.query;
    if (!query) {
        return res.send({
            "products": []
        })
    }
    dbres = await dbProducts.searchProduct(query)
    console.log(dbres.status)
    console.log(dbres.res)
    return res.send({
        "products": dbres.res
    });
});

router.get('/popular', function (req, res) {
    var query = req.body.query;

    return res.send({
        "products": [
            {
                "name": "Toilet Paper1", "description": "An utter necessity!", "priceStart": 10.20, "priceEnd": 12.30, "limit": 10, "categories": ["Bathroom", "Bathroom", "Clothing", "Food"], "images": ["https://wpcdn.us-east-1.vip.tn-cloud.net/www.yaktrinews.com/content/uploads/2020/03/MGN_1280x720_00315P00-ZHJSU-1024x576.jpg", "https://cdn.shopify.com/s/files/1/0049/4449/4638/products/71pm_lMBlML._SL1500_570x570_crop_top.jpg?v=1565798734"]
            },
            {
                "name": "Toilet Paper2", "description": "An utter necessity!", "priceStart": 10.20, "priceEnd": 12.30, "limit": 10, "categories": ["Bathroom"], "images": ["https://wpcdn.us-east-1.vip.tn-cloud.net/www.yaktrinews.com/content/uploads/2020/03/MGN_1280x720_00315P00-ZHJSU-1024x576.jpg", "https://cdn.shopify.com/s/files/1/0049/4449/4638/products/71pm_lMBlML._SL1500_570x570_crop_top.jpg?v=1565798734"]
            },
            {
                "name": "Toilet Paper3", "description": "An utter necessity!", "priceStart": 10.20, "priceEnd": 12.30, "limit": 10, "categories": ["Bathroom"], "images": ["https://wpcdn.us-east-1.vip.tn-cloud.net/www.yaktrinews.com/content/uploads/2020/03/MGN_1280x720_00315P00-ZHJSU-1024x576.jpg", "https://cdn.shopify.com/s/files/1/0049/4449/4638/products/71pm_lMBlML._SL1500_570x570_crop_top.jpg?v=1565798734"]
            },
            {
                "name": "Toilet Paper4", "description": "An utter necessity!", "priceStart": 10.20, "priceEnd": 12.30, "limit": 10, "categories": ["Bathroom"], "images": ["https://wpcdn.us-east-1.vip.tn-cloud.net/www.yaktrinews.com/content/uploads/2020/03/MGN_1280x720_00315P00-ZHJSU-1024x576.jpg", "https://cdn.shopify.com/s/files/1/0049/4449/4638/products/71pm_lMBlML._SL1500_570x570_crop_top.jpg?v=1565798734"]
            },
            {
                "name": "Toilet Paper5", "description": "An utter necessity!", "priceStart": 10.20, "priceEnd": 12.30, "limit": 10, "categories": ["Bathroom"], "images": ["https://wpcdn.us-east-1.vip.tn-cloud.net/www.yaktrinews.com/content/uploads/2020/03/MGN_1280x720_00315P00-ZHJSU-1024x576.jpg", "https://cdn.shopify.com/s/files/1/0049/4449/4638/products/71pm_lMBlML._SL1500_570x570_crop_top.jpg?v=1565798734"]
            }
        ]
    });
});

module.exports = router;