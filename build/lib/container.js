'use strict';
var ActionDispatcher = require('./action-dispatcher');
var leafNode = require('./leaf-node');
var LeafNode = leafNode.LeafNode;
var DEFAULT_HISTORY_LENGTH = 0;
var Container = (function () {
    function Container(opts) {
        if (opts === void 0) { opts = {}; }
        this._nodes = [];
        this._history = [];
        this._historyIndex = -1;
        this._maxHistory = opts.hasOwnProperty("maxHistory") ? opts.maxHistory : DEFAULT_HISTORY_LENGTH;
    }
    Container.prototype.action = function () {
        return new ActionDispatcher(this);
    };
    Container.prototype.state = function (bind) {
        var node = new LeafNode(bind);
        this._nodes.push(node);
        return node;
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
    return Container;
})();
exports.Container = Container;
