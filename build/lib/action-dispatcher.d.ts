import container = require('./container');
import Container = container.Container;
import Callback = require('./callback');
declare class ActionDispatcher<Data> {
    private _callbacks;
    private _container;
    constructor(container: Container);
    bind(c: Callback<Data>): Callback<Data>;
    dispatch(d: Data): Data;
}
export = ActionDispatcher;
