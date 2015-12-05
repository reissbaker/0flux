import ActionDispatcher = require('./action-dispatcher');
import leafNode = require('./leaf-node');
import LeafNode = leafNode.LeafNode;
export interface ContainerOptions {
    maxHistory?: number;
    deepEquals?: boolean;
}
export interface HistoryEntry<State> {
    node: LeafNode<State>;
    state: State;
}
export declare class Container {
    private _nodes;
    private _history;
    private _historyIndex;
    private _maxHistory;
    private _deepEqualsDefault;
    constructor(opts?: ContainerOptions);
    action<Data>(): ActionDispatcher<Data>;
    state<State>(bind: leafNode.bindFn<State>): leafNode.LeafNode<State>;
    deepState<State>(bind: leafNode.bindFn<State>): leafNode.LeafNode<State>;
    shallowState<State>(bind: leafNode.bindFn<State>): leafNode.LeafNode<State>;
    snapshot<State>(): void;
    private _nodeBuilder<State>(bind, deepEquals);
}
