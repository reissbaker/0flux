import Callback = require('./callback');
import builder = require('./store-builder');
import StoreBuilder = builder.StoreBuilder;
export declare type BuilderFn<State> = (builder: StoreBuilder<State>) => State;
export declare class Store<State> {
    private _state;
    private _callbacks;
    constructor(build: BuilderFn<State>);
    current: State;
    watch(callback: Callback<State>): Store<State>;
    watchNext(callback: Callback<State>): Store<State>;
    unwatch(callback: Callback<State>): Store<State>;
    removeAllWatchers(): Store<State>;
    private _setState(state);
    private _notify();
}
