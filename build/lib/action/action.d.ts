import app = require('../app');
import App = app.App;
import Callback = require('../util/callback');
declare class Action<Data> {
    private _callbacks;
    private _app;
    constructor(app: App);
    bind(c: Callback<Data>): Callback<Data>;
    unbind(c: Callback<Data>): boolean;
    dispatch(d: Data): Data;
}
export = Action;
