'use strict';

import ActionDispatcher = require('./action-dispatcher');

export type GetState<State> = () => State;
export type SetState<State> = (s: State) => void;
export type Reducer<State, Data> = (s: State, d?: Data) => State;
export type AsyncReducer<State, Data> = (s: State, d: Data, done: (n: State) => void) => void;

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

  reduceAsync<Data>(action: ActionDispatcher<Data>, reducer: AsyncReducer<State, Data>) {
    action.bind((data) => {
      const currentState = this._getState();
      let called = false;
      reducer(currentState, data, (nextState: State) => {
        if(called) throw new Error('ZeroFlux error: done called multiple times from an async reducer');
        called = true;
        this._setState(nextState);
      });
    });
  }
}
