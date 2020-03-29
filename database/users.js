var config = require('../config')
var mongo = require('./setup')
var mongodb = require('mongodb');

db = {}

db.addUser = async function (data) {

    user = { 'name': data.name, 'email': data.email, 'password': data.password }
    await mongo.getDb().collection("users").insertOne(user, function (err, res) {
        if (err) {
            return { 'status': 'error' }
        } else {
            return { 'status': 'success' }
        }
    });

}

module.exports = db