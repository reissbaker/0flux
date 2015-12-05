import Callback = require('./callback');
export interface bindFn<State> {
    (getState: () => State, setState: (s: State) => any): State;
}
export interface StateDefinition<State> {
    deepEquals?: boolean;
    bind: bindFn<State>;
}
export declare class LeafNode<State> {
    private _definition;
    private _deepEquals;
    private _state;
    private _callbacks;
    constructor(definition: StateDefinition<State>);
    current: State;
    watch(callback: Callback<State>): LeafNode<State>;
    watchNext(callback: Callback<State>): LeafNode<State>;
    unwatch(callback: Callback<State>): LeafNode<State>;
    removeAllWatchers(): LeafNode<State>;
    private _setState(state);
    private _notify();
}
