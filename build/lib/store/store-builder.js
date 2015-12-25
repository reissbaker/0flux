'use strict';
var StoreUpdate = require('./store-update');
var maybe = require('../util/maybe');
var isPresent = maybe.isPresent;
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
            var update = new StoreUpdate(_this._getState, _this._setState);
            var returned = reducer(data, update);
            // Async reducers can return interim states that take effect prior to done() being called. If
            // done has yet to be called, and there was an interim state returned, set the current state
            // to be the interim state.
            if (!update.isDone && isPresent(returned))
                _this._setState(returned);
        });
    };
    return StoreBuilder;
})();
exports.StoreBuilder = StoreBuilder;
