'use strict';

class IndexController {
    static getIndex (req, res) {
        res.render('index', {
            username: req.session.user && req.session.user.username
        });
    }

    static notFound (req, res) {
        const err = new Error('Not Found');
        res.status(404);
        res.render('error', {
            message: 'Not Found',
            error: err
        });
    }

    static internalServerError (err, req, res, next) {
        res.status(err.status || 500);
        if (err && (!err.status || Math.floor(err.status / 100) === 5)) {
            console.error(err);
        }

        res.render('error', {
            message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
            error: process.env.NODE_ENV === 'production' ? {} : err
        });
    }
}

module.exports = {
    Index: IndexController,
    Auth: require('./auth')
};
