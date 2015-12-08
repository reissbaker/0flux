'use strict';
var flux = require('../index');
var app = new flux.App();
var dispatcher = {
    addTodo: app.action(),
    removeTodo: app.action(),
};
var todoStore = app.store(function (getState, setState) {
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
console.log(todoStore.current);
dispatcher.removeTodo.dispatch(clone);
console.log('evil clone eliminated:');
console.log(todoStore.current);
