import app = require('./lib/app');
export const App = app.App;

export import store = require('./lib/store');
export import factory = require('./lib/store-builder');
export import ActionDispatcher = require('./lib/action-dispatcher');
