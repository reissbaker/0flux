import Callback = require('./callback');
export interface bindFn<State> {
    (getState: () => State, setState: (s: State) => any): State;
}
export declare class Store<State> {
    private _bind;
    private _state;
    private _callbacks;
    constructor(bind: bindFn<State>);
    current: State;
    watch(callback: Callback<State>): Store<State>;
    watchNext(callback: Callback<State>): Store<State>;
    unwatch(callback: Callback<State>): Store<State>;
    removeAllWatchers(): Store<State>;
    private _setState(state);
    private _notify();
}
