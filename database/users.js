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

db.getUser = function (data) {
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
module.exports = db