'use strict';

import app = require('../app');
import App = app.App;
import Action = require('./action');

class ActionBuilder {
  private _app: App;

  constructor(app: App) {
    this._app = app;
  }

  action<Data>(): Action<Data> {
    return new Action<Data>(this._app);
  }
}

export = ActionBuilder;
