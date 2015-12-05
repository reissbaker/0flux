'use strict';

import container = require('./container');
import Container = container.Container;
import Callback = require('./callback');

class ActionDispatcher<Data> {
  private _callbacks: Callback<Data>[] = [];
  private _container: Container;

  constructor(container: Container) {
    this._container = container;
  }

  bind(c: Callback<Data>): Callback<Data> {
    this._callbacks.push(c);
    return c;
  }

  dispatch(d: Data): Data {
    this._container.snapshot();

    for(let i = 0; i < this._callbacks.length; i++) {
      this._callbacks[i](d);
    }

    return d;
  }
}

export = ActionDispatcher;
