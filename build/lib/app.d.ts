import ActionDispatcher = require('./action-dispatcher');
import st = require('./store/store');
import Store = st.Store;
export interface Options {
    maxHistory?: number;
}
export declare class App {
    private _stores;
    private _history;
    private _historyIndex;
    private _maxHistory;
    constructor(opts?: Options);
    action<Data>(): ActionDispatcher<Data>;
    store<State>(build: st.BuilderFn<State>): Store<State>;
    snapshot<State>(): void;
}
