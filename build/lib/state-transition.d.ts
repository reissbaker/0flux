interface StateTransition<State, Data> {
    (s: State, d: Data): State;
}
export = StateTransition;
