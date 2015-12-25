'use strict';

import Callback = require('../util/callback');
import builder = require('./store-builder');
import StoreBuilder = builder.StoreBuilder;

export type BuilderFn<State> = (builder: StoreBuilder<State>) => State;

export class Store<State> {
  private _state: State;
  private _callbacks: Callback<State>[] = [];

  constructor(build: BuilderFn<State>) {
    this._state = build(new StoreBuilder(
      () => { return this.state; },
      (s: State) => { this._setState(s); }
    ));
  }

  get state(): State {
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

