var config = require('../config')
var mongo = require('./setup')
var mongodb = require('mongodb');

db = {}

db.addTransaction = function (data) {
    transaction = {
        'buyerOid': data.buyerOid,
        'vendorOid': data.vendorOid,
        'productOid': data.productOid,
        'quantity': data.quantity,
        'price': data.price,
        'total': data.total,
        'date': data.date,
        'status': data.status,
        'lat': data.lat,
        'long': data.long
    }
    return new Promise(function (resolve, reject) {
        mongo.getDb().collection('transactions').insertOne(transaction, function (err, res) {
            if (err) {
                resolve({ 'status': 'fail' })
            } else {
                resolve({ 'status': 'success' })
            }
        });
    })
}

db.getTransactionsByVendor = function (data) {
    oid = new mongodb.ObjectID(data.id);
    return new Promise(function (resolve, reject) {
        mongo.getDb().collection('transactions').find({ 'vendorOid': oid }, function (err, result) {
            if (err) {
                resolve({ 'status': 'fail' })
            } else {
                resolve({ 'status': 'success', res: result })
            }
        });
    })
}

db.getTransactionsByBuyer = function (data) {
    oid = new mongodb.ObjectID(data.id);
    return new Promise(function (resolve, reject) {
        mongo.getDb().collection('transactions').find({ 'buyerOid': oid }, function (err, result) {
            if (err) {
                resolve({ 'status': 'fail' })
            } else {
                resolve({ 'status': 'success', res: result })
            }
        });
    })
}


module.exports = db;
