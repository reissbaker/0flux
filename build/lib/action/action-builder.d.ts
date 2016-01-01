import app = require('../app');
import App = app.App;
import Action = require('./action');
declare class ActionBuilder {
    private _app;
    constructor(app: App);
    action<Data>(): Action<Data>;
}
export = ActionBuilder;
