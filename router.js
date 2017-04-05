'use strict';
const express = require('express');
const Controller = require('./lib/controllers/');

class Router extends express.Router {
    constructor (options) {
        super(options);

        this.get('/', Controller.Index.getIndex);

        this.get('/login', Controller.Auth.getLogin);
        this.post('/login', Controller.Auth.postLogin);
        this.get('/logout', Controller.Auth.getLogout);

        this.all('*', Controller.Index.notFound);
        this.use(Controller.Index.internalServerError);
    }
}

module.exports = Router;
