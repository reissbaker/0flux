'use strict';

import ActionDispatcher = require('./action-dispatcher');
import DispatcherIndex = require('./dispatcher-index');
import StateTransition = require('./state-transition');
import Callback = require('./callback');

export interface bindFn<State, DispatcherImpl extends DispatcherIndex> {
  (dispatcher: DispatcherImpl, setState: (s: State) => any): State;
}

export interface StateDefinition<State, DispatcherImpl extends DispatcherIndex> {
  deepEquals?: boolean;
  bind: bindFn<State, DispatcherImpl>;
}


export class LeafNode<State, DispatcherImpl extends DispatcherIndex> {
  private _definition: StateDefinition<State, DispatcherImpl>;
  private _deepEquals: boolean;
  private _state: State;
  private _callbacks: Callback<State>[] = [];

  constructor(definition: StateDefinition<State, DispatcherImpl>) {
    this._definition = definition;

    if(definition.deepEquals == null) this._deepEquals = definition.deepEquals;
    else this._deepEquals = true;
  }

  get current(): State {
    return this._state;
  }

  watch(callback: Callback<State>): LeafNode<State, DispatcherImpl> {
    this._callbacks.push(callback);
    return this;
  }

  watchNext(callback: Callback<State>): LeafNode<State, DispatcherImpl> {
    const wrapped = (s: State) => {
      this.unwatch(wrapped);
      callback(s);
    };
    this.watch(wrapped);
    return this;
  }

  unwatch(callback: Callback<State>): LeafNode<State, DispatcherImpl> {
    for(let i = 0; i < this._callbacks.length; i++) {
      if(this._callbacks[i] === callback) {
        this._callbacks.splice(i, 1);
        break;
      }
    }

    return this;
  }

  removeAllWatchers(): LeafNode<State, DispatcherImpl> {
    this._callbacks = [];
    return this;
  }

  _setState(state: State): void {
    const prevState = this._state;
    this._state = state;

    if(prevState === state) return;
    if(this._deepEquals && deepEquals(prevState, state)) return;

    this._notify();
  }

  _bind<Data>(dispatcher: DispatcherImpl): void {
    this._state = this._definition.bind(dispatcher, (s: State) => {
      this._setState(s);
    });
  }

  private _notify() {
    for(let i = 0; i < this._callbacks.length; i++) {
      this._callbacks[i](this._state);
    }
  }
}

function deepEquals(a: any, b: any): boolean {
  if(a instanceof Array) {
    if(!(b instanceof Array)) return false;
    if(a.length !== b.length) return false;

    for(let i = 0; i < a.length; i++) {
      if(!deepEquals(a[i], b[i])) return false;
    }

    return true;
  }

  if(typeof a === 'object') {
    let keys = Object.keys(a);
    if(!deepEquals(keys, Object.keys(b))) return false;
    for(let i = 0; i < keys.length; i++) {
      if(!deepEquals(a[keys[i]], b[keys[i]])) return false;
    }
    return true;
  }

  if(typeof a === 'number') {
    if(a === b) return true;
    return false;
  }

  if(typeof a === 'string') {
    if(a === b) return true;
    return false;
  }

  if(typeof a === 'function') {
    if(typeof console.warn === 'function') {
      console.warn(`Statux warning: if you use functions inside states, deep equals won't work and watchers may be notified of every action, regardless of whether it results in state changes or not.`);
    }

    if(a === b) return true;
    return false;
  }

  throw new Error('wtf');
}
