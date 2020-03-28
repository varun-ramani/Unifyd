const express = require('express');

/**
 * 
 * @param {express.application} app 
 */
function setupRouting(app) {
    app.get('/', (req, res) => {
        res.send("Hello World");
    });
}

module.exports = {
    setupRouting: setupRouting
};