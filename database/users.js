var config = require('../config')
var mongo = require('./setup')
var mongodb = require('mongodb');

db = {}

db.addUser = async function (data) {

    // user = {'email'}
    await mongo.getDb().collection("users").insertOne(data, function (err, res) {
            if (err) {
                reject()
            } else {
                resolve()
            }
        });
    })
}

module.exports = db