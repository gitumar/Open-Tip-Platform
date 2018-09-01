"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var http_1 = require("http");
var express = require("express");
var socketio = require("socket.io");

//tracking for tip total
var prevTip = 0.0;
var currTip = 0.0;
var totalFlag = 0;
var roomEvenOdd = 0;

var TipServer = /** @class */ (function () {
    function TipServer() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    TipServer.prototype.createApp = function () {
        this.app = express();
    };
    TipServer.prototype.createServer = function () {
        this.server = http_1.createServer(this.app);
    };
    TipServer.prototype.config = function () {
        this.port = process.env.PORT || TipServer.PORT;
    };
    TipServer.prototype.sockets = function () {
        this.io = socketio(this.server);
    };
    TipServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Server running on port %s', _this.port);
        });
        this.io.on('connect', function (socket) {

            console.log('Connected client on port %s.', _this.port);
            socket.on('tipItem', function (m) {
                // value logging on the server
                console.log('Tip Info: %s', JSON.stringify(m));
                // subscribe user to specified channel
                socket.join(m.from.pool);

                console.log(m.from.pool);

                //Total Tip Tracking
                if (m.content) {
                    currTip = parseFloat(m.content) + prevTip;
                    prevTip = parseFloat(currTip);
                    m.total = currTip;
                }
                console.log('Tip Total: %s', m.total);
                prevTip = parseFloat(currTip);

                // emit tipItem only to subscribers
                _this.io.to(m.from.pool).emit('tipItem', m);
            });
            socket.on('disconnect', function () {
                console.log('Client has disconnected');
            });
        });
    };
    TipServer.prototype.getApp = function () {
        return this.app;
    };
    TipServer.PORT = 8080;
    return TipServer;
}());
var app = new TipServer().getApp;
exports.app = app;