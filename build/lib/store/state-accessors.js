'use strict';
var CurrentState = (function () {
    function CurrentState(g) {
        this._getState = g;
    }
    Object.defineProperty(CurrentState.prototype, "state", {
        get: function () {
            return this._getState();
        },
        enumerable: true,
        configurable: true
    });
    return CurrentState;
})();
exports.CurrentState = CurrentState;
