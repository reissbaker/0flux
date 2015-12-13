import ActionDispatcher = require('./action-dispatcher');
export declare type GetState<State> = () => State;
export declare type SetState<State> = (s: State) => void;
export declare type Reducer<State, Data> = (s?: State, d?: Data) => State;
export declare type Maybe<Type> = Type | void;
export declare type AsyncReducer<State, Data> = (s: State, d: Data, done: (n: State) => void) => Maybe<State>;
export declare class StoreBuilder<State> {
    private _getState;
    private _setState;
    constructor(getState: GetState<State>, setState: SetState<State>);
    reduce<Data>(action: ActionDispatcher<Data>, reducer: Reducer<State, Data>): void;
    reduceAsync<Data>(action: ActionDispatcher<Data>, reducer: AsyncReducer<State, Data>): void;
}
