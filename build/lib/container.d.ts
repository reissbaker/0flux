import DispatcherIndex = require('./dispatcher-index');
import ActionDispatcher = require('./action-dispatcher');
import leafNode = require('./leaf-node');
import LeafNode = leafNode.LeafNode;
export interface ContainerOptions {
    maxHistory?: number;
    deepEquals?: boolean;
}
export interface HistoryEntry<State> {
    node: LeafNode<State, any>;
    state: State;
}
export declare class Container {
    private _nodes;
    private _history;
    private _historyIndex;
    private _maxHistory;
    private _dispatcher;
    private _deepEqualsDefault;
    constructor(opts?: ContainerOptions);
    dispatcher<DispatcherImpl extends DispatcherIndex>(impl: DispatcherImpl): DispatcherImpl;
    action<Data>(): ActionDispatcher<Data>;
    state<State, DispatcherImpl extends DispatcherIndex>(bind: leafNode.bindFn<State, DispatcherImpl>): leafNode.LeafNode<State, DispatcherImpl>;
    deepState<State, DispatcherImpl extends DispatcherIndex>(bind: leafNode.bindFn<State, DispatcherImpl>): leafNode.LeafNode<State, DispatcherImpl>;
    shallowState<State, DispatcherImpl extends DispatcherIndex, Data>(bind: leafNode.bindFn<State, DispatcherImpl>): leafNode.LeafNode<State, DispatcherImpl>;
    snapshot<State>(): void;
    private _nodeBuilder<State, DispatcherImpl>(bind, deepEquals);
}
