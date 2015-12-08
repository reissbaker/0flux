import ActionDispatcher = require('./action-dispatcher');
import st = require('./store');
export interface ContainerOptions {
    maxHistory?: number;
}
export declare class Container {
    private _stores;
    private _history;
    private _historyIndex;
    private _maxHistory;
    constructor(opts?: ContainerOptions);
    action<Data>(): ActionDispatcher<Data>;
    store<State>(bind: st.bindFn<State>): st.Store<State>;
    snapshot<State>(): void;
}
