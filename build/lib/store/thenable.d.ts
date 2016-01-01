import Callback = require('../util/callback');
interface Thenable<T, E> {
    then(callback: Callback<T>, errback: Callback<E>): any;
}
export = Thenable;
