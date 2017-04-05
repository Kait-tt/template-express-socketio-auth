'use strict';
const socketio = require('socket.io');
const session = require('../modules/session');
const SocketClient = require('./client');

let _instance = null;

class SocketRouter {
    static get instance () {
        return _instance;
    }

    constructor (server) {
        if (_instance) { return _instance; }
        _instance = this;

        this.io = socketio.listen(server);
        this.io.use(SocketRouter.session);
        this.io.use(SocketRouter.authenticate);

        this.io.sockets.on('connection', socket => {
            new SocketClient(socket);
        });
    }

    static session (socket, next) {
        session(socket.request, {}, next);
    }

    static authenticate (socket, next) {
        if (!socket.request.session || !socket.request.session.user || !socket.request.session.user.username) {
            next(new Error(`required login: ${socket.id}`));
            // ここで発火したエラーを受け取る方法がわからない
        } else {
            next();
        }
    }
}

module.exports = SocketRouter;
