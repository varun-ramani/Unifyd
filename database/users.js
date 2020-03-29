var config = require('../config')
var mongo = require('./setup')

db = {}

db.addUser = async function (data) {
    user = { 'name': data.name, 'email': data.email, 'password': data.password }
    await mongo.getDb().collection('users').insertOne(user, function (err, res) {
        if (err) {
            return { 'status': 'error' }
        } else {
            return { 'status': 'success' }
        }
    });
}

db.getUser = async function (data) {
    search = { 'email': data.email }
    await mongo.getDb().collection('users').findOne(search, function (err, result) {
        if (err) {
            return { 'status': 'error' }
        } else {
            return { 'status': 'success', 'res': result }
        }
    });
}
module.exports = db