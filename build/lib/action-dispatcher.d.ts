import app = require('./app');
import App = app.App;
import Callback = require('./util/callback');
declare class ActionDispatcher<Data> {
    private _callbacks;
    private _app;
    constructor(app: App);
    bind(c: Callback<Data>): Callback<Data>;
    dispatch(d: Data): Data;
}
export = ActionDispatcher;
