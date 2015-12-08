'use strict';

import ActionDispatcher = require('./action-dispatcher');
import Callback = require('./callback');

export interface bindFn<State> {
  (getState: () => State, setState: (s: State) => any): State;
}

export class Store<State> {
  private _bind: bindFn<State>;
  private _state: State;
  private _callbacks: Callback<State>[] = [];

  constructor(bind: bindFn<State>) {
    this._bind = bind;

    this._state = bind(
      () => { return this.current; },
      (s: State) => { this._setState(s); }
    );
  }

  get current(): State {
    return this._state;
  }

  watch(callback: Callback<State>): Store<State> {
    this._callbacks.push(callback);
    return this;
  }

  watchNext(callback: Callback<State>): Store<State> {
    const wrapped = (s: State) => {
      this.unwatch(wrapped);
      callback(s);
    };
    this.watch(wrapped);
    return this;
  }

  unwatch(callback: Callback<State>): Store<State> {
    for(let i = 0; i < this._callbacks.length; i++) {
      if(this._callbacks[i] === callback) {
        this._callbacks.splice(i, 1);
        break;
      }
    }

    return this;
  }

  removeAllWatchers(): Store<State> {
    this._callbacks = [];
    return this;
  }

  private _setState(state: State): void {
    const prevState = this._state;
    this._state = state;

    if(prevState === state) return;

    this._notify();
  }

  private _notify() {
    for(let i = 0; i < this._callbacks.length; i++) {
      this._callbacks[i](this._state);
    }
  }
}

