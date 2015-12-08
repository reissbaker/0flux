'use strict';
var ActionDispatcher = (function () {
    function ActionDispatcher(app) {
        this._callbacks = [];
        this._app = app;
    }
    ActionDispatcher.prototype.bind = function (c) {
        this._callbacks.push(c);
        return c;
    };
    ActionDispatcher.prototype.dispatch = function (d) {
        this._app.snapshot();
        for (var i = 0; i < this._callbacks.length; i++) {
            this._callbacks[i](d);
        }
        return d;
    };
    return ActionDispatcher;
})();
module.exports = ActionDispatcher;
