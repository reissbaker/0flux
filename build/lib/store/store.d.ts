import builder = require('./store-builder');
import StoreBuilder = builder.StoreBuilder;
export declare type BuilderFn<State> = (builder: StoreBuilder<State>) => State;
export declare type StoreCallback<State> = (curr?: State, prev?: State) => any;
export declare class Store<State> {
    private _state;
    private _callbacks;
    constructor(build: BuilderFn<State>);
    state: State;
    watch(callback: StoreCallback<State>): Store<State>;
    watchNext(callback: StoreCallback<State>): Store<State>;
    unwatch(callback: StoreCallback<State>): Store<State>;
    removeAllWatchers(): Store<State>;
    private _setState(state);
    private _notify(prev);
}
