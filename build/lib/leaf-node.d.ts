import Callback = require('./callback');
export interface bindFn<State> {
    (getState: () => State, setState: (s: State) => any): State;
}
export declare class LeafNode<State> {
    private _bind;
    private _state;
    private _callbacks;
    constructor(bind: bindFn<State>);
    current: State;
    watch(callback: Callback<State>): LeafNode<State>;
    watchNext(callback: Callback<State>): LeafNode<State>;
    unwatch(callback: Callback<State>): LeafNode<State>;
    removeAllWatchers(): LeafNode<State>;
    private _setState(state);
    private _notify();
}
