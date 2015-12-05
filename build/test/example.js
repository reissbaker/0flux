'use strict';
var Statux = require('../index');
var container = new Statux();
var dispatcher = container.dispatcher({
    addTodo: container.action(),
    removeTodo: container.action(),
});
var todoState = container.state(function (dispatcher, setState) {
    dispatcher.addTodo.bind(function (todoAction) {
        console.log('add todo', todoAction.name);
        setState({});
    });
    dispatcher.removeTodo.bind(function (todoAction) {
        console.log('remove todo', todoAction.name);
        setState({});
    });
    return {};
});
dispatcher.addTodo.dispatch({
    name: 'julia'
});
