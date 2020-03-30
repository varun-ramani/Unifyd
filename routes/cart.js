const express = require('express');
const router = express.Router();
var config = require('../config');
const dbProducts = require('../database/products');

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
    
    console.log(item);

    var product = (await dbProducts.getProductById({id: item.itemOid})).res;
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
            "quantity": quantity,
            "images": product.images,
            "_id": product['_id'].toString()
        });
        req.session.cart.totalPrice = Number.parseFloat(item.price)*quantity + Number.parseFloat(req.session.cart.totalPrice);
    } catch (e) {
        console.log(e);
    }
    

    req.flash("Successfully added to cart!");
    return res.send({
        "status": "cart/addsuccess"
    });
});

router.post('/removeItem', (req, res) => {
    var id = req.body.id;
    for (var index in req.session.cart.items) {
        var item = req.session.cart.items[index];

        var _id = item['_id'];

        console.log(_id);

        if (id === _id) {
            console.log("Found match at index " + index);
            req.session.cart.totalPrice = req.session.cart.totalPrice - item.price * item.quantity;
            req.session.cart.items.splice(index, 1);
            return res.send(req.session.cart.items);
        }
    }
});

module.exports = router;