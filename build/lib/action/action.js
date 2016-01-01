'use strict';
var Action = (function () {
    function Action(app) {
        this._callbacks = [];
        this._app = app;
    }
    Action.prototype.bind = function (c) {
        this._callbacks.push(c);
        return c;
    };
    Action.prototype.unbind = function (c) {
        for (var i = 0; i < this._callbacks.length; i++) {
            if (this._callbacks[i] === c) {
                this._callbacks.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    Action.prototype.dispatch = function (d) {
        this._app.snapshot();
        for (var i = 0; i < this._callbacks.length; i++) {
            this._callbacks[i](d);
        }
        return d;
    };
    return Action;
})();
module.exports = Action;
