var config = require('../config')
var mongo = require('./setup')
var mongodb = require('mongodb');

db = {}

/*
name
description
images
priceStart
priceEnd
companyOid
Available
limit
categories



*/

db.addProduct = function (data) {
    product = {
        'name': data.name,
        'description': data.description,
        'categories': data.categories,
        'images': data.images,
        'vendorOid': data.vendoroid,
        'available': data.available,
        'limit': data.limit,
        'priceStart': data.priceStart,
        'priceEnd': data.priceEnd
    }
    return new Promise(function (resolve, reject) {
        mongo.getDb().collection('products').insertOne(product, function (err, res) {
            if (err) {
                resolve({ 'status': 'fail' })
            } else {
                resolve({ 'status': 'success' })
            }
        });
    })
}

db.getProductById = function (data) {
    oid = new mongodb.ObjectID(data);
    return new Promise(function (resolve, reject) {
        mongo.getDb().collection('products').findOne({ '_id': oid }, function (err, result) {
            if (err) {
                resolve({ 'status': 'fail' })
            } else {
                resolve({ 'status': 'success', res: result })
            }
        });
    })
}

db.updateProduct = function (data) {
    oid = new mongodb.ObjectID(data.id);
    var query = { _id: oid };
    var val = { $set: data.update };
    return new Promise(function (resolve, reject) {
        mongo.getDb().collection("products").updateOne(query, val, function (err, res) {
            if (err) {
                resolve({ 'status': 'fail' })
            } else {
                resolve({ 'status': 'success' })
            }
        });
    })
}

db.searchProduct = function (data) {
    query = new RegExp(data.search, "i")
    return new Promise(function (resolve, reject) {
        mongo.getDb().collection('products').aggregate([
            { $match: { $or: [{ "name": { $regex: query } }, { "description": { $regex: query } }] } }
        ]).limit(50).toArray().then((res) => {
            resolve({ 'status': 'success' })
        }).catch((err) => {
            resolve({ 'status': 'fail' })
        })

    })
};

module.exports = db;