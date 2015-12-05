import ActionDispatcher = require('./action-dispatcher');

interface DispatcherIndex {
  [key: string]: ActionDispatcher<any>
}

export = DispatcherIndex;
