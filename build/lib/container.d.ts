import ActionDispatcher = require('./action-dispatcher');
import leafNode = require('./leaf-node');
export interface ContainerOptions {
    maxHistory?: number;
}
export declare class Container {
    private _nodes;
    private _history;
    private _historyIndex;
    private _maxHistory;
    constructor(opts?: ContainerOptions);
    action<Data>(): ActionDispatcher<Data>;
    state<State>(bind: leafNode.bindFn<State>): leafNode.LeafNode<State>;
    snapshot<State>(): void;
}
