const MongoClient = require('mongodb').MongoClient;
var config = require('../config')

var _db;

module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(config.database.uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
      _db = client.db(config.database.db);
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  }
}