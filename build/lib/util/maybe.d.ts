export declare type Maybe<Type> = Type | void;
export declare function isPresent<State>(a: Maybe<State>): a is State;
