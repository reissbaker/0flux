import ActionDispatcher = require('./action-dispatcher');
import st = require('./store');
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
    store<State>(build: st.BuilderFn<State>): st.Store<State>;
    snapshot<State>(): void;
}
