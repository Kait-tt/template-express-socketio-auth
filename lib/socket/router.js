'use strict';
const socketio = require('socket.io');

let _instance = null;

class SocketRouter {
    static get instance () {
        return _instance;
    }

    constructor (server) {
        if (_instance) { return _instance; }
        _instance = this;

        this.io = socketio.listen(server);

        this.io.sockets.on('connection', socket => {
            const socketId = socket.id;

            console.log(`new connected: ${socketId}`);

            socket.on('disconnect', () => {
                console.log(`disconnect: ${socketId}`);
            })
        });
    }
}

module.exports = SocketRouter;
