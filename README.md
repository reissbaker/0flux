Zeroflux
================================================================================

A small, typed state management library.

Example:

```typescript
'use strict';

import flux = require('zeroflux');

interface TodoAction {
  name: string;
  id: number;
}

const app = new flux.App();

const dispatcher = {
  addTodo: app.action<TodoAction>(),
  removeTodo: app.action<TodoAction>(),
};

interface State {
  todos: TodoAction[];
}

const todoStore = app.store<State>((builder) => {
  builder.reduce(dispatcher.addTodo, (state, todoAction) => {
    return {
      todos: state.todos.concat([ todoAction ])
    };
  });

  builder.reduce(dispatcher.removeTodo, (state, todoAction) => {
    return {
      todos: state.todos.filter((item) => {
        return item.id !== todoAction.id;
      })
    };
  });

  return {
    todos: []
  };
});

const julia = dispatcher.addTodo.dispatch({
  id: 0,
  name: 'julia'
});

const clone = dispatcher.addTodo.dispatch({
  id: 1,
  name: 'evil julia clone'
});

todoStore.watch((state) => {
  console.log('saw new state:', state);
});

console.log('evil clone detected:');
console.log('current state:', todoStore.current);

console.log('eliminating evil clone:');
dispatcher.removeTodo.dispatch(clone);

console.log('evil clone eliminated:');
console.log('current state:', todoStore.current);
```
