import Action = require('./action');
interface Dispatcher {
    [key: string]: Action<any>;
}
export = Dispatcher;
