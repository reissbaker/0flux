'use strict';

import accessors = require('./state-accessors');
import GetState = accessors.GetState;
import SetState = accessors.SetState;

class StoreUpdate<State> {
  private _getState: GetState<State>;
  private _setState: SetState<State>;
  private _called = false;

  constructor(getState: GetState<State>, setState: SetState<State>) {
    this._getState = getState;
    this._setState = setState;
  }

  get state() {
    return this._getState();
  }

  get isDone() {
    return this._called;
  }

  done(s: State) {
    if(this._called) throw new Error('ZeroFlux error: done called multiple times');
    this._called = true;
    this._setState(s);
  }
}

export = StoreUpdate;
