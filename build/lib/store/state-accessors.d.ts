export declare type GetState<State> = () => State;
export declare type SetState<State> = (s: State) => void;
export declare class CurrentState<State> {
    private _getState;
    constructor(g: GetState<State>);
    state: State;
}
