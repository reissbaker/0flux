'use strict';
var ActionDispatcher = (function () {
    function ActionDispatcher(container) {
        this._callbacks = [];
        this._container = container;
    }
    ActionDispatcher.prototype.bind = function (c) {
        this._callbacks.push(c);
        return c;
    };
    ActionDispatcher.prototype.dispatch = function (d) {
        this._container.snapshot();
        for (var i = 0; i < this._callbacks.length; i++) {
            this._callbacks[i](d);
        }
        return d;
    };
    return ActionDispatcher;
})();
module.exports = ActionDispatcher;
