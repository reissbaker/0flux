import DispatcherIndex = require('./dispatcher-index');
import Callback = require('./callback');
export interface bindFn<State, DispatcherImpl extends DispatcherIndex> {
    (dispatcher: DispatcherImpl, setState: (s: State) => any): State;
}
export interface StateDefinition<State, DispatcherImpl extends DispatcherIndex> {
    deepEquals?: boolean;
    bind: bindFn<State, DispatcherImpl>;
}
export declare class LeafNode<State, DispatcherImpl extends DispatcherIndex> {
    private _definition;
    private _deepEquals;
    private _state;
    private _callbacks;
    constructor(definition: StateDefinition<State, DispatcherImpl>);
    current: State;
    watch(callback: Callback<State>): LeafNode<State, DispatcherImpl>;
    watchNext(callback: Callback<State>): LeafNode<State, DispatcherImpl>;
    unwatch(callback: Callback<State>): LeafNode<State, DispatcherImpl>;
    removeAllWatchers(): LeafNode<State, DispatcherImpl>;
    _setState(state: State): void;
    _bind<Data>(dispatcher: DispatcherImpl): void;
    private _notify();
}
