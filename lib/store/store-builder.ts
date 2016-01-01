'use strict';

import ActionDispatcher = require('../action-dispatcher');
import StoreUpdate = require('./store-update');
import maybe = require('../util/maybe');
import Maybe = maybe.Maybe;
import isPresent = maybe.isPresent;
import accessors = require('./state-accessors');
import GetState = accessors.GetState;
import SetState = accessors.SetState;
import CurrentState = accessors.CurrentState;
import Thenable = require('./thenable');

export type Reducer<State, Data> = (s?: State, d?: Data) => State;
export type AsyncReducer<State, Data> = (d: Data, update: StoreUpdate<State>) => Maybe<State>;
export type PromiseReducer<State, Data> = (d?: Data, current?: CurrentState<State>) => Thenable<State, any>;

export class StoreBuilder<State> {
  private _getState: GetState<State>;
  private _setState: SetState<State>;

  constructor(getState: GetState<State>, setState: SetState<State>) {
    this._getState = getState;
    this._setState = setState;
  }

  reduce<Data>(action: ActionDispatcher<Data>, reducer: Reducer<State, Data>) {
    action.bind((data) => {
      // TODO: have the inner _setState call cause an app snapshot, rather than snapshotting at the
      // actions. This also means you can reuse dispatchers across apps!
      //
      // Have the call be app.snapshot(store), rather than logging the state directly, to avoid
      // avenues for state to get set manually.
      //
      // Or rather... Why not just have the app call .watch() on the store and log state that way?
      const currentState = this._getState();
      const nextState = reducer(currentState, data);
      this._setState(nextState);
    });
  }

  asyncReduce<Data>(action: ActionDispatcher<Data>, reducer: AsyncReducer<State, Data>) {
    action.bind((data) => {
      const update = new StoreUpdate(this._getState, this._setState);
      const returned = reducer(data, update);

      // Async reducers can return interim states that take effect prior to done() being called. If
      // done has yet to be called, and there was an interim state returned, set the current state
      // to be the interim state.
      if(!update.isDone && isPresent<State>(returned)) this._setState(returned);
    });
  }

  thenReduce<Data>(action: ActionDispatcher<Data>, reducer: PromiseReducer<State, Data>) {
    action.bind((data) => {
      const nextStatePromise = reducer(data, new CurrentState(this._getState));
      nextStatePromise.then((state) => {
        this._setState(state);
      }, (e: any) => {});
    });
  }
}
