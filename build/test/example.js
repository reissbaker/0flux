'use strict';
var Flux = require('../index');
var container = new Flux();
var dispatcher = {
    addTodo: container.action(),
    removeTodo: container.action(),
};
var todoState = container.state(function (getState, setState) {
    dispatcher.addTodo.bind(function (todoAction) {
        setState({
            todos: getState().todos.concat([todoAction])
        });
    });
    dispatcher.removeTodo.bind(function (todoAction) {
        setState({
            todos: getState().todos.filter(function (item) {
                return item.id !== todoAction.id;
            })
        });
    });
    return {
        todos: []
    };
});
var julia = dispatcher.addTodo.dispatch({
    id: 0,
    name: 'julia'
});
var clone = dispatcher.addTodo.dispatch({
    id: 1,
    name: 'evil julia clone'
});
console.log('evil clone detected:');
console.log(todoState.current);
dispatcher.removeTodo.dispatch(clone);
console.log('evil clone eliminated:');
console.log(todoState.current);
