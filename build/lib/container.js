'use strict';
var ActionDispatcher = require('./action-dispatcher');
var leafNode = require('./leaf-node');
var LeafNode = leafNode.LeafNode;
var Container = (function () {
    function Container(opts) {
        if (opts === void 0) { opts = {}; }
        this._nodes = [];
        this._history = [];
        this._historyIndex = -1;
        this._maxHistory = opts.hasOwnProperty("maxHistory") ? opts.maxHistory : 0;
        this._deepEqualsDefault = opts.hasOwnProperty("deepEquals") ? opts.deepEquals : true;
    }
    Container.prototype.dispatcher = function (impl) {
        if (this._dispatcher)
            throw new Error('Already initialized dispatcher.');
        this._dispatcher = impl;
        this._nodes.forEach(function (node) {
            node._bind(impl);
        });
        return impl;
    };
    Container.prototype.action = function () {
        return new ActionDispatcher(this);
    };
    Container.prototype.state = function (bind) {
        return this._nodeBuilder(bind, this._deepEqualsDefault);
    };
    Container.prototype.deepState = function (bind) {
        return this._nodeBuilder(bind, true);
    };
    Container.prototype.shallowState = function (bind) {
        return this._nodeBuilder(bind, false);
    };
    Container.prototype.snapshot = function () {
        if (this._maxHistory <= 0)
            return;
        var snapshot = this._nodes.map(function (node) {
            return {
                node: node,
                state: node.current
            };
        });
        this._history.push(snapshot);
        this._historyIndex = this._history.length - 1;
        if (this._maxHistory >= this._history.length) {
            this._history.shift();
            this._historyIndex--;
        }
    };
    Container.prototype._nodeBuilder = function (bind, deepEquals) {
        var node = new LeafNode({
            bind: bind,
            deepEquals: this._deepEqualsDefault
        });
        this._nodes.push(node);
        // FIXME: can we rearchitect to avoid the type cast here?
        if (this._dispatcher)
            node._bind(this._dispatcher);
        return node;
    };
    return Container;
})();
exports.Container = Container;
