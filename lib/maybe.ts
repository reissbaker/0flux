'use strict';

export type Maybe<Type> = Type | void;

export function isPresent<State>(a: Maybe<State>): a is State {
  return !!a;
}
