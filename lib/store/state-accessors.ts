'use strict';

export type GetState<State> = () => State;
export type SetState<State> = (s: State) => void;

export class CurrentState<State> {
  private _getState: GetState<State>;

  constructor(g: GetState<State>) {
    this._getState = g;
  }

  get state() {
    return this._getState();
  }
}
