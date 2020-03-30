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
    dbres = await dbProducts.searchProduct({ search: query })
    return res.send({
        "products": dbres.res
    });
});

router.get('/popular', async function (req, res) {
    dbres = await dbProducts.searchProduct({ search: "popular" })

    return res.send({
        "products": dbres.res
    });
});

router.post('/add', async function (req, res) {
    if (req.session.user.type != 'vendor') {
        return res.send({
            "status": "Not a vendor"
        });
    }
    console.log(req.body)
    name = req.body.name
    description = req.body.description
    categories = req.body.categories.replace(/ /g, "").split(",")
    images = req.body.images.replace(/ /g, "").split(",")
    vendorOid = req.session.id
    limit = req.body.limit
    priceStart = req.body.priceStart
    priceEnd = req.body.priceEnd
    if (!name || !description || !images || !vendorOid || !limit || !priceStart || !priceEnd || isNaN(priceEnd) || isNaN(priceStart) || isNaN(limit)) {
        return res.send({
            "status": "Rejected input"
        });
    }
    product = {
        'name': name,
        'description': description,
        'categories': categories,
        'images': images,
        'vendorOid': vendorOid,
        'limit': limit,
        'priceStart': priceStart,
        'priceEnd': priceEnd
    }
    console.log(product)
    dbres = await dbProducts.addProduct(product)
    if (dbres.status == "fail") {
        return res.send({
            "status": "Failed"
        });
    } else {
        req.flash('notif', 'Successfully added!')
        return res.send({
            "status": "success"
        });
    }
});
router.post('/delete', async function (req, res) {
    if (req.session.user.type != 'vendor') {
        return res.send({
            "status": "Not a vendor"
        });
    }
    name = req.body.name
    description = req.body.description
    categories = req.body.categories.replace(/\s/g, "").split(",")
    images = req.body.images.replace(/\s/g, "").split(",")
    vendorOid = req.session.id
    limit = req.body.limit
    priceStart = req.body.priceStart
    priceEnd = req.body.priceEnd
    if (!name || !description || !images || !vendorOid || !limit || !priceStart || !priceEnd || isNaN(priceEnd) || isNaN(priceStart) || isNaN(limit)) {
        return res.send({
            "status": "Rejected input"
        });
    }
    product = {
        'name': name,
        'description': description,
        'categories': categories,
        'images': images,
        'vendorOid': vendorOid,
        'limit': limit,
        'priceStart': priceStart,
        'priceEnd': priceEnd
    }
    dbres = await dbProducts.addProduct(product)
    if (dbres.status == "fail") {
        return res.send({
            "status": "Failed"
        });
    } else {
        return res.send({
            "status": "Failed"
        });
    }
});
module.exports = router;