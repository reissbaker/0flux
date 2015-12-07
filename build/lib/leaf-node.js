'use strict';
var LeafNode = (function () {
    function LeafNode(bind) {
        var _this = this;
        this._callbacks = [];
        this._bind = bind;
        this._state = bind(function () { return _this.current; }, function (s) { _this._setState(s); });
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
