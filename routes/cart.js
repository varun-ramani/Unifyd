const express = require('express');
const router = express.Router();
var config = require('../config');
const mongo = require('../database/products');

router.post('/addItem', async (req, res) => {
    var item = req.body;

    var price;
    var quantity;
    try {
        price = Number.parseFloat(item.price);
        quantity = Number.parseInt(item.quantity);
    } catch (e) {
        req.flash("One or more values don't appear to be numbers.");
        return res.send({
            "status": "nan"
        });
    }

    var product = (await mongo.getProductById(item.itemOid)).res;

    console.log(`Price: ${price}`);
    console.log(`Product Price: ${product.priceStart}`);
    console.log(`Product Price: ${product.priceEnd}`);
    console.log(`Quantity: ${quantity}`);
    console.log(`Limit: ${product.limit}`);

    if (price < product.priceStart || price > product.priceEnd || quantity > product.limit || quantity < 1) {
        req.flash("Yhurd", "Price, quantity, or both are outside valid ranges.");
        return res.send({
            "status": "invalid_fields"
        });
    }

    try {
        req.session.cart.items.push({
            "name": product.name,
            "description": product.description,
            "price": item.price,
            "images": product.images
        });
        req.session.cart.totalPrice += item.price;
    } catch (e) {
        console.log(e);
    }
    

    req.flash("Successfully added to cart!");
    return res.send({
        "status": "cart/addsuccess"
    });
});

router.post('/removeItem', (req, res) => {
    
});

module.exports = router;