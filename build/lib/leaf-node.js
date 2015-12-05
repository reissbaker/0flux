'use strict';
var LeafNode = (function () {
    function LeafNode(definition) {
        var _this = this;
        this._callbacks = [];
        this._definition = definition;
        if (definition.deepEquals == null)
            this._deepEquals = definition.deepEquals;
        else
            this._deepEquals = true;
        this._state = this._definition.bind(function () { return _this.current; }, function (s) { _this._setState(s); });
    }
    Object.defineProperty(LeafNode.prototype, "current", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    LeafNode.prototype.watch = function (callback) {
        this._callbacks.push(callback);
        return this;
    };
    LeafNode.prototype.watchNext = function (callback) {
        var _this = this;
        var wrapped = function (s) {
            _this.unwatch(wrapped);
            callback(s);
        };
        this.watch(wrapped);
        return this;
    };
    LeafNode.prototype.unwatch = function (callback) {
        for (var i = 0; i < this._callbacks.length; i++) {
            if (this._callbacks[i] === callback) {
                this._callbacks.splice(i, 1);
                break;
            }
        }
        return this;
    };
    LeafNode.prototype.removeAllWatchers = function () {
        this._callbacks = [];
        return this;
    };
    LeafNode.prototype._setState = function (state) {
        var prevState = this._state;
        this._state = state;
        if (prevState === state)
            return;
        if (this._deepEquals && deepEquals(prevState, state))
            return;
        this._notify();
    };
    LeafNode.prototype._notify = function () {
        for (var i = 0; i < this._callbacks.length; i++) {
            this._callbacks[i](this._state);
        }
    };
    return LeafNode;
})();
exports.LeafNode = LeafNode;
function deepEquals(a, b) {
    if (a instanceof Array) {
        if (!(b instanceof Array))
            return false;
        if (a.length !== b.length)
            return false;
        for (var i = 0; i < a.length; i++) {
            if (!deepEquals(a[i], b[i]))
                return false;
        }
        return true;
    }
    if (typeof a === 'object') {
        var keys = Object.keys(a);
        if (!deepEquals(keys, Object.keys(b)))
            return false;
        for (var i = 0; i < keys.length; i++) {
            if (!deepEquals(a[keys[i]], b[keys[i]]))
                return false;
        }
        return true;
    }
    if (typeof a === 'number') {
        if (a === b)
            return true;
        return false;
    }
    if (typeof a === 'string') {
        if (a === b)
            return true;
        return false;
    }
    if (typeof a === 'function') {
        if (typeof console.warn === 'function') {
            console.warn("Statux warning: if you use functions inside states, deep equals won't work and watchers may be notified of every action, regardless of whether it results in state changes or not.");
        }
        if (a === b)
            return true;
        return false;
    }
    throw new Error('wtf');
}
