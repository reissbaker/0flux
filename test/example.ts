'use strict';

import flux = require('../index');

interface TodoAction {
  name: string;
  id: number;
}

const app = new flux.App();

const dispatcher = app.dispatcher((builder) => {
  return {
    addTodo: builder.action<TodoAction>(),
    removeTodo: builder.action<TodoAction>(),
  };
});

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
      todos: state.todos.filter((item) => item.id !== todoAction.id)
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
console.log('current state:', todoStore.state);

console.log('eliminating evil clone:');
dispatcher.removeTodo.dispatch(clone);

console.log('evil clone eliminated:');
console.log('current state:', todoStore.state);
