import ActionDispatcher = require('../action-dispatcher');
import StoreUpdate = require('./store-update');
import maybe = require('../util/maybe');
import Maybe = maybe.Maybe;
import accessors = require('./state-accessors');
import GetState = accessors.GetState;
import SetState = accessors.SetState;
export declare type Reducer<State, Data> = (s?: State, d?: Data) => State;
export declare type AsyncReducer<State, Data> = (update: StoreUpdate<State>) => Maybe<State>;
export declare class StoreBuilder<State> {
    private _getState;
    private _setState;
    constructor(getState: GetState<State>, setState: SetState<State>);
    reduce<Data>(action: ActionDispatcher<Data>, reducer: Reducer<State, Data>): void;
    asyncReduce<Data>(action: ActionDispatcher<Data>, reducer: AsyncReducer<State, Data>): void;
}
