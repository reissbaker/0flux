'use strict';

import Flux = require('../index');

interface TodoAction {
  name: string;
  id: number;
}

const container = new Flux();

const dispatcher = {
  addTodo: container.action<TodoAction>(),
  removeTodo: container.action<TodoAction>(),
};

interface State {
  todos: TodoAction[];
}

const todoState = container.state<State>((getState, setState) => {
  dispatcher.addTodo.bind((todoAction) => {
    setState({
      todos: getState().todos.concat([ todoAction ])
    });
  });

  dispatcher.removeTodo.bind((todoAction) => {
    setState({
      todos: getState().todos.filter((item) => {
        return item.id !== todoAction.id;
      })
    });
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

console.log('evil clone detected:');
console.log(todoState.current);

dispatcher.removeTodo.dispatch(clone);

console.log('evil clone eliminated:');
console.log(todoState.current);
