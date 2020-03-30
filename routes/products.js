const express = require('express');
const router = express.Router();
const dbProducts = require('../database/products')

router.get('/search', async function (req, res) {
    var query = req.query.query;
    if (!query) {
        return res.send({
            "products": []
        })
    }
    dbres = await dbProducts.searchProduct({ search: query });
    console.log(dbres.res);
    return res.send({
        "products": dbres.res
    });
});

router.get('/popular', async function (req, res) {
    dbres = await dbProducts.searchProduct({ search: "popular" })
    console.log(dbres.res);
    return res.send({
        "products": dbres.res
    });
});

module.exports = router;