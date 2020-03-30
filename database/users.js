const mongodb = require('mongodb');
var config = require('../config')
var mongo = require('./setup')

db = {}

db.addUser = function (data) {
    user = { 'name': data.name, 'email': data.email, 'password': data.password, 'type': data.type }
    return new Promise(function (resolve, reject) {
        mongo.getDb().collection('users').insertOne(user, function (err, res) {
            if (err) {
                resolve({ 'status': 'fail' })
            } else {
                resolve({ 'status': 'success' })
            }
        });
    })
}

db.getUserByEmail = function (data) {
    search = { 'email': data.email }
    return new Promise(function (resolve, reject) {
        mongo.getDb().collection('users').findOne(search, function (err, result) {
            if (err) {
                resolve({ 'status': 'fail' })
            } else {
                resolve({ 'status': 'success', res: result })
            }
        });
    })
}

db.getUserById = function (data) {
    return new Promise(function (resolve, reject) {
        oid = new mongodb.ObjectID(data.id);
        mongo.getDb().collection('users').findOne({ '_id': oid }, function (err, result) {
            if (err) {
                resolve({ 'status': 'fail' })
            } else {
                resolve({ 'status': 'success', res: result })
            }
        });
    })
}

db.updateUser = function (data) {
    oid = new mongodb.ObjectID(data.id);
    var query = { _id: oid };
    var val = { $set: data.update };
    return new Promise(function (resolve, reject) {
        mongo.getDb().collection("users").updateOne(query, val, function (err, res) {
            if (err) {
                resolve({ 'status': 'fail' })
            } else {
                resolve({ 'status': 'success' })
            }
        });

    })
}

module.exports = db