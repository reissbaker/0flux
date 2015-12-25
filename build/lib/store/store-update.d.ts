import accessors = require('./state-accessors');
import GetState = accessors.GetState;
import SetState = accessors.SetState;
declare class StoreUpdate<State> {
    private _getState;
    private _setState;
    private _called;
    constructor(getState: GetState<State>, setState: SetState<State>);
    state: State;
    isDone: boolean;
    done(s: State): void;
}
export = StoreUpdate;
