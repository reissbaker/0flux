'use strict';
var StoreBuilder = (function () {
    function StoreBuilder(getState, setState) {
        this._getState = getState;
        this._setState = setState;
    }
    StoreBuilder.prototype.reduce = function (action, reducer) {
        var _this = this;
        action.bind(function (data) {
            // TODO: have the inner _setState call cause an app snapshot, rather than snapshotting at the
            // actions. This also means you can reuse dispatchers across apps!
            //
            // Have the call be app.snapshot(store), rather than logging the state directly, to avoid
            // avenues for state to get set manually.
            //
            // Or rather... Why not just have the app call .watch() on the store and log state that way?
            var currentState = _this._getState();
            var nextState = reducer(currentState, data);
            _this._setState(nextState);
        });
    };
    StoreBuilder.prototype.reduceAsync = function (action, reducer) {
        var _this = this;
        action.bind(function (data) {
            var currentState = _this._getState();
            var called = false;
            reducer(currentState, data, function (nextState) {
                if (called)
                    throw new Error('ZeroFlux error: done called multiple times from an async reducer');
                called = true;
                _this._setState(nextState);
            });
        });
    };
    return StoreBuilder;
})();
exports.StoreBuilder = StoreBuilder;
