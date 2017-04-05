'use strict';

class AuthController {
    static getLogin (req, res) {
        if (AuthController.authorized(req)) {
            res.redirect('/');
        } else {
            res.render('login', {validationErrors: null});
        }
    }

    static postLogin (req, res, next) {
        const validateResults = AuthController.validateLogin(req.body);

        if (validateResults) {
            res.render('login', {validationErrors: validateResults});
        } else {
            AuthController.login(req, req.body, err => {
                if (err) { return next(err); }
                res.redirect('/');
            });
        }
    }

    static getLogout (req, res, next) {
        AuthController.logout(req, err => {
            if (err) { return next(err); }
            res.redirect('/');
        });
    }

    static validateLogin (params) {
        const errors = [];

        if (!params.username) {
            errors.push({message: 'require username parameter'});
        }
        if (!params.password) {
            errors.push({message: 'require password parameter'});
        }

        return errors.length ? errors : null;
    }

    static login (req, params, next) {
        req.session.user = {username: params.username};
        req.session.save(next);
    }

    static logout (req, next) {
        req.session.destroy(next);
    }

    static authorized (req) {
        return !!req.session.user;
    }
}

module.exports = AuthController;
