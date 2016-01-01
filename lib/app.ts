'use strict';

import DispatcherIndex = require('./dispatcher-index');
import ActionDispatcher = require('./action-dispatcher');
import st = require('./store/store');
import Store = st.Store;

const DEFAULT_HISTORY_LENGTH = 0;

export interface Options {
  maxHistory?: number;
}

interface HistoryEntry<State> {
  store: Store<State>;
  state: State;
}

export class App {
  private _stores: Store<any>[] = [];
  private _history: HistoryEntry<any>[][] = [];
  private _historyIndex = -1;
  private _maxHistory: number;

  constructor(opts: Options = {}) {
    this._maxHistory = opts.hasOwnProperty("maxHistory") ? opts.maxHistory : DEFAULT_HISTORY_LENGTH;
  }

  action<Data>(): ActionDispatcher<Data> {
    return new ActionDispatcher<Data>(this);
  }

  store<State>(build: st.BuilderFn<State>): Store<State> {
    const store = new Store(build);
    this._stores.push(store);
    return store;
  }

  snapshot<State>(): void {
    if(this._maxHistory <= 0) return;

    const snapshot: HistoryEntry<any>[] = this._stores.map((store) => {
      return {
        store,
        state: store.state
      };
    });


    this._history.push(snapshot);
    this._historyIndex = this._history.length - 1;

    if(this._maxHistory >= this._history.length) {
      this._history.shift();
      this._historyIndex--;
    }
  }
}

