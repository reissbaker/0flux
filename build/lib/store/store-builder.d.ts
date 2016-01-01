import Action = require('../action/action');
import StoreUpdate = require('./store-update');
import maybe = require('../util/maybe');
import Maybe = maybe.Maybe;
import accessors = require('./state-accessors');
import GetState = accessors.GetState;
import SetState = accessors.SetState;
import CurrentState = accessors.CurrentState;
import Thenable = require('./thenable');
export declare type Reducer<State, Data> = (s?: State, d?: Data) => State;
export declare type AsyncReducer<State, Data> = (d: Data, update: StoreUpdate<State>) => Maybe<State>;
export declare type PromiseReducer<State, Data> = (d?: Data, current?: CurrentState<State>) => Thenable<State, any>;
export declare class StoreBuilder<State> {
    private _getState;
    private _setState;
    constructor(getState: GetState<State>, setState: SetState<State>);
    reduce<Data>(action: Action<Data>, reducer: Reducer<State, Data>): void;
    asyncReduce<Data>(action: Action<Data>, reducer: AsyncReducer<State, Data>): void;
    thenReduce<Data>(action: Action<Data>, reducer: PromiseReducer<State, Data>): void;
}
