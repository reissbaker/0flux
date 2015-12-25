'use strict';

import app = require('./app');
import App = app.App;
import Callback = require('./util/callback');

class ActionDispatcher<Data> {
  private _callbacks: Callback<Data>[] = [];
  private _app: App;

  constructor(app: App) {
    this._app = app;
  }

  bind(c: Callback<Data>): Callback<Data> {
    this._callbacks.push(c);
    return c;
  }

  dispatch(d: Data): Data {
    this._app.snapshot();

    for(let i = 0; i < this._callbacks.length; i++) {
      this._callbacks[i](d);
    }

    return d;
  }
}

export = ActionDispatcher;
