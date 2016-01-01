import Dispatcher = require('./action/dispatcher');
import ActionBuilder = require('./action/action-builder');
import st = require('./store/store');
import Store = st.Store;
export interface Options {
    maxHistory?: number;
}
export declare type DispatcherBuilder<DispatcherImpl extends Dispatcher> = (a: ActionBuilder) => DispatcherImpl;
export declare class App {
    private _stores;
    private _history;
    private _historyIndex;
    private _maxHistory;
    constructor(opts?: Options);
    dispatcher<DispatcherImpl extends Dispatcher>(build: DispatcherBuilder<DispatcherImpl>): DispatcherImpl;
    store<State>(build: st.BuilderFn<State>): Store<State>;
    snapshot<State>(): void;
}
