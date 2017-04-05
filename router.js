'use strict';
const express = require('express');
const Controller = require('./lib/controllers/');

class Router extends express.Router {
    constructor (options) {
        super(options);

        this.get('/', Controller.Index.getIndex);

        this.all('*', Controller.Index.notFound);
        this.use(Controller.Index.internalServerError);
    }
}

module.exports = Router;
