'use strict';
let session = require('express-session');
let MysqlStore = require('connect-mysql')(session);
let config = require('config');

module.exports = session({
    name: config.get('session.name'),
    secret: config.get('session.secret'),
    store: new MysqlStore({
        secret: config.get('session.secret'),
        config: {
            user: config.get('db.username'),
            password: config.get('db.password'),
            database: config.get('db.database'),
            retries: 10
        }
    }),
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    }
});
