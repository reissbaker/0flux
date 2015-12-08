'use strict';
var ActionDispatcher = require('./action-dispatcher');
var st = require('./store');
var Store = st.Store;
var DEFAULT_HISTORY_LENGTH = 0;
var Container = (function () {
    function Container(opts) {
        if (opts === void 0) { opts = {}; }
        this._stores = [];
        this._history = [];
        this._historyIndex = -1;
        this._maxHistory = opts.hasOwnProperty("maxHistory") ? opts.maxHistory : DEFAULT_HISTORY_LENGTH;
    }
    Container.prototype.action = function () {
        return new ActionDispatcher(this);
    };
    Container.prototype.store = function (bind) {
        var store = new Store(bind);
        this._stores.push(store);
        return store;
    };
    Container.prototype.snapshot = function () {
        if (this._maxHistory <= 0)
            return;
        var snapshot = this._stores.map(function (store) {
            return {
                store: store,
                state: store.current
            };
        });
        this._history.push(snapshot);
        this._historyIndex = this._history.length - 1;
        if (this._maxHistory >= this._history.length) {
            this._history.shift();
            this._historyIndex--;
        }
    };
    return Container;
})();
exports.Container = Container;
