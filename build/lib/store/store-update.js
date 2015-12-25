'use strict';
var StoreUpdate = (function () {
    function StoreUpdate(getState, setState) {
        this._called = false;
        this._getState = getState;
        this._setState = setState;
    }
    Object.defineProperty(StoreUpdate.prototype, "state", {
        get: function () {
            return this._getState();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StoreUpdate.prototype, "isDone", {
        get: function () {
            return this._called;
        },
        enumerable: true,
        configurable: true
    });
    StoreUpdate.prototype.done = function (s) {
        if (this._called)
            throw new Error('ZeroFlux error: done called multiple times');
        this._called = true;
        this._setState(s);
    };
    return StoreUpdate;
})();
module.exports = StoreUpdate;
