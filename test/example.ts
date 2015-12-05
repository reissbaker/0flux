'use strict';

import Statux = require('../index');

interface TodoAction {
  name: string;
}

const container = new Statux();

const dispatcher = container.dispatcher({
  addTodo: container.action<TodoAction>(),
  removeTodo: container.action<TodoAction>(),
});

type Dispatcher = typeof dispatcher;

interface State {
}

const todoState = container.state<State, Dispatcher>((dispatcher, setState) => {
  dispatcher.addTodo.bind((todoAction) => {
    console.log('add todo', todoAction.name);
    setState({});
  });

  dispatcher.removeTodo.bind((todoAction) => {
    console.log('remove todo', todoAction.name);
    setState({});
  });

  return {};
});

dispatcher.addTodo.dispatch({
  name: 'julia'
});
