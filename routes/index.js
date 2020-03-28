const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send("Hello World");
});

module.exports = routes;
